/**
 * Отступы под системные элементы телефона.
 *
 * Приложение занимает весь экран, поэтому сверху под него попадает чёлка,
 * а снизу — жестовая полоса. В обычной вкладке браузера эти значения равны
 * нулю; они «оживают», когда приложение запущено с рабочего стола.
 */

/** Верхний отступ содержимого экрана. */
export const TOP_PAD = 'calc(env(safe-area-inset-top, 0px) + 12px)';

/** Нижний отступ без запаса. */
export const BOTTOM_PAD = 'env(safe-area-inset-bottom, 0px)';

/** Нижний отступ с запасом в px. */
export const bottom = (px) => `calc(env(safe-area-inset-bottom, 0px) + ${px}px)`;

/** Верх для элементов, наложенных на полноэкранное фото. */
export const heroTop = (px) => `calc(env(safe-area-inset-top, 0px) + ${px}px)`;
