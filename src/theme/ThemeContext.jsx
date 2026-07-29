import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { buildPalette } from './palette';

const ThemeContext = createContext(null);

/**
 * Тема приложения. Отдаёт готовую палитру и переключатель светлая/тёмная.
 * Заодно красит системную строку браузера, чтобы при «оттягивании» экрана
 * не проглядывал чужой цвет.
 */
export function ThemeProvider({ children, initialDark = false, accent }) {
  const [dark, setDark] = useState(initialDark);
  const colors = useMemo(() => buildPalette(dark, accent), [dark, accent]);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = colors.bg;
    document.documentElement.style.backgroundColor = colors.bg;
    document.body.style.backgroundColor = colors.bg;
  }, [colors.bg]);

  const value = useMemo(
    () => ({ colors, dark, setDark, toggleTheme: () => setDark((d) => !d) }),
    [colors, dark]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Полный контекст темы: палитра + переключение. */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme вызван вне ThemeProvider');
  return ctx;
}

/** Короткий доступ только к палитре — самый частый случай. */
export function useColors() {
  return useTheme().colors;
}
