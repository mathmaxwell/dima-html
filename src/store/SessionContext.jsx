import { createContext, useContext, useMemo, useState } from 'react';

const SessionContext = createContext(null);

/** Шаги входа в приложение по порядку. */
export const AUTH_STEPS = ['splash', 'phone', 'code', 'apartment', 'biometry', 'permissions', 'done'];

/**
 * Сессия: пройден ли вход и включён ли демонстрационный режим.
 * Данные самого онбординга (номер, код) живут внутри его экранов —
 * после входа они не нужны.
 */
export function SessionProvider({ children, initialStep = 'splash', initialDemo = false }) {
  const [step, setStep] = useState(initialStep);
  const [demo, setDemo] = useState(initialDemo);
  const [demoScenario, setDemoScenario] = useState(null);

  const value = useMemo(
    () => ({
      step,
      setStep,
      signedIn: step === 'done',

      demo,
      demoScenario,
      /** Войти в демо-режим — показывается список сценариев. */
      startDemo: () => {
        setDemo(true);
        setDemoScenario(null);
        setStep('done');
      },
      /** Выбрать сценарий: список прячется, показывается сам экран. */
      pickScenario: setDemoScenario,
      /** Вернуться к списку сценариев. */
      backToScenarios: () => setDemoScenario(null),
      exitDemo: () => {
        setDemo(false);
        setDemoScenario(null);
        setStep('splash');
      },
      signOut: () => {
        setDemo(false);
        setDemoScenario(null);
        setStep('splash');
      },
    }),
    [step, demo, demoScenario]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession вызван вне SessionProvider');
  return ctx;
}
