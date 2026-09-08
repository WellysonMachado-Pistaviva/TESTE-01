# Tokens — referência

Fonte única: [`app/tokens.css`](../../app/tokens.css). Nenhuma outra folha declara token.
Ordem de carga em [`app/site.css`](../../app/site.css): `tokens.css` → `src/index.css` → leaflet → `globals.css` → `design-system.css`.

Verificação: `npm run audit:design`. Cobre todas as folhas do repositório e todo `.jsx`; folha nova entra sozinha.

## Cor

Todo literal de cor vive em `tokens.css`. Fora dele, só `var(--pv-…)`.

### Marca

| Token | Valor | Uso |
| --- | --- | --- |
| `--pv-orange` | `#ff5a00` | ação primária, link, destaque |
| `--pv-orange-strong` | `#e84e00` | hover/pressed do primário |
| `--pv-orange-deep` | `#ac3c00` | laranja legível sobre superfície clara |
| `--pv-orange-soft` | `#ff7a1a` | realce sobre escuro |
| `--pv-orange-light` | `#ff8a4b` | realce claro sobre escuro |
| `--pv-orange-tint` | `#ffad7e` | texto de apoio sobre escuro |
| `--pv-orange-pale` | `#ffd5be` | superfície e borda muito claras |

Botão primário: fundo `--pv-orange`, texto `--pv-black`. Laranja nunca substitui cor de status nem legenda de mapa.

### Rampa escura

`--pv-black-0` `#0a0a0b` · `--pv-black` `#0c0c0d` (fundo padrão) · `--pv-black-2` `#16161a` (superfície elevada) · `--pv-black-3` `#1f1f24` (cartão) · `--pv-black-4` `#26262c` (campo) · `--pv-black-5` `#38383e` (borda sólida).

### Rampa clara

`--pv-white` · `--pv-offwhite` `#f4f3ef` (papel padrão) · `--pv-offwhite-2` `#eae7df` (faixa alternada) · `--pv-line-light` `#deded9` · `--pv-line-light-2` `#d4d0c8`.

### Texto e neutros

`--pv-text-dark` `#171719` · `--pv-text-light` `#f5f5f3`.
Frios: `--pv-muted-dark` `#62616a` · `--pv-muted-mid` `#8a8a90` · `--pv-muted-light` `#bfc0c3`.
Quentes (sobre papel): `--pv-warm-300` `#a9a49c` · `--pv-warm-500` `#8f8a83` · `--pv-warm-700` `#6f6b65` · `--pv-warm-900` `#4e4b46`.

### Status — nunca trocados por laranja

`--pv-success` `#22c55e` · `--pv-success-deep` `#00875a` (texto sobre claro) · `--pv-success-ink` `#04210f` (texto sobre verde) · `--pv-danger` `#ef4444` · `--pv-warning` `#f59e0b` · `--pv-warning-ink` `#1a1205` · `--pv-whatsapp` `#25d366`.

### Especiais

`--pv-forest` `#282d27` e `--pv-forest-deep` `#121612` (comunidade e experiências) · `--pv-yellow` / `--pv-yellow-strong` (CTA de afiliado) · `--pv-slate` (medidor de ocupação) · `--pv-info` (link em pré-visualização SEO).

### Escala categórica

Matiz distinto por leitura geográfica, para o mapa e a legenda do Parque. Nunca substituída por laranja nem por cor de status.

`--pv-cat-blue` · `--pv-cat-cyan` · `--pv-cat-green` · `--pv-cat-lime` · `--pv-cat-purple` · `--pv-cat-gold` · `--pv-cat-red`

Camadas do mapa desenhado: `--pv-map-water`, `--pv-map-water-light`, `--pv-map-green`, `--pv-map-green-light`, `--pv-map-green-pale`, `--pv-map-track`.

### Marcas externas

`--pv-brand-youtube`, `--pv-brand-ig-1..9`, `--pv-brand-estrada-x`. São ativos de terceiros, não paleta Pistaviva: não usar em componente próprio.

### Transparência

`rgba()` só com base de token e alfa da escada:

```
0 · .04 · .08 · .12 · .16 · .24 · .32 · .40 · .50 · .60 · .72 · .85 · 1
```

Bases permitidas: `12,12,13` (preto) · `10,10,11` · `22,22,26` · `255,255,255` · `255,90,0` · `255,138,75` · `244,243,239` · `18,22,18` · `4,33,15` · `34,197,94` · `239,68,68`.
Linhas prontas: `--pv-line-dark` (.12), `--pv-line-dark-2` (.20), `--pv-line-dark-3` (.50), `--pv-line-light`, `--pv-orange-subtle`, `--pv-orange-glow`.

## Geometria — seis degraus

| Token | Valor | Uso |
| --- | --- | --- |
| `--pv-radius-xs` | 2px | tag, chip |
| `--pv-radius-sm` | 4px | campo, botão pequeno |
| `--pv-radius` | 6px | padrão de botão e cartão |
| `--pv-radius-lg` | 12px | painel, modal |
| `--pv-radius-xl` | 18px | bloco editorial largo |
| `--pv-radius-pill` | 999px | pílula, badge |

`border-radius` nunca recebe px cru. `50%` é permitido para círculo.

## Espaço

Escada de 4px. Degraus nomeados, preferidos:

`--pv-space-0` 4 · `--pv-space-1` 8 · `--pv-space-2` 16 · `--pv-space-3` 24 · `--pv-space-4` 32 · `--pv-space-5` 48 · `--pv-space-6` 72

Valores intermediários (12, 20, 28, 40, 56, 64) ficam em px, sempre múltiplos de 4. Abaixo de 4px só fio de 1–3px.

### Ritmo vertical de seção — quatro degraus

`--sec-y-xs` faixa fina · `--sec-y-sm` CTA e relacionados · `--sec-y` seção de conteúdo · `--sec-y-lg` abertura e fechamento de página. Seção nova não inventa `clamp` próprio.

### Largura

`--maxw` 1280 (padrão) · `--maxw-wide` 1320 (`.wrap--wide`) · `--maxw-narrow` 760 (`.wrap--narrow`, coluna de leitura) · `--gut` `clamp(18px,5vw,72px)`.

## Tipografia — três papéis

| Token | Papel |
| --- | --- |
| `--display` | título de campanha e cabeçalho |
| `--font` | corpo, formulário, UI |
| `--mono` | rótulo, dado, eyebrow, metadado |

`--serif` existe para citação longa. Não criar apelido novo: `--disp`, `--headline`, `--body2` e `--semi` foram removidos.

## Breakpoints — seis degraus

| max-width | complemento min-width | Alvo |
| --- | --- | --- |
| 480 | 481 | celular pequeno |
| 640 | 641 | celular |
| 768 | 769 | celular grande / tablet retrato |
| 900 | 901 | tablet paisagem |
| 1024 | 1025 | laptop |
| 1180 | 1181 | desktop largo |

Nenhum outro valor. `prefers-reduced-motion:reduce` e `hover:none` seguem livres.

## Movimento

`--pv-motion` `180ms ease` para transição de componente; `--transition` `all .2s ease` para o legado. Todo movimento respeita `prefers-reduced-motion`.

## Sombra

O sistema é chapado: `--shadow-sm|md|lg` são `none`. Profundidade vem de superfície e linha, não de sombra.
