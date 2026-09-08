// Paleta canônica para JavaScript — espelha app/tokens.css.
// Existe porque atributo SVG, opção do Leaflet, canvas do html2canvas e valor
// gravado no banco não resolvem var(). Em CSS, use os tokens; aqui, estes nomes.
// `npm run audit:design` falha se os dois arquivos divergirem.

export const PV = {
  // marca
  orange: '#ff5a00',
  orangeStrong: '#e84e00',
  orangeDeep: '#ac3c00',
  orangeSoft: '#ff7a1a',
  orangeLight: '#ff8a4b',
  orangeTint: '#ffad7e',
  orangePale: '#ffd5be',

  // rampa escura
  black0: '#0a0a0b',
  black: '#0c0c0d',
  black2: '#16161a',
  black3: '#1f1f24',
  black4: '#26262c',
  black5: '#38383e',

  // rampa clara
  white: '#ffffff',
  offwhite: '#f4f3ef',
  offwhite2: '#eae7df',
  lineLight: '#deded9',
  lineLight2: '#d4d0c8',

  // texto e neutros
  textDark: '#171719',
  textLight: '#f5f5f3',
  mutedDark: '#62616a',
  mutedMid: '#8a8a90',
  mutedLight: '#bfc0c3',
  warm300: '#a9a49c',
  warm500: '#8f8a83',
  warm700: '#6f6b65',
  warm900: '#4e4b46',

  // status
  success: '#22c55e',
  successDeep: '#00875a',
  successInk: '#04210f',
  danger: '#ef4444',
  warning: '#f59e0b',
  warningInk: '#1a1205',
  whatsapp: '#25d366',

  // especiais
  forest: '#282d27',
  forestDeep: '#121612',
  yellow: '#ffe600',
  yellowStrong: '#f4dc00',
  slate: '#5b6b78',
  info: '#9db4ff',

  // marcas externas
  brandYoutube: '#ff0000',
  brandEstradaX: '#33dd3a',
  brandGoogleBlue: '#4285f4',
  brandGoogleGreen: '#34a853',
  brandGoogleRed: '#ea4335',
  brandGoogleYellow: '#fbbc04',

  // legenda de mapa — distinta da paleta de marca, por leitura geográfica
  mapWater: '#0064b4',
  mapWaterLight: '#4fc3e8',
  mapGreen: '#6f9a5e',
  mapGreenLight: '#9fd6b4',
  mapGreenPale: '#d9eede',
  mapTrack: '#6b7280',
};

// Dificuldade de rota e trilha. Verde → âmbar → vermelho, nunca laranja de marca.
export const DIFFICULTY = {
  'Fácil': PV.success,
  'Iniciante a intermediário': PV.success,
  'Intermediário': PV.warning,
  'Avançado': PV.danger,
};

export default PV;

// Escada de opacidade do sistema. Mesma lista de docs/design/tokens.md.
export const ALPHA = [0, 0.04, 0.08, 0.12, 0.16, 0.24, 0.32, 0.4, 0.5, 0.6, 0.72, 0.85, 1];

// withAlpha(PV.orange, .12) -> 'rgba(255,90,0,0.12)'
export function withAlpha(hex, a) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full.slice(0, 6), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
