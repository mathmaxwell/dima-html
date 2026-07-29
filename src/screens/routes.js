import { TodayTab } from './today/TodayTab';
import { AccessTab } from './access/AccessTab';
import { ConciergeTab } from './concierge/ConciergeTab';
import { HomeTab } from './home/HomeTab';
import { ClubTab } from './club/ClubTab';

import { Coming } from './today/Coming';
import { CarDetail, GuestDetail, ParcelDetail, CleanDetail, Timeline } from './today/details';
import { Bill } from './today/Bill';

import { CreatePass } from './access/CreatePass';
import { People, Cars, Deliveries, AccessHistory } from './access/lists';
import { Intercom } from './access/Intercom';

import { Chat } from './concierge/Chat';
import { Prepare } from './concierge/Prepare';
import { Cleaning, TechHelp, OrderTemplate, Requests, Regular } from './concierge/orders';

import { Twin } from './home/Twin';
import { Smart, Climate, Cameras } from './home/controls';
import { Payments, Passport, Away, Consumption } from './home/services';

import { Event } from './club/Event';
import { Space } from './club/Space';
import { Cinema, Spaces, Privileges, Bookings } from './club/lists';

import { Profile, Notifications } from './profile';

/** Вкладка → компонент. Ключи совпадают с TABS в layout/TabBar. */
export const TAB_SCREENS = {
  today: TodayTab,
  access: AccessTab,
  concierge: ConciergeTab,
  home: HomeTab,
  club: ClubTab,
};

/**
 * Внутренние экраны: ключ из go({ key }) → компонент.
 * Компонент получает свойство `data` — то, что передали в go({ key, data }).
 */
export const ROUTE_SCREENS = {
  // сегодня
  coming: Coming,
  carDetail: CarDetail,
  guestDetail: GuestDetail,
  parcelDetail: ParcelDetail,
  cleanDetail: CleanDetail,
  timeline: Timeline,
  bill: Bill,

  // доступ
  createPass: CreatePass,
  people: People,
  cars: Cars,
  deliveries: Deliveries,
  accessHistory: AccessHistory,
  intercom: Intercom,

  // консьерж
  chat: Chat,
  prepare: Prepare,
  cleaning: Cleaning,
  techhelp: TechHelp,
  orderTemplate: OrderTemplate,
  requests: Requests,
  regular: Regular,

  // дом
  twin: Twin,
  smart: Smart,
  climate: Climate,
  cameras: Cameras,
  payments: Payments,
  passport: Passport,
  away: Away,
  consume: Consumption,

  // клуб
  event: Event,
  space: Space,
  cinema: Cinema,
  spaces: Spaces,
  privileges: Privileges,
  bookings: Bookings,

  // профиль
  profile: Profile,
  notifications: Notifications,
};

/** Экраны, которые рисуют себя во весь экран и сами обходят чёлку. */
export const FULLSCREEN_ROUTES = new Set(['intercom']);

/** Вкладки с фотографией во всю ширину — им не нужен отступ сверху. */
export const BLEED_TABS = new Set(['today', 'club']);
