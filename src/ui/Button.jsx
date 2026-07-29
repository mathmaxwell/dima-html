import { useColors } from '../theme/ThemeContext';
import { FONT } from '../theme/palette';
import { Icon } from './Icon';

/** Заливки кнопки под каждый вариант оформления. */
function variantStyle(c, variant) {
  switch (variant) {
    case 'soft':
      return { background: c.chip, color: c.text, border: 'none' };
    case 'ghost':
      return { background: 'transparent', color: c.text, border: `1px solid ${c.line}` };
    case 'danger':
      return { background: 'transparent', color: c.err, border: `1px solid ${c.err}` };
    case 'primary':
    default:
      return { background: c.inv, color: c.invText, border: 'none' };
  }
}

/** Лёгкое «вдавливание» при нажатии — общий для кнопок и карточек приём. */
export const pressHandlers = (scale = 0.97, enabled = true) =>
  enabled
    ? {
        onMouseDown: (e) => (e.currentTarget.style.transform = `scale(${scale})`),
        onMouseUp: (e) => (e.currentTarget.style.transform = 'scale(1)'),
        onMouseLeave: (e) => (e.currentTarget.style.transform = 'scale(1)'),
      }
    : {};

/**
 * Основная кнопка приложения.
 *
 * @param {'primary'|'soft'|'ghost'|'danger'} variant
 * @param {boolean} full — во всю ширину
 * @param {boolean} sm   — компактный размер
 * @param {string}  icon — имя иконки слева от подписи
 */
export function Button({
  children,
  onClick,
  variant = 'primary',
  full = false,
  sm = false,
  icon,
  disabled = false,
  style,
  ...rest
}) {
  const v = variantStyle(useColors(), variant);

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        ...v,
        opacity: disabled ? 0.45 : 1,
        width: full ? '100%' : 'auto',
        padding: sm ? '10px 16px' : '15px 20px',
        borderRadius: sm ? 12 : 16,
        fontFamily: FONT,
        fontSize: sm ? 14 : 15.5,
        fontWeight: 600,
        cursor: disabled ? 'default' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        letterSpacing: 0.1,
        transition: 'transform .12s, background .2s',
        ...style,
      }}
      {...pressHandlers(0.97, !disabled)}
      {...rest}
    >
      {icon && <Icon name={icon} size={18} color={v.color} />}
      {children}
    </button>
  );
}
