import { useColors } from '../theme/ThemeContext';
import { FONT } from '../theme/palette';
import { Icon } from './Icon';

/**
 * Заголовок раздела с необязательной ссылкой справа.
 *
 * @param {{label: string, onClick: Function}} action
 */
export function SectionTitle({ children, action }) {
  const c = useColors();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        margin: '26px 0 12px',
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 20,
          letterSpacing: -0.3,
          color: c.text,
        }}
      >
        {children}
      </div>

      {action && (
        <button
          onClick={action.onClick}
          style={{
            background: 'none',
            border: 'none',
            color: c.sec,
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          {action.label}
          <Icon name="chevR" size={14} color={c.sec} />
        </button>
      )}
    </div>
  );
}

/** Мелкий подзаголовок над группой полей: «ТИП УБОРКИ», «КОГДА». */
export function FieldLabel({ children, style }) {
  const c = useColors();
  return (
    <div style={{ fontSize: 12.5, fontWeight: 600, color: c.sec, marginBottom: 8, ...style }}>
      {children}
    </div>
  );
}
