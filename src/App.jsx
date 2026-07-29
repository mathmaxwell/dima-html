import { useEffect, useRef } from 'react';
import { ThemeProvider } from './theme/ThemeContext';
import { NavProvider, useNav } from './store/NavContext';
import { DataProvider, useData } from './store/DataContext';
import { SessionProvider, useSession } from './store/SessionContext';
import { AppShell } from './layout/AppShell';
import { Onboarding } from './screens/onboarding';
import { DemoLauncher } from './screens/demo/DemoLauncher';
import { MainApp } from './screens/MainApp';
import { START_SCREENS } from './screens/demo/scenarios';

/**
 * Выбирает, что показать: список демо-сценариев, вход или само приложение.
 * Заодно отрабатывает startScreen — точку входа для показа концепции.
 */
function Root({ startScreen }) {
  const { signedIn, demo, demoScenario } = useSession();
  const nav = useNav();
  const data = useData();
  const applied = useRef(false);

  useEffect(() => {
    if (applied.current || !startScreen) return;
    applied.current = true;
    START_SCREENS[startScreen]?.(nav, data);
  }, [startScreen, nav, data]);

  if (demo && !demoScenario) return <DemoLauncher />;
  if (!signedIn) return <Onboarding />;
  return <MainApp />;
}

/**
 * Корень приложения «Дом Кино».
 *
 * @param {'Светлая'|'Тёмная'} theme
 * @param {string} accentColor — фирменный цвет можно переопределить
 * @param {string} startScreen — открыть сразу нужный экран, см. START_SCREENS
 */
export function App({ theme = 'Светлая', accentColor, startScreen }) {
  // «Заставка» и «Демо-режим» — не экраны, а состояния входа
  const isScenario = startScreen && startScreen !== 'Заставка' && startScreen !== 'Демо-режим';

  return (
    <ThemeProvider initialDark={theme === 'Тёмная'} accent={accentColor}>
      <SessionProvider
        initialStep={isScenario ? 'done' : 'splash'}
        initialDemo={startScreen === 'Демо-режим'}
      >
        <NavProvider>
          <DataProvider>
            <AppShell>
              <Root startScreen={isScenario ? startScreen : null} />
            </AppShell>
          </DataProvider>
        </NavProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
