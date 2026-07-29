import { useColors } from '../theme/ThemeContext';
import { Icon } from './Icon';

/**
 * Строка списка: иконка, заголовок, подпись и стрелка справа.
 * Вместо стрелки можно подставить свой элемент — статус или переключатель.
 */
export function MenuRow({ icon, title, sub, onClick, right, last = false }) {
  const c = useColors();

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        background: c.card,
        border: 'none',
        borderBottom: last ? 'none' : `1px solid ${c.line}`,
        padding: '15px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 13,
        cursor: onClick ? 'pointer' : 'default',
        textAlign: 'left',
        color: c.text,
      }}
    >
      {icon && (
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 11,
            background: c.chip,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none',
          }}
        >
          <Icon name={icon} size={20} color={c.accent} />
        </div>
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600 }}>{title}</div>
        {sub && <div style={{ fontSize: 12.5, color: c.sec, marginTop: 1 }}>{sub}</div>}
      </div>

      {right !== undefined ? right : <Icon name="chevR" size={18} color={c.faint} />}
    </button>
  );
}

/** Обойма из строк с общей рамкой и скруглением. */
export function MenuGroup({ children, style }) {
  const c = useColors();
  return (
    <div
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        border: `1px solid ${c.line}`,
        marginBottom: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Цветная плашка статуса: «подтверждён», «в пути», «получено». */
export function StatusTag({ children, color, style }) {
  const c = useColors();
  const tone = color || c.ok;
  return (
    <span
      style={{
        fontSize: 11.5,
        fontWeight: 700,
        color: tone,
        background: `${tone}1e`,
        padding: '4px 9px',
        borderRadius: 8,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </span>
  );
}
