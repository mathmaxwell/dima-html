import { useColors } from '../../theme/ThemeContext';
import { FONT } from '../../theme/palette';
import { bottom } from '../../theme/safeArea';
import { TopSpacer } from '../../layout/AppShell';
import { useNav } from '../../store/NavContext';
import { useData } from '../../store/DataContext';
import { Button } from '../../ui/Button';
import { Icon } from '../../ui/Icon';
import { Photo } from '../../ui/Photo';

/** Круглая кнопка поверх видео с домофона. */
function OverlayButton({ icon, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'rgba(0,0,0,.4)',
        border: 'none',
        width: 40,
        height: 40,
        borderRadius: 12,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <Icon name={icon} size={20} color="#fff" />
    </button>
  );
}

/**
 * Звонок в домофон. Экран всегда тёмный — так видео читается лучше
 * независимо от темы приложения.
 */
export function Intercom() {
  const c = useColors();
  const { back, switchTab, showToast } = useNav();
  const { intercom, setIntercom } = useData();

  // ---- дверь уже открыта ----
  if (intercom.opened) {
    return (
      <div style={{ flex: 1, background: '#0f0d0a', display: 'flex', flexDirection: 'column' }}>
        <TopSpacer />

        <div style={{ padding: '0 20px', color: '#fff', flex: 'none' }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Главный вход</div>
          <div style={{ fontSize: 13, opacity: 0.6 }}>Дверь открыта на 10 секунд</div>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 380,
            margin: '16px 20px',
            borderRadius: 24,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Photo seed={6} style={{ position: 'absolute', inset: 0 }} />

          <div
            style={{
              position: 'absolute',
              left: 16,
              top: 16,
              background: 'rgba(0,0,0,.5)',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: c.ok }} />
            Дверь открыта
          </div>

          <div
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 24, textAlign: 'center' }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: c.ok,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
              }}
            >
              <Icon name="check" size={40} color="#fff" />
            </div>
          </div>
        </div>

        <div style={{ padding: '0 20px 34px', paddingBottom: bottom(34) }}>
          <Button
            full
            variant="soft"
            style={{ background: '#26221b', color: '#fff' }}
            onClick={() => {
              setIntercom({ opened: false });
              back();
            }}
          >
            Закрыть
          </Button>
        </div>
      </div>
    );
  }

  // ---- входящий вызов ----
  return (
    <div style={{ flex: 1, background: '#0f0d0a', display: 'flex', flexDirection: 'column' }}>
      <TopSpacer />

      <div
        style={{
          padding: '0 20px',
          color: '#fff',
          flex: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <button
          onClick={back}
          style={{
            background: 'rgba(255,255,255,.1)',
            border: 'none',
            width: 38,
            height: 38,
            borderRadius: 12,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="chevL" size={20} color="#fff" />
        </button>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Входящий вызов</div>
          <div style={{ fontSize: 12.5, opacity: 0.6 }}>Главный вход · домофон</div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 380,
          margin: '16px 20px',
          borderRadius: 24,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Photo seed={2} style={{ position: 'absolute', inset: 0 }} />

        <div
          style={{
            position: 'absolute',
            left: 16,
            top: 16,
            background: 'rgba(224,72,60,.9)',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#fff',
              animation: 'dkpulse 1s infinite',
            }}
          />
          LIVE
        </div>

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(0deg,rgba(0,0,0,.7),transparent)',
            padding: '40px 20px 20px',
            color: '#fff',
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 700 }}>Курьер · цветы</div>
          <div style={{ fontSize: 13, opacity: 0.8 }}>Домофон вызывает…</div>
        </div>

        <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8 }}>
          <OverlayButton
            icon={intercom.muted ? 'micoff' : 'mic'}
            onClick={() => setIntercom({ muted: !intercom.muted })}
          />
          <OverlayButton
            icon="video"
            onClick={() => showToast('Переключено на камеру двора', { icon: 'video' })}
          />
        </div>
      </div>

      <div style={{ padding: '0 20px 34px', paddingBottom: bottom(34) }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <button
            onClick={() => {
              back();
              showToast('Вызов отклонён', { icon: 'x', tone: 'err' });
            }}
            style={{
              flex: 1,
              background: c.err,
              border: 'none',
              borderRadius: 18,
              padding: 16,
              color: '#fff',
              fontSize: 15.5,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: FONT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Icon name="x" size={20} color="#fff" />
            Отклонить
          </button>

          <button
            onClick={() => setIntercom({ opened: true })}
            style={{
              flex: 1,
              background: c.ok,
              border: 'none',
              borderRadius: 18,
              padding: 16,
              color: '#fff',
              fontSize: 15.5,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: FONT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Icon name="key" size={20} color="#fff" />
            Открыть
          </button>
        </div>

        <Button
          full
          variant="soft"
          icon="chat"
          style={{ background: '#26221b', color: '#fff' }}
          onClick={() => switchTab('concierge')}
        >
          Написать консьержу
        </Button>
      </div>
    </div>
  );
}
