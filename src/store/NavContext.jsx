import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

const NavContext = createContext(null);

/**
 * Навигация приложения. Три независимых слоя поверх вкладки:
 *
 *   tab    — какая из пяти вкладок открыта
 *   route  — внутренний экран поверх вкладки ({ key, title, data })
 *   sheet  — шторка снизу ({ key, data })
 *   modal  — модальное окно по центру ({ key, ... })
 *
 * Плюс всплывающая подсказка (toast), которая живёт поверх всего.
 */
export function NavProvider({ children, initialTab = 'today', initialRoute = null }) {
  const [tab, setTab] = useState(initialTab);
  const [route, setRoute] = useState(initialRoute);
  const [sheet, setSheet] = useState(null);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  // ссылка на прокручиваемую область экрана — чтобы перематывать её наверх
  const scrollRef = useRef(null);
  const toastTimer = useRef(null);

  const scrollTop = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    });
  }, []);

  const value = useMemo(() => {
    const closeSheet = () => setSheet(null);
    const closeModal = () => setModal(null);

    return {
      tab,
      route,
      sheet,
      modal,
      toast,
      scrollRef,

      /** Открыть внутренний экран. Шторки и модалки при этом закрываются. */
      go: (next) => {
        setRoute(next);
        setSheet(null);
        setModal(null);
        scrollTop();
      },
      /** Вернуться из внутреннего экрана на вкладку. */
      back: () => {
        setRoute(null);
        setSheet(null);
      },
      /** Переключить вкладку — сбрасывает всё, что открыто поверх. */
      switchTab: (next) => {
        setTab(next);
        setRoute(null);
        setSheet(null);
        setModal(null);
        scrollTop();
      },

      openSheet: setSheet,
      closeSheet,
      openModal: setModal,
      closeModal,

      /** Диалог «да/нет». danger красит действие в цвет опасности. */
      confirm: ({ title, text, onOk, okLabel, danger }) =>
        setModal({ key: 'confirm', title, text, onOk, okLabel, danger }),

      /**
       * Всплывающая подсказка.
       * @param {string} text
       * @param {{icon?: string, tone?: 'ok'|'err'|'warn'|'accent', duration?: number}} opts
       */
      showToast: (text, opts = {}) => {
        clearTimeout(toastTimer.current);
        setToast({ text, ...opts });
        toastTimer.current = setTimeout(() => setToast(null), opts.duration || 2600);
      },

      scrollTop,
    };
  }, [tab, route, sheet, modal, toast, scrollTop]);

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error('useNav вызван вне NavProvider');
  return ctx;
}
