import { useColors } from '../theme/ThemeContext';
import { Icon } from './Icon';

/**
 * Таблица «свойство — значение».
 * @param {Array<[string, string]>} rows
 */
export function KeyValue({ rows }) {
  const c = useColors();

  return (
    <div
      style={{
        background: c.card,
        border: `1px solid ${c.line}`,
        borderRadius: 18,
        overflow: 'hidden',
      }}
    >
      {rows.map(([label, value], i) => (
        <div
          key={label}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '13px 16px',
            borderBottom: i === rows.length - 1 ? 'none' : `1px solid ${c.line}`,
            fontSize: 14.5,
          }}
        >
          <span style={{ color: c.sec }}>{label}</span>
          <span style={{ fontWeight: 600, textAlign: 'right' }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Список второстепенных действий под карточкой экрана.
 * @param {Array<{icon: string, label: string, onClick: Function, danger?: boolean}>} items
 */
export function ActionList({ items, style }) {
  const c = useColors();

  return (
    <div
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        border: `1px solid ${c.line}`,
        marginTop: 16,
        ...style,
      }}
    >
      {items.map((item, i) => (
        <button
          key={item.label}
          onClick={item.onClick}
          style={{
            width: '100%',
            background: c.card,
            border: 'none',
            borderBottom: i === items.length - 1 ? 'none' : `1px solid ${c.line}`,
            padding: '15px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
            color: item.danger ? c.err : c.text,
            textAlign: 'left',
          }}
        >
          <Icon name={item.icon} size={20} color={item.danger ? c.err : c.accent} />
          <span style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>{item.label}</span>
          <Icon name="chevR" size={17} color={c.faint} />
        </button>
      ))}
    </div>
  );
}

/** Полоска-подсказка с иконкой: предупреждение, пояснение, статус. */
export function Notice({ icon, tone, children, style }) {
  const c = useColors();
  const color = tone || c.accent;

  return (
    <div
      style={{
        background: `${color}14`,
        borderRadius: 16,
        padding: '13px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        fontSize: 13.5,
        lineHeight: 1.4,
        ...style,
      }}
    >
      <Icon name={icon} size={20} color={color} />
      <span style={{ flex: 1 }}>{children}</span>
    </div>
  );
}
