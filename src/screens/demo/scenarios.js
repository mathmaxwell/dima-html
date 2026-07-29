/**
 * Демонстрационные сценарии. Каждый открывает нужную вкладку и экран
 * с уже подготовленными данными — чтобы показывать концепцию без кликов.
 *
 * `open` получает навигацию и данные и приводит приложение в нужное состояние.
 */
export const DEMO_SCENARIOS = [
  {
    name: 'Возвращение домой',
    description: 'Оркестрация авто, климата, света и лифта',
    image: 'tower',
    open: ({ switchTab, go }) => {
      switchTab('today');
      go({ key: 'coming' });
    },
  },
  {
    name: 'Приглашение гостя',
    description: 'Пропуск и брендированная карточка гостя',
    image: 'context',
    open: ({ switchTab, go }, { setPass }) => {
      setPass({ name: 'Алексей Орлов', phone: '' });
      switchTab('access');
      go({ key: 'createPass' });
    },
  },
  {
    name: 'Подготовка квартиры',
    description: 'Комплексный запрос консьержу одним планом',
    image: 'lounge',
    open: ({ switchTab, go }) => {
      switchTab('concierge');
      go({ key: 'prepare' });
    },
  },
  {
    name: 'Цифровой двойник',
    description: 'Живой план квартиры и управление комнатами',
    image: 'facadeT',
    open: ({ switchTab, go }) => {
      switchTab('home');
      go({ key: 'twin' });
    },
  },
  {
    name: 'Бронирование сада',
    description: 'Приватный сад с гостями и услугами',
    image: 'garden',
    open: ({ switchTab, go }) => {
      switchTab('club');
      go({
        key: 'space',
        data: { name: 'Приватный сад', image: 'garden', capacity: 'до 20 гостей', price: 'бесплатно' },
      });
    },
  },
  {
    name: 'Аварийный сценарий',
    description: 'Протечка: авто-реакция дома и вызов инженера',
    image: 'wellness',
    open: ({ switchTab, go, openSheet }) => {
      switchTab('home');
      go({ key: 'twin' });
      openSheet({ key: 'leak' });
    },
  },
];

/** Сценарии, доступные как значение свойства startScreen. */
export const START_SCREENS = {
  'Сегодня': ({ switchTab }) => switchTab('today'),
  'Я еду домой': ({ switchTab, go }) => {
    switchTab('today');
    go({ key: 'coming' });
  },
  'Цифровой двойник': ({ switchTab, go }) => {
    switchTab('home');
    go({ key: 'twin' });
  },
  'Приватный сад': ({ switchTab, go }) => {
    switchTab('club');
    go({
      key: 'space',
      data: { name: 'Приватный сад', image: 'garden', capacity: 'до 20 гостей', price: 'бесплатно' },
    });
  },
  'Подготовить квартиру': ({ switchTab, go }) => {
    switchTab('concierge');
    go({ key: 'prepare' });
  },
  'Пригласить гостя': ({ switchTab, go }) => {
    switchTab('access');
    go({ key: 'createPass' });
  },
  'Звонок домофона': ({ switchTab, go }) => {
    switchTab('access');
    go({ key: 'intercom' });
  },
  'Закрытый показ': ({ switchTab, go }) => {
    switchTab('club');
    go({ key: 'event' });
  },
};
