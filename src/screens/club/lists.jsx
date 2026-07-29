import { useColors } from '../../theme/ThemeContext';
import { SERIF } from '../../theme/palette';
import { RouteScreen } from '../../layout/RouteScreen';
import { useNav } from '../../store/NavContext';
import { useData } from '../../store/DataContext';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { FilterPills } from '../../ui/Chips';
import { Icon } from '../../ui/Icon';
import { StatusTag } from '../../ui/MenuRow';
import { Photo } from '../../ui/Photo';
import { Scene } from '../../ui/Scene';

const FILMS = [
  { title: '«Расёмон»', sub: 'Куросава · закрытый показ', when: '2 авг, 20:00', seats: '4 места', image: 'lounge', route: 'event' },
  { title: '«Восхождение»', sub: 'Премьера с обсуждением', when: '5 авг, 19:00', seats: 'мест нет', image: 'lounge2' },
  { title: 'Встреча с режиссёром', sub: 'А. Звягинцев', when: '9 авг, 18:30', seats: '8 мест', image: 'context' },
  { title: 'Детский показ', sub: '«Тайна Коко»', when: '10 авг, 12:00', seats: '12 мест', image: 'garden' },
  { title: 'Лекция о нуаре', sub: 'Кинокритик М. Трофименков', when: '12 авг, 19:00', seats: '20 мест', image: 'wellness' },
  { title: 'Ретроспектива Феллини', sub: '«8½»', when: '15 авг, 20:00', seats: '6 мест', image: 'facadeT' },
];

/** Афиша кинозала и культурных событий. */
export function Cinema() {
  const c = useColors();
  const { go, showToast } = useNav();

  return (
    <RouteScreen title="Кино и культура">
      {FILMS.map((film) => {
        const soldOut = film.seats === 'мест нет';
        return (
          <Card
            key={film.title}
            style={{ marginBottom: 12 }}
            onClick={() =>
              film.route
                ? go({ key: film.route })
                : showToast(soldOut ? 'Добавим в лист ожидания' : 'Открываем событие…', {
                    icon: soldOut ? 'clock' : 'ticket',
                  })
            }
          >
            <Scene
              image={film.image}
              gradient={false}
              style={{ height: 130, borderRadius: 14, marginBottom: 12 }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16.5, fontWeight: 700 }}>{film.title}</div>
                <div style={{ fontSize: 13, color: c.sec, marginTop: 2 }}>{film.sub}</div>
                <div style={{ fontSize: 12.5, color: c.accent, fontWeight: 600, marginTop: 6 }}>
                  {film.when}
                </div>
              </div>
              <StatusTag color={soldOut ? c.err : c.ok} style={{ padding: '5px 10px', borderRadius: 9 }}>
                {film.seats}
              </StatusTag>
            </div>
          </Card>
        );
      })}
    </RouteScreen>
  );
}

const SPACES = [
  { name: 'Приватный сад', image: 'garden', capacity: 'до 20 гостей', price: 'бесплатно' },
  { name: 'Wellness & Spa', image: 'wellness', capacity: '1–8 гостей', price: 'от 3 500 ₽' },
  { name: 'Lounge', image: 'lounge', capacity: 'до 12 гостей', price: 'от 4 000 ₽' },
  { name: 'Частный кинозал', image: 'lounge2', capacity: 'до 24 гостей', price: 'от 8 000 ₽' },
  { name: 'Фитнес-зал', image: 'wellness', capacity: '1–6 гостей', price: 'бесплатно' },
  { name: 'Гостевая комната', image: 'context', capacity: '1 ночь', price: 'от 6 000 ₽' },
];

/** Все пространства резиденции. */
export function Spaces() {
  const c = useColors();
  const { go } = useNav();

  return (
    <RouteScreen title="Пространства">
      {SPACES.map((space) => (
        <div
          key={space.name}
          onClick={() => go({ key: 'space', data: space })}
          style={{
            borderRadius: 18,
            overflow: 'hidden',
            marginBottom: 12,
            border: `1px solid ${c.line}`,
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <Scene
            image={space.image}
            gradient="linear-gradient(0deg, rgba(15,9,11,.75), rgba(15,9,11,.05) 60%)"
            style={{ height: 130 }}
          />
          <div
            style={{
              position: 'absolute',
              left: 15,
              right: 15,
              bottom: 12,
              color: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <div>
              <div style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 600 }}>{space.name}</div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>{space.capacity}</div>
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                background: 'rgba(255,255,255,.18)',
                backdropFilter: 'blur(8px)',
                padding: '5px 11px',
                borderRadius: 9,
              }}
            >
              {space.price}
            </div>
          </div>
        </div>
      ))}
    </RouteScreen>
  );
}

const PRIVILEGES = [
  { title: 'Ресторан «Sartoria»', sub: 'Приоритетная бронь и закрытое меню', seed: 3 },
  { title: 'Большой театр', sub: 'Ранний доступ к билетам', seed: 6 },
  { title: 'Four Seasons', sub: 'Специальный тариф для резидентов', seed: 1 },
  { title: 'SPA «Aurelia»', sub: 'Комплимент от партнёра', seed: 4 },
  { title: 'Персональный менеджер', sub: 'Путешествия под ключ', seed: 7 },
  { title: 'Cartier', sub: 'Закрытый предпоказ коллекции', seed: 2 },
];

/** Привилегии партнёров клуба. */
export function Privileges() {
  const c = useColors();
  const { openSheet } = useNav();

  return (
    <RouteScreen title="Привилегии">
      <FilterPills
        options={['Все', 'Рестораны', 'Театры', 'Отели', 'Путешествия', 'Wellness']}
        value="Все"
        style={{ marginBottom: 16 }}
      />

      {PRIVILEGES.map((item) => (
        <Card
          key={item.title}
          onClick={() => openSheet({ key: 'privilege', data: item })}
          style={{ marginBottom: 10 }}
        >
          <div style={{ display: 'flex', gap: 13, alignItems: 'center' }}>
            <Photo seed={item.seed} style={{ width: 56, height: 56, borderRadius: 14, flex: 'none' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{item.title}</div>
              <div style={{ fontSize: 12.5, color: c.sec, marginTop: 2 }}>{item.sub}</div>
            </div>
            <Icon name="chevR" size={17} color={c.faint} />
          </div>
        </Card>
      ))}
    </RouteScreen>
  );
}

const BOOKINGS = {
  Предстоящие: [
    { icon: 'film', title: '«Расёмон» · показ', when: '2 авг, 20:00', seed: 3 },
    { icon: 'home', title: 'Lounge', when: '5 авг, 18:00', seed: 1 },
  ],
  Завершённые: [{ icon: 'dumbbell', title: 'Массаж', when: '20 июля', seed: 6 }],
  Ожидание: [{ icon: 'ticket', title: 'Ресторан «Sartoria»', when: 'лист ожидания', seed: 4 }],
  Отменённые: [{ icon: 'home', title: 'Кинозал', when: 'отменено', seed: 7 }],
};

/** Мои бронирования по статусам. */
export function Bookings() {
  const c = useColors();
  const { openSheet, confirm, showToast } = useNav();
  const { booking, setBooking } = useData();

  const tab = booking.tab;
  const items = BOOKINGS[tab] || [];
  const upcoming = tab === 'Предстоящие';

  return (
    <RouteScreen title="Мои бронирования">
      <FilterPills
        options={Object.keys(BOOKINGS)}
        value={tab}
        onChange={(next) => setBooking({ tab: next })}
        style={{ marginBottom: 16 }}
      />

      {items.map((item) => (
        <Card key={item.title} style={{ marginBottom: 10 }}>
          <div
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              marginBottom: upcoming ? 12 : 0,
            }}
          >
            <Photo seed={item.seed} style={{ width: 48, height: 48, borderRadius: 12, flex: 'none' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{item.title}</div>
              <div style={{ fontSize: 12.5, color: c.sec }}>{item.when}</div>
            </div>
          </div>

          {upcoming && (
            <div style={{ display: 'flex', gap: 8 }}>
              <Button
                sm
                variant="soft"
                icon="qr"
                style={{ flex: 1 }}
                onClick={() => openSheet({ key: 'qr', data: { name: item.title } })}
              >
                QR
              </Button>
              <Button
                sm
                variant="ghost"
                style={{ flex: 1 }}
                onClick={() => openSheet({ key: 'pickTime' })}
              >
                Перенести
              </Button>
              <Button
                sm
                variant="ghost"
                style={{ flex: 1 }}
                onClick={() =>
                  confirm({
                    title: 'Отменить бронь?',
                    okLabel: 'Отменить',
                    danger: true,
                    onOk: () => showToast('Бронь отменена', { icon: 'x', tone: 'err' }),
                  })
                }
              >
                Отмена
              </Button>
            </div>
          )}
        </Card>
      ))}
    </RouteScreen>
  );
}
