import { useColors } from '../theme/ThemeContext';
import { ICON_PATHS } from './iconPaths';

/**
 * Иконка из общего набора.
 *
 * @param {string} name  — ключ из ICON_PATHS
 * @param {number} size  — сторона квадрата, по умолчанию 22
 * @param {string} color — цвет обводки, по умолчанию основной цвет текста
 */
export function Icon({ name, size = 22, color, ...rest }) {
  const c = useColors();
  const paths = ICON_PATHS[name];

  if (!paths) {
    if (import.meta.env.DEV) console.warn(`Icon: нет иконки «${name}»`);
    return null;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || c.text}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
