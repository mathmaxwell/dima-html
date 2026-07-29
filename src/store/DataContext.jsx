import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { useNav } from './NavContext';

const DataContext = createContext(null);

/** Начальная переписка с консьержем — сценарий «подготовить квартиру». */
const INITIAL_CHAT = [
  {
    who: 'me',
    text: 'Подготовьте квартиру к нашему приезду в воскресенье. Нужна уборка, продукты и температура 22 градуса.',
  },
  {
    who: 'concierge',
    text: 'Подготовлю. Уборка доступна в субботу с 15:00, продукты доставим утром в воскресенье. Климат включим за 4 часа до вашего приезда. Ориентировочная стоимость — 18 500 ₽.',
    quote: true,
  },
];

/** Шаги сценария «Я еду домой» — дом готовится к возвращению. */
export const COMING_STEPS = [
  { key: 'eta', icon: 'clock', title: 'Время прибытия', sub: '≈ 19:40 · 24 минуты в пути' },
  { key: 'valet', icon: 'valet', title: 'Valet уведомлён', sub: 'BMW iX подадут к подъезду А' },
  { key: 'clim', icon: 'thermo', title: 'Климат 22°', sub: 'Комфортная температура к приезду' },
  { key: 'light', icon: 'bulb', title: 'Сценарий мягкого света', sub: 'Гостиная и прихожая' },
  { key: 'curt', icon: 'curtain', title: 'Шторы откроются', sub: 'В гостиной к 19:35' },
  { key: 'lift', icon: 'key', title: 'Лифт по прибытии', sub: 'Вызов при въезде в паркинг' },
  { key: 'groc', icon: 'leaf', title: 'Продукты доставлены', sub: 'Заказ уже в холодильнике' },
  { key: 'conc', icon: 'chat', title: 'Консьерж предупреждён', sub: 'Екатерина на связи' },
];

/** Позиции плана «подготовить квартиру» и их стоимость. */
export const PREPARE_ITEMS = [
  { key: 'clean', icon: 'spark', title: 'Генеральная уборка', sub: 'Суббота, 15:00 · Мария', cost: 6500 },
  { key: 'groc', icon: 'leaf', title: 'Продукты к приезду', sub: 'Воскресенье, утро · по вашему списку', cost: 8200 },
  { key: 'flowers', icon: 'flower', title: 'Свежие цветы', sub: 'Пионы и эвкалипт · в гостиную', cost: 2400 },
  { key: 'clim', icon: 'thermo', title: 'Климат 22°', sub: 'Включим за 4 часа до приезда', cost: 0 },
  { key: 'linen', icon: 'box', title: 'Смена постельного белья', sub: 'Комплект резиденции', cost: 900 },
  { key: 'car', icon: 'valet', title: 'Подача автомобиля', sub: 'Воскресенье, 18:30 · подъезд А', cost: 500 },
];

/** Комнаты квартиры для цифрового двойника. Координаты — на холсте 290×312. */
export const ROOMS = {
  living: { name: 'Гостиная', temp: 23, x: 20, y: 20, w: 150, h: 120, icon: 'house' },
  kitchen: { name: 'Кухня', temp: 24, x: 172, y: 20, w: 98, h: 120, icon: 'leaf' },
  hall: { name: 'Прихожая', temp: 22, x: 20, y: 142, w: 80, h: 78, icon: 'key' },
  bath: { name: 'Ванная', temp: 25, x: 102, y: 142, w: 68, h: 78, leak: true, icon: 'drop' },
  bed: { name: 'Спальня', temp: 22, x: 172, y: 142, w: 98, h: 78, icon: 'moon' },
  kids: { name: 'Детская', temp: 23, x: 20, y: 222, w: 110, h: 70, icon: 'star' },
  study: { name: 'Кабинет', temp: 22, x: 132, y: 222, w: 138, h: 70, icon: 'doc' },
};
export const PLAN_SIZE = { width: 290, height: 312 };

/** Свет в комнате: явно заданное значение, иначе гостиная и детская горят. */
export const isLit = (lights, key) =>
  lights[key] !== undefined ? lights[key] : key === 'living' || key === 'kids';

/**
 * Данные приложения: всё, чем управляет житель. Разложены по смыслу —
 * двери, пропуска, люди, дом, консьерж, клуб, счета.
 */
export function DataProvider({ children }) {
  const { showToast, openModal } = useNav();

  // ---- двери ----
  const [doors, setDoors] = useState({}); // id → 'opening' | 'open'
  const doorTimers = useRef([]);

  const openDoor = useCallback(
    (id) => {
      setDoors((prev) => {
        if (prev[id]) return prev; // уже открывается или открыта
        return { ...prev, [id]: 'opening' };
      });
      doorTimers.current.push(
        setTimeout(() => {
          setDoors((prev) => ({ ...prev, [id]: 'open' }));
          showToast('Дверь открыта', { icon: 'check', tone: 'ok' });
          // через несколько секунд дверь снова «запирается»
          doorTimers.current.push(
            setTimeout(() => {
              setDoors((prev) => {
                const next = { ...prev };
                delete next[id];
                return next;
              });
            }, 4000)
          );
        }, 1100)
      );
    },
    [showToast]
  );

  // ---- пропуск для гостя ----
  const [pass, setPassState] = useState({
    type: 'guest',
    name: '',
    phone: '',
    date: '2 августа',
    withCar: false,
    carNumber: '',
    zones: ['Лобби', 'Лифт'],
  });
  const setPass = useCallback((patch) => setPassState((p) => ({ ...p, ...patch })), []);
  const togglePassZone = useCallback(
    (zone) =>
      setPassState((p) => ({
        ...p,
        zones: p.zones.includes(zone) ? p.zones.filter((z) => z !== zone) : [...p.zones, zone],
      })),
    []
  );

  // ---- люди с доступом ----
  const [people, setPeople] = useState({
    spouse: true,
    child: true,
    nanny: true,
    driver: true,
    maid: false,
  });
  const togglePerson = useCallback(
    (key, name) => {
      setPeople((prev) => {
        const wasOn = prev[key];
        showToast((wasOn ? 'Доступ выключен: ' : 'Доступ включён: ') + name, {
          icon: wasOn ? 'lock' : 'check',
          tone: wasOn ? 'err' : 'ok',
        });
        return { ...prev, [key]: !wasOn };
      });
    },
    [showToast]
  );

  // ---- умный дом ----
  const [home, setHomeState] = useState({
    climateTarget: 22,
    climateMode: 'Авто',
    boost: false,
    scene: 'Дома',
    lights: { living: true, bed: false, kids: true, kitchen: false },
    curtains: 40,
    charging: true,
    consumePeriod: 'Неделя',
    away: false,
    awayFrom: '4 августа',
    awayTo: '18 августа',
    awayOptions: { awayWater: true, awaySim: true },
  });
  const setHome = useCallback((patch) => setHomeState((h) => ({ ...h, ...patch })), []);
  const toggleLight = useCallback(
    (key, fallback = false) =>
      setHomeState((h) => ({
        ...h,
        lights: { ...h.lights, [key]: !(h.lights[key] !== undefined ? h.lights[key] : fallback) },
      })),
    []
  );

  // ---- счета ----
  const [bill, setBillState] = useState({ paid: false, autopay: false });
  const toggleAutopay = useCallback(() => setBillState((b) => ({ ...b, autopay: !b.autopay })), []);
  const payTimer = useRef(null);

  /** Оплата счёта: крутилка, затем экран успеха. */
  const payBill = useCallback(() => {
    openModal({ key: 'paying' });
    clearTimeout(payTimer.current);
    payTimer.current = setTimeout(() => {
      setBillState((b) => ({ ...b, paid: true }));
      openModal({
        key: 'success',
        title: 'Оплачено',
        text: '18 540 ₽ · чек отправлен на почту',
        okLabel: 'Скачать чек',
        note: 'Следующий платёж — 10 сентября',
        onOk: () => showToast('Чек сохранён', { icon: 'check', tone: 'ok' }),
      });
    }, 1600);
  }, [openModal, showToast]);

  // ---- консьерж ----
  const [chat, setChat] = useState(INITIAL_CHAT);
  const [chatConfirmed, setChatConfirmed] = useState(false);
  const chatScrollRef = useRef(null);

  const scrollChatDown = useCallback(() => {
    requestAnimationFrame(() => {
      if (chatScrollRef.current) chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    });
  }, []);

  const sendChatMessage = useCallback(
    (text) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setChat((prev) => [...prev, { who: 'me', text: trimmed }]);
      scrollChatDown();
      setTimeout(() => {
        setChat((prev) => [
          ...prev,
          {
            who: 'concierge',
            text: 'Приняла, Анна. Уточню детали и вернусь с подтверждением в течение пары минут.',
          },
        ]);
        scrollChatDown();
      }, 900);
    },
    [scrollChatDown]
  );

  const confirmChatQuote = useCallback(() => {
    setChat((prev) => [
      ...prev.map((m) => (m.quote ? { ...m, quote: false, confirmed: true } : m)),
      {
        who: 'concierge',
        text: 'Готово! Уборка — в субботу 15:00, продукты — воскресенье утром, климат включим за 4 часа. Всё под контролем.',
      },
    ]);
    setChatConfirmed(true);
    showToast('Заказ подтверждён · 18 500 ₽', { icon: 'check', tone: 'ok' });
    scrollChatDown();
  }, [showToast, scrollChatDown]);

  // ---- заявки и услуги ----
  const [services, setServicesState] = useState({
    cleanType: 'Генеральная',
    techCategory: 'Электрика',
    techDescription: '',
    techPhoto: false,
    techUrgency: 'Обычная',
    techAllowEntry: false,
    orderNote: '',
  });
  const setServices = useCallback((patch) => setServicesState((s) => ({ ...s, ...patch })), []);

  // ---- сценарий «подготовить квартиру» ----
  const [prepare, setPrepareState] = useState({ disabled: {}, done: false });
  const togglePrepareItem = useCallback(
    (key) =>
      setPrepareState((p) => ({ ...p, disabled: { ...p.disabled, [key]: !p.disabled[key] } })),
    []
  );
  const confirmPrepare = useCallback(() => {
    setPrepareState((p) => ({ ...p, done: true }));
    showToast('План принят в работу', { icon: 'check', tone: 'ok' });
  }, [showToast]);

  // ---- сценарий «я еду домой» ----
  const [coming, setComingState] = useState({
    disabled: {},
    running: false,
    done: false,
    activeIndex: null,
  });
  const comingTimer = useRef(null);

  const toggleComingStep = useCallback(
    (key) => setComingState((c) => ({ ...c, disabled: { ...c.disabled, [key]: !c.disabled[key] } })),
    []
  );

  /** Проигрывает шаги подготовки один за другим. */
  const runComing = useCallback(() => {
    setComingState((prev) => {
      const steps = COMING_STEPS.filter((s) => !prev.disabled[s.key]);
      clearInterval(comingTimer.current);
      let i = 0;
      comingTimer.current = setInterval(() => {
        i += 1;
        if (i >= steps.length) {
          clearInterval(comingTimer.current);
          setComingState((c) => ({ ...c, running: false, done: true, activeIndex: null }));
          showToast('Дом готов к приезду в 19:40', { icon: 'check', tone: 'ok' });
        } else {
          setComingState((c) => ({ ...c, activeIndex: i }));
        }
      }, 700);
      return { ...prev, running: true, done: false, activeIndex: 0 };
    });
  }, [showToast]);

  // ---- клуб ----
  const [event, setEventState] = useState({ going: false, guest: false, inCalendar: false });
  const setEvent = useCallback((patch) => setEventState((e) => ({ ...e, ...patch })), []);

  const [booking, setBookingState] = useState({ slot: null, guests: 2, extras: {}, tab: 'Предстоящие' });
  const setBooking = useCallback((patch) => setBookingState((b) => ({ ...b, ...patch })), []);
  const toggleBookingExtra = useCallback(
    (key) => setBookingState((b) => ({ ...b, extras: { ...b.extras, [key]: !b.extras[key] } })),
    []
  );

  // ---- прочее ----
  const [historyFilter, setHistoryFilter] = useState('all');
  const [intercom, setIntercomState] = useState({ opened: false, muted: true });
  const setIntercom = useCallback((patch) => setIntercomState((i) => ({ ...i, ...patch })), []);
  const [preferences, setPreferences] = useState({ m1: true, m2: true, m3: false, m4: true });
  const togglePreference = useCallback(
    (key) => setPreferences((p) => ({ ...p, [key]: !p[key] })),
    []
  );

  /** Сбросить всё, что успел натыкать демонстратор. */
  const resetDemoState = useCallback(() => {
    setBillState((b) => ({ ...b, paid: false }));
    setEventState({ going: false, guest: false, inCalendar: false });
    setComingState({ disabled: {}, running: false, done: false, activeIndex: null });
    setPrepareState({ disabled: {}, done: false });
    setBookingState({ slot: null, guests: 2, extras: {}, tab: 'Предстоящие' });
    setIntercomState({ opened: false, muted: true });
  }, []);

  const value = useMemo(
    () => ({
      doors,
      openDoor,

      pass,
      setPass,
      togglePassZone,

      people,
      togglePerson,

      home,
      setHome,
      toggleLight,

      bill,
      payBill,
      toggleAutopay,

      chat,
      chatConfirmed,
      chatScrollRef,
      sendChatMessage,
      confirmChatQuote,

      services,
      setServices,

      prepare,
      togglePrepareItem,
      confirmPrepare,

      coming,
      toggleComingStep,
      runComing,

      event,
      setEvent,

      booking,
      setBooking,
      toggleBookingExtra,

      historyFilter,
      setHistoryFilter,

      intercom,
      setIntercom,

      preferences,
      togglePreference,

      resetDemoState,
    }),
    [
      doors, openDoor, pass, setPass, togglePassZone, people, togglePerson,
      home, setHome, toggleLight, bill, payBill, toggleAutopay,
      chat, chatConfirmed, sendChatMessage, confirmChatQuote,
      services, setServices, prepare, togglePrepareItem, confirmPrepare,
      coming, toggleComingStep, runComing, event, setEvent,
      booking, setBooking, toggleBookingExtra, historyFilter, intercom, setIntercom,
      preferences, togglePreference, resetDemoState,
    ]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData вызван вне DataProvider');
  return ctx;
}
