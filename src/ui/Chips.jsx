import { useColors } from '../theme/ThemeContext';
import { FONT } from '../theme/palette';

/**
 * Ряд переключаемых «таблеток». Используется для типов, режимов, категорий.
 *
 * @param {Array<string|{value: string, label: string}>} options
 * @param {string} value — выбранный вариант
 * @param {Function} onChange
 * @param {boolean} scroll — прокручивать по горизонтали вместо переноса
 * @param {boolean} stretch — растянуть варианты на всю ширину поровну
 */
export function ChipGroup({ options, value, onChange, scroll = false, stretch = false, style }) {
  const c = useColors();
  const items = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));

  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        ...(scroll
          ? { overflowX: 'auto', paddingBottom: 4 }
          : { flexWrap: stretch ? 'nowrap' : 'wrap' }),
        ...style,
      }}
    >
      {items.map((item) => {
        const active = value === item.value;
        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            style={{
              flex: stretch ? 1 : 'none',
              background: active ? c.inv : c.chip,
              color: active ? c.invText : c.text,
              border: 'none',
              borderRadius: 12,
              padding: stretch ? '12px 0' : '11px 15px',
              fontSize: 13.5,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: FONT,
              whiteSpace: 'nowrap',
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

/** Скруглённые фильтры-пилюли: «Все», «Гости», «Персонал». */
export function FilterPills({ options, value, onChange, style }) {
  const c = useColors();
  const items = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));

  return (
    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, ...style }}>
      {items.map((item) => {
        const active = value === item.value;
        return (
          <button
            key={item.value}
            onClick={onChange ? () => onChange(item.value) : undefined}
            style={{
              flex: 'none',
              background: active ? c.inv : c.chip,
              color: active ? c.invText : c.text,
              border: 'none',
              borderRadius: 20,
              padding: '9px 15px',
              fontSize: 13,
              fontWeight: 600,
              cursor: onChange ? 'pointer' : 'default',
              fontFamily: FONT,
              whiteSpace: 'nowrap',
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

/** Пилюля-переключатель зоны доступа с галочкой при выборе. */
export function ToggleChip({ label, active, onClick }) {
  const c = useColors();

  return (
    <button
      onClick={onClick}
      style={{
        background: active ? `${c.accent}22` : c.chip,
        color: active ? c.accent : c.sec,
        border: `1px solid ${active ? c.accent : c.line}`,
        borderRadius: 20,
        padding: '9px 15px',
        fontSize: 13.5,
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: FONT,
      }}
    >
      {active ? `✓ ${label}` : label}
    </button>
  );
}
