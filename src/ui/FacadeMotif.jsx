import { useColors } from '../theme/ThemeContext';

/**
 * Фирменный мотив фасада — вертикальные мраморные рёбра со смещением.
 * Используется как логотип, как разделитель под фото и как декор.
 *
 * @param {number} columns — количество рёбер
 * @param {string} color   — цвет рёбер, по умолчанию розовый из палитры
 * @param {number} opacity — прозрачность рёбер
 */
export function FacadeMotif({ columns = 9, color, opacity = 0.9, style }) {
  const c = useColors();
  const bar = color || c.rose;

  return (
    <div style={{ display: 'flex', alignItems: 'stretch', overflow: 'hidden', ...style }}>
      {Array.from({ length: columns }, (_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            margin: '0 1.5px',
            background: `linear-gradient(180deg,${bar}, ${bar}cc)`,
            opacity,
            // сдвиг по двум периодам сразу — рисунок не выглядит регулярным
            transform: `translateY(${(i % 2) * 18 + (i % 3) * 6}%)`,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
}
