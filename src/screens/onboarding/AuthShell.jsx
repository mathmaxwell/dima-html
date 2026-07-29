import { useColors } from '../../theme/ThemeContext';
import { SERIF } from '../../theme/palette';
import { bottom } from '../../theme/safeArea';
import { TopSpacer } from '../../layout/AppShell';
import { Icon } from '../../ui/Icon';

/**
 * Общая раскладка шагов входа: заголовок, прокручиваемая середина
 * и закреплённая внизу кнопка.
 */
export function AuthShell({ title, sub, footer, onBack, children }) {
  const c = useColors();

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopSpacer />

      <div style={{ padding: '6px 26px 0' }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              background: c.chip,
              border: 'none',
              width: 40,
              height: 40,
              borderRadius: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <Icon name="chevL" size={20} />
          </button>
        )}

        <div
          style={{
            fontFamily: SERIF,
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: -0.3,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>

        {sub && (
          <div style={{ marginTop: 10, color: c.sec, fontSize: 15, lineHeight: 1.4 }}>{sub}</div>
        )}
      </div>

      <div className="dk-scroll" style={{ flex: 1, padding: 26 }}>
        {children}
      </div>

      {footer && (
        <div style={{ padding: '12px 26px 34px', paddingBottom: bottom(34) }}>{footer}</div>
      )}
    </div>
  );
}
