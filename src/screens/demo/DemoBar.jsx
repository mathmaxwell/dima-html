import { FONT } from '../../theme/palette';
import { bottom } from '../../theme/safeArea';
import { useNav } from '../../store/NavContext';
import { useData } from '../../store/DataContext';
import { useSession } from '../../store/SessionContext';
import { Icon } from '../../ui/Icon';

const barButton = {
  background: '#241417',
  color: '#f3e9e4',
  border: 'none',
  borderRadius: 14,
  padding: 13,
  fontSize: 13.5,
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: FONT,
  boxShadow: '0 10px 30px rgba(0,0,0,.35)',
};

/**
 * Панель управления показом: вернуться к списку сценариев и сбросить
 * всё, что натыкали во время демонстрации.
 */
export function DemoBar() {
  const { route, back, showToast, go, closeSheet, closeModal } = useNav();
  const { resetDemoState } = useData();
  const { demo, demoScenario, backToScenarios } = useSession();

  if (!demo || !demoScenario) return null;

  const reset = () => {
    resetDemoState();
    go(null);
    closeSheet();
    closeModal();
    showToast('Демо-данные сброшены', { icon: 'check' });
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: 16,
        right: 16,
        // без таб-бара панель может опуститься ниже
        bottom: route ? bottom(24) : bottom(84),
        zIndex: 150,
        display: 'flex',
        gap: 8,
        animation: 'dktoast .3s ease',
      }}
    >
      <button
        onClick={() => {
          backToScenarios();
          back();
        }}
        style={{
          ...barButton,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <Icon name="chevL" size={17} color="#f3e9e4" />
        Сценарии демо
      </button>

      <button onClick={reset} style={{ ...barButton, padding: '13px 16px' }}>
        <Icon name="settings" size={17} color="#f3e9e4" />
      </button>
    </div>
  );
}
