#!/usr/bin/env node
/**
 * Auditoria do sistema visual.
 * Falha (exit 1) quando uma folha rompe uma das regras padronizadas.
 * Uso: node scripts/audit-design.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const TOKENS = 'app/tokens.css';

const BREAKPOINTS_MAX = [480, 640, 768, 900, 1024, 1180];
const BREAKPOINTS_MIN = [481, 641, 769, 901, 1025, 1181];
const ALPHAS = [0, 0.04, 0.08, 0.12, 0.16, 0.24, 0.32, 0.4, 0.5, 0.6, 0.72, 0.85, 1];
const SPACING_PROPS =
  /\b(padding|margin|gap|row-gap|column-gap|padding-(?:top|right|bottom|left)|margin-(?:top|right|bottom|left))\s*:\s*([^;}!]+)/g;

const walk = (dir, exts, out = []) => {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, exts, out);
    else if (exts.some((e) => full.endsWith(e))) out.push(full);
  }
  return out;
};

// Toda folha do repositório, menos a de tokens: uma folha nova entra
// na auditoria sozinha, sem precisar ser listada aqui.
// Folhas ainda não normalizadas. Saem da checagem mas são relatadas a cada
// execução, para que a dívida fique visível em vez de silenciosa.
// Remova o arquivo desta lista quando ele passar a seguir os tokens.
const PENDING = [];

const ALL_SHEETS = [...walk('app', ['.css']), ...walk('src', ['.css'])]
  .filter((f) => f !== TOKENS && !f.endsWith('app/site.css'));
const SHEETS = ALL_SHEETS.filter((f) => !PENDING.includes(f));

const problems = [];
const add = (file, line, rule, detail) =>
  problems.push({ file, line, rule, detail });

const lineOf = (src, index) => src.slice(0, index).split('\n').length;

const tokenSrc = readFileSync(TOKENS, 'utf8');
const declared = new Set([...tokenSrc.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gm)].map((m) => m[1]));

// Variáveis de escopo declaradas em qualquer folha do repositório, mais as
// que o JSX injeta por style={{ '--x': ... }} — legítimas, valor vem do dado.
const scoped = new Set();
for (const f of ALL_SHEETS) {
  for (const m of readFileSync(f, 'utf8').matchAll(/(--[a-z0-9-]+)\s*:/g)) scoped.add(m[1]);
}
for (const f of [...walk('app', ['.jsx', '.tsx']), ...walk('src', ['.jsx', '.tsx'])]) {
  for (const m of readFileSync(f, 'utf8').matchAll(/['"](--[a-z0-9-]+)['"]\s*:/g)) scoped.add(m[1]);
}

for (const file of SHEETS) {
  const src = readFileSync(file, 'utf8');

  // 1. Nenhum literal de cor fora de app/tokens.css.
  for (const m of src.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
    if (src.slice(Math.max(0, m.index - 1), m.index).match(/[\w-]/)) continue; // seletor de id
    if (/^#[0-9a-fA-F]{3,8}$/.test(m[0]) && !/[0-9a-fA-F]{3}/.test(m[0])) continue;
    const before = src.slice(0, m.index);
    const lastBrace = Math.max(before.lastIndexOf('{'), before.lastIndexOf('}'));
    const isSelector = before.slice(lastBrace + 1).includes(':') === false && !before.slice(lastBrace + 1).trim().endsWith(':');
    if (isSelector && !/:\s*[^;{}]*$/.test(before)) continue; // #id em seletor
    add(file, lineOf(src, m.index), 'cor-literal', `${m[0]} — use um token de ${TOKENS}`);
  }

  // 2. Alfa de rgba() na escada documentada.
  for (const m of src.matchAll(/rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([0-9]*\.?[0-9]+)\s*\)/g)) {
    const a = parseFloat(m[1]);
    if (!ALPHAS.some((x) => Math.abs(x - a) < 1e-6)) {
      add(file, lineOf(src, m.index), 'alfa-fora-da-escada', `${a} — use ${ALPHAS.join(' / ')}`);
    }
  }

  // 3. Breakpoints na escala de seis degraus.
  for (const m of src.matchAll(/@media[^{]*/g)) {
    for (const w of m[0].matchAll(/(max|min)-width:\s*(\d+)px/g)) {
      const set = w[1] === 'max' ? BREAKPOINTS_MAX : BREAKPOINTS_MIN;
      if (!set.includes(Number(w[2]))) {
        add(file, lineOf(src, m.index), 'breakpoint-fora-da-escala',
          `${w[1]}-width:${w[2]}px — use ${set.join(' / ')}`);
      }
    }
  }

  // 4. border-radius sempre via token.
  for (const m of src.matchAll(/border(?:-(?:top|bottom)-(?:left|right))?-radius\s*:\s*([^;}!]+)/g)) {
    if (/\b\d+px\b/.test(m[1])) {
      add(file, lineOf(src, m.index), 'raio-literal', `${m[1].trim()} — use --pv-radius-*`);
    }
  }

  // 5. Espaço em múltiplo de 4px.
  for (const m of src.matchAll(SPACING_PROPS)) {
    if (/clamp|calc/.test(m[2])) continue;
    for (const v of m[2].matchAll(/\b(\d+)px\b/g)) {
      const px = Number(v[1]);
      if (px >= 4 && px % 4 !== 0) {
        add(file, lineOf(src, m.index), 'espaco-fora-da-escada', `${m[1]}: ${px}px — use múltiplo de 4`);
      }
    }
  }

  // 6. Nenhuma variável órfã. Escopo local pode ser declarado em qualquer
  //    folha (.ms em design-system.css e usado em motosul.css, por exemplo).
  for (const m of src.matchAll(/var\(\s*(--[a-z0-9-]+)/g)) {
    const name = m[1];
    if (declared.has(name) || scoped.has(name) || name.startsWith('--font-')) continue;
    add(file, lineOf(src, m.index), 'token-orfao', `${name} não é declarado em nenhuma folha`);
  }
}

// ---------------------------------------------------------------------------
// JSX: nenhuma cor literal. Cor em JS vem de src/palette.js.
// ---------------------------------------------------------------------------
const PALETTE = 'src/palette.js';
const paletteSrc = readFileSync(PALETTE, 'utf8');

for (const file of [...walk('app', ['.jsx', '.tsx']), ...walk('src', ['.jsx', '.tsx'])]) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
    if (m[0] === '#feed') continue;
    add(file, lineOf(src, m.index), 'cor-literal-jsx', `${m[0]} — importe de ${PALETTE}`);
  }
  for (const m of src.matchAll(/rgba?\(\s*\d+\s*,/g)) {
    add(file, lineOf(src, m.index), 'rgba-literal-jsx', 'use withAlpha(PV.x, alfa)');
  }
  for (const m of src.matchAll(/withAlpha\(\s*PV\.[A-Za-z0-9]+\s*,\s*([0-9.]+)\s*\)/g)) {
    const a = parseFloat(m[1]);
    if (!ALPHAS.some((x) => Math.abs(x - a) < 1e-6)) {
      add(file, lineOf(src, m.index), 'alfa-fora-da-escada', `${a} em withAlpha`);
    }
  }
}

// ---------------------------------------------------------------------------
// src/palette.js precisa espelhar app/tokens.css.
// ---------------------------------------------------------------------------
const camel = (t) => t.replace(/^--pv-/, '').replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const tokenColors = new Map();
for (const m of tokenSrc.matchAll(/^\s*(--pv-[a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\s*;/gm)) {
  tokenColors.set(camel(m[1]), m[2].toLowerCase());
}
const paletteColors = new Map();
for (const m of paletteSrc.matchAll(/^\s*([A-Za-z][A-Za-z0-9]*)\s*:\s*'(#[0-9a-fA-F]{3,8})'/gm)) {
  paletteColors.set(m[1], m[2].toLowerCase());
}
for (const [name, hex] of paletteColors) {
  if (!tokenColors.has(name)) {
    add(PALETTE, 1, 'paleta-sem-token', `PV.${name} não tem --pv-${name.replace(/([A-Z0-9])/g, '-$1').toLowerCase()} em ${TOKENS}`);
  } else if (tokenColors.get(name) !== hex && tokenColors.get(name).replace(/^#(.)\1(.)\2(.)\3$/, '#$1$2$3') !== hex) {
    add(PALETTE, 1, 'paleta-divergente', `PV.${name}=${hex} mas o token vale ${tokenColors.get(name)}`);
  }
}

const stillPending = PENDING.filter((f) => ALL_SHEETS.includes(f));
const pendingNote = stillPending.length
  ? `\nPendente de normalização (fora da checagem): ${stillPending.join(', ')}`
  : '';

if (problems.length === 0) {
  console.log(`Sistema visual: sem desvios.${pendingNote}`);
  process.exit(0);
}

const byRule = problems.reduce((acc, p) => ((acc[p.rule] = (acc[p.rule] || 0) + 1), acc), {});
console.error(`Sistema visual: ${problems.length} desvio(s).\n`);
for (const p of problems.slice(0, 60)) {
  console.error(`  ${p.file}:${p.line}  [${p.rule}] ${p.detail}`);
}
if (problems.length > 60) console.error(`  … e mais ${problems.length - 60}.`);
console.error('\nResumo:', byRule);
if (pendingNote) console.error(pendingNote);
process.exit(1);
