import { useColors } from '../theme/ThemeContext';
import { FONT } from '../theme/palette';
import { TOP_PAD } from '../theme/safeArea';
import { Toast } from '../ui/Toast';

/**
 * Полноэкранная оболочка приложения.
 *
 * Рамки телефона и нарисованного статус-бара здесь намеренно нет: приложение
 * открывается на настоящем телефоне, где их рисует система. Верхние и нижние
 * отступы берутся из safe-area — см. theme/safeArea.js.
 */
export function AppShell({ children }) {
  const c = useColors();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: c.bg,
        fontFamily: FONT,
        color: c.text,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {children}
      <Toast />
    </div>
  );
}

/** Отступ сверху вместо нарисованного статус-бара. */
export function TopSpacer() {
  return <div style={{ height: TOP_PAD, flex: 'none' }} />;
}
