import { useColors } from '../theme/ThemeContext';
import { FONT } from '../theme/palette';
import { Icon } from './Icon';

/** Подписанное поле формы. */
export function Field({ label, children, style }) {
  const c = useColors();
  return (
    <div style={{ marginBottom: 14, ...style }}>
      {label && (
        <div style={{ fontSize: 12.5, fontWeight: 600, color: c.sec, marginBottom: 7 }}>{label}</div>
      )}
      {children}
    </div>
  );
}

/** Однострочный ввод в общем оформлении карточек. */
export function TextInput({ value, onChange, placeholder, inputMode, style }) {
  const c = useColors();
  return (
    <input
      value={value}
      placeholder={placeholder}
      inputMode={inputMode}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        background: c.card,
        border: `1px solid ${c.line}`,
        borderRadius: 14,
        padding: '14px 15px',
        fontFamily: FONT,
        fontSize: 15,
        color: c.text,
        outline: 'none',
        ...style,
      }}
    />
  );
}

/** Многострочный ввод — описание заявки, пожелания к заказу. */
export function TextArea({ value, onChange, placeholder, minHeight = 90, style }) {
  const c = useColors();
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        minHeight,
        background: c.card,
        border: `1px solid ${c.line}`,
        borderRadius: 14,
        padding: '14px 15px',
        fontFamily: FONT,
        fontSize: 15,
        color: c.text,
        outline: 'none',
        resize: 'none',
        ...style,
      }}
    />
  );
}

/**
 * Поле-кнопка: показывает выбранное значение и открывает шторку выбора.
 * Так выбираются дата и время.
 */
export function PickerButton({ value, icon, onClick, style }) {
  const c = useColors();
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        background: c.card,
        border: `1px solid ${c.line}`,
        borderRadius: 14,
        padding: '14px 15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        color: c.text,
        ...style,
      }}
    >
      <span style={{ fontSize: 15, fontWeight: 500 }}>{value}</span>
      {icon && <Icon name={icon} size={18} color={c.accent} />}
    </button>
  );
}

/** Строка «подпись + переключатель» внутри карточки. */
export function ToggleRow({ icon, label, children, last = false, style }) {
  const c = useColors();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 0',
        borderBottom: last ? 'none' : `1px solid ${c.line}`,
        ...style,
      }}
    >
      {icon && <Icon name={icon} size={20} color={c.accent} />}
      <span style={{ flex: 1, fontSize: 14.5, fontWeight: 500 }}>{label}</span>
      {children}
    </div>
  );
}

/** Отдельная кнопка-строка с переключателем на всю ширину. */
export function ToggleCardRow({ icon, label, children, onClick, style }) {
  const c = useColors();
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        background: c.card,
        border: `1px solid ${c.line}`,
        borderRadius: 14,
        padding: '14px 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        color: c.text,
        ...style,
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left' }}>
        {icon && <Icon name={icon} size={19} color={c.accent} />}
        <span style={{ fontSize: 15, fontWeight: 500 }}>{label}</span>
      </span>
      {children}
    </button>
  );
}
