import { useColors, useTheme } from '../theme/ThemeContext';
import { useNav } from '../store/NavContext';
import { Icon } from '../ui/Icon';
import { Photo } from '../ui/Photo';

/** Квадратная кнопка-иконка в шапках. Стиль общий для всех экранов. */
export function useIconButtonStyle() {
  const c = useColors();
  return {
    width: 42,
    height: 42,
    borderRadius: 13,
    background: c.card,
    border: `1px solid ${c.line}`,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: c.text,
  };
}

export function IconButton({ icon, onClick, size = 20, color, children, style }) {
  const base = useIconButtonStyle();
  return (
    <button onClick={onClick} style={{ ...base, ...style }}>
      <Icon name={icon} size={size} color={color} />
      {children}
    </button>
  );
}

/**
 * Шапка вкладки: аватар с приветствием слева, переключатель темы
 * и уведомления справа.
 */
export function Header({ greeting, children }) {
  const c = useColors();
  const { dark, toggleTheme } = useTheme();
  const { go } = useNav();
  const iconBtn = useIconButtonStyle();

  return (
    <div style={{ padding: '0 20px 4px', flex: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          onClick={() => go({ key: 'profile' })}
          style={{ display: 'flex', alignItems: 'center', gap: 11, cursor: 'pointer' }}
        >
          <Photo seed={9} style={{ width: 44, height: 44, borderRadius: '50%', flex: 'none' }} />
          <div>
            <div style={{ fontSize: 13, color: c.sec, fontWeight: 500 }}>{greeting}</div>
            <div
              style={{
                fontSize: 16.5,
                fontWeight: 700,
                letterSpacing: -0.2,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              Дом Кино · 1204
              <Icon name="chevD" size={14} color={c.sec} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={toggleTheme} style={iconBtn}>
            <Icon name={dark ? 'sun' : 'moon'} size={20} />
          </button>
          <button
            onClick={() => go({ key: 'notifications' })}
            style={{ ...iconBtn, position: 'relative' }}
          >
            <Icon name="bell" size={20} />
            <span
              style={{
                position: 'absolute',
                top: 9,
                right: 9,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: c.err,
                border: `2px solid ${c.card}`,
              }}
            />
          </button>
        </div>
      </div>

      {children}
    </div>
  );
}

/** Шапка внутреннего экрана: кнопка «назад» и заголовок. */
export function SubHeader({ title, onBack, right }) {
  const { back } = useNav();
  const iconBtn = useIconButtonStyle();

  return (
    <div
      style={{
        padding: '0 18px 8px',
        flex: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <button onClick={onBack || back} style={iconBtn}>
        <Icon name="chevL" size={20} />
      </button>
      <div style={{ flex: 1, fontSize: 18, fontWeight: 700, letterSpacing: -0.2 }}>{title}</div>
      {right}
    </div>
  );
}
