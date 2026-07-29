import { useColors } from '../theme/ThemeContext';
import { pressHandlers } from './Button';

/**
 * Карточка — базовая поверхность интерфейса.
 * Если передан onClick, карточка становится нажимаемой и слегка проседает.
 *
 * @param {number} radius — скругление, по умолчанию 22
 * @param {number} pad    — внутренний отступ, по умолчанию 18
 * @param {boolean} flat  — без тени
 */
export function Card({ children, onClick, radius = 22, pad = 18, flat = false, style, ...rest }) {
  const c = useColors();

  return (
    <div
      onClick={onClick}
      style={{
        background: c.card,
        borderRadius: radius,
        padding: pad,
        boxShadow: flat ? 'none' : '0 1px 2px rgba(0,0,0,.04)',
        border: `1px solid ${c.line}`,
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        transition: 'transform .12s',
        ...style,
      }}
      {...pressHandlers(0.985, Boolean(onClick))}
      {...rest}
    >
      {children}
    </div>
  );
}
