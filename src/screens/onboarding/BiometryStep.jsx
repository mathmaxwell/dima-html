import { useColors } from '../../theme/ThemeContext';
import { SERIF } from '../../theme/palette';
import { bottom } from '../../theme/safeArea';
import { TopSpacer } from '../../layout/AppShell';
import { useNav } from '../../store/NavContext';
import { useSession } from '../../store/SessionContext';
import { Button } from '../../ui/Button';

/** Рамка сканера лица — рисуется вручную, в наборе иконок её нет. */
function FaceIdMark({ color }) {
  return (
    <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round">
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
      <path d="M9 10v1M15 10v1M12 10v4M10 16a3 3 0 0 0 4 0" />
    </svg>
  );
}

export function BiometryStep() {
  const c = useColors();
  const { setStep } = useSession();
  const { showToast } = useNav();

  const connect = () => {
    showToast('Face ID подключён', { icon: 'check', tone: 'ok' });
    setTimeout(() => setStep('permissions'), 700);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopSpacer />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 34px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 28,
            background: c.card,
            border: `1px solid ${c.line}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 28,
            animation: 'dkbreathe 2.6s infinite',
          }}
        >
          <FaceIdMark color={c.accent} />
        </div>

        <div style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 600 }}>Вход по Face ID</div>
        <div style={{ marginTop: 12, color: c.sec, fontSize: 15, lineHeight: 1.5 }}>
          Открывайте двери и подтверждайте оплату одним взглядом — быстро и безопасно
        </div>
      </div>

      <div style={{ padding: '12px 26px 34px', paddingBottom: bottom(34) }}>
        <Button full onClick={connect}>
          Подключить Face ID
        </Button>
        <div
          onClick={() => setStep('permissions')}
          style={{
            textAlign: 'center',
            marginTop: 16,
            fontSize: 14.5,
            color: c.sec,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Пропустить
        </div>
      </div>
    </div>
  );
}
