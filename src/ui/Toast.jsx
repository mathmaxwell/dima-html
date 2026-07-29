import { useColors } from '../theme/ThemeContext';
import { bottom } from '../theme/safeArea';
import { useNav } from '../store/NavContext';
import { useSession } from '../store/SessionContext';
import { Icon } from './Icon';

/** Тёплый золотистый — цвет иконки по умолчанию. */
const DEFAULT_ICON_COLOR = '#c39a63';

/**
 * Всплывающая подсказка внизу экрана. Поднимается выше, когда под ней
 * есть таб-бар.
 */
export function Toast() {
  const c = useColors();
  const { toast } = useNav();
  const { signedIn } = useSession();

  if (!toast) return null;

  const iconColor = toast.tone ? c[toast.tone] : DEFAULT_ICON_COLOR;

  return (
    <div
      style={{
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: signedIn ? bottom(84) : bottom(40),
        zIndex: 200,
        animation: 'dktoast .3s ease',
      }}
    >
      <div
        style={{
          background: c.toastBg,
          color: '#f3eee4',
          padding: '14px 16px',
          borderRadius: 16,
          boxShadow: '0 12px 30px rgba(0,0,0,.35)',
          display: 'flex',
          alignItems: 'center',
          gap: 11,
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {toast.icon && <Icon name={toast.icon} size={18} color={iconColor} />}
        <span style={{ lineHeight: 1.35 }}>{toast.text}</span>
      </div>
    </div>
  );
}
