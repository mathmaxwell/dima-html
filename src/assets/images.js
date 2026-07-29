/**
 * Реальные рендеры комплекса. Импортируются через Vite, поэтому в сборке
 * превращаются во встроенные data:-URI, а в режиме разработки отдаются
 * с диска.
 */
import tower from './tower.jpg';
import facade from './facade.jpg';
import facadeT from './facadeT.jpg';
import lounge from './lounge.jpg';
import lounge2 from './lounge2.jpg';
import wellness from './wellness.jpg';
import garden from './garden.jpg';
import context from './context.jpg';

/** Ночной вид башни — заставка и главный герой «Сегодня». */
export const IMAGES = {
  tower,
  facade,
  facadeT,
  lounge,
  lounge2,
  wellness,
  garden,
  context,
};

/** Картинка по имени; если имя незнакомое — общий фасад. */
export const imageOf = (name) => IMAGES[name] || IMAGES.facade;
