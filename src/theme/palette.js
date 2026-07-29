/**
 * Цветовые палитры. Одинаковый набор ключей в светлой и тёмной теме —
 * компоненты обращаются к ним по имени и про режим ничего не знают.
 */

export const LIGHT = {
  bg: '#e9e1d6',
  card: '#faf6f0',
  card2: '#f1e9dd',
  chip: '#ece2d4',

  text: '#241a17',
  sec: '#8a7c71',
  faint: '#b7a999',
  line: 'rgba(80,40,35,.085)',

  inv: '#241417',
  invText: '#f6efe6',

  accent: '#a2373d',
  accent2: '#c0763a',
  rose: '#c97b76',

  ok: '#5f7350',
  warn: '#c0763a',
  err: '#a2373d',
  live: '#bd453f',

  shadow: '0 22px 60px rgba(70,35,30,.24)',
  photo: '#d8ccbf',

  // фон переключателя в выключенном состоянии
  switchOff: '#d8d1c4',
  // подложка таб-бара и всплывающих подсказок
  barBg: 'rgba(251,249,245,.92)',
  toastBg: '#26221b',
};

export const DARK = {
  bg: '#160f11',
  card: '#211619',
  card2: '#2a1d21',
  chip: '#301f24',

  text: '#f3e9e4',
  sec: '#b09a92',
  faint: '#6d5852',
  line: 'rgba(255,255,255,.09)',

  inv: '#f3e9e4',
  invText: '#170f11',

  accent: '#d07a72',
  accent2: '#d69a5a',
  rose: '#c76b6b',

  ok: '#8aa276',
  warn: '#d69a5a',
  err: '#e07068',
  live: '#d8564e',

  shadow: '0 22px 60px rgba(0,0,0,.6)',
  photo: '#2c1e22',

  switchOff: '#4a453a',
  barBg: 'rgba(26,23,18,.9)',
  toastBg: '#3a3428',
};

/** Основной шрифт интерфейса. */
export const FONT = "'Golos Text',system-ui,sans-serif";
/** Архитектурный узкий гротеск — заголовки и логотип. */
export const SERIF = "'Oswald',system-ui,sans-serif";
/** Издательская антиква — крупные «эмоциональные» строки. */
export const EDITORIAL = "'Cormorant Garamond',Georgia,serif";

/**
 * @param {boolean} dark
 * @param {string} [accent] — фирменный цвет можно переопределить снаружи
 */
export function buildPalette(dark, accent) {
  const base = dark ? DARK : LIGHT;
  return { ...base, dark, accent: accent || base.accent };
}
