import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './theme/global.css';

/**
 * Настройки можно передать в адресной строке — удобно показывать конкретный
 * сценарий, не пересобирая приложение:
 *
 *   ?screen=Сегодня
 *   ?screen=Звонок домофона&theme=Тёмная
 *   ?accent=%23c0763a
 *
 * Список значений screen — в screens/demo/scenarios.js.
 */
const params = new URLSearchParams(window.location.search);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App
      theme={params.get('theme') || 'Светлая'}
      accentColor={params.get('accent') || '#a2373d'}
      startScreen={params.get('screen') || 'Заставка'}
    />
  </StrictMode>
);
