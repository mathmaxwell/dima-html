import { useColors } from '../../theme/ThemeContext';
import { RouteScreen } from '../../layout/RouteScreen';
import { useNav } from '../../store/NavContext';
import { useData } from '../../store/DataContext';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { FilterPills } from '../../ui/Chips';
import { Icon } from '../../ui/Icon';
import { MenuGroup, MenuRow, StatusTag } from '../../ui/MenuRow';
import { Photo } from '../../ui/Photo';
import { SectionTitle } from '../../ui/SectionTitle';
import { Switch } from '../../ui/Switch';

/** Постоянные обладатели доступа: семья и персонал. */
const PEOPLE = [
  { key: 'spouse', name: 'Игорь Волков', role: 'Супруг', schedule: 'Постоянный · сейчас дома', seed: 7 },
  { key: 'child', name: 'София Волкова', role: 'Дочь, 14 лет', schedule: 'Постоянный · в школе', seed: 2 },
  { key: 'nanny', name: 'Ольга', role: 'Няня', schedule: 'Пн–Пт 08:00–19:00', seed: 9 },
  { key: 'driver', name: 'Дмитрий', role: 'Водитель', schedule: 'По вызову', seed: 1 },
  { key: 'maid', name: 'Мария', role: 'Домработница', schedule: 'Вт, Чт', seed: 4 },
];

export function People() {
  const c = useColors();
  const { go, openSheet } = useNav();
  const { people, togglePerson } = useData();

  return (
    <RouteScreen title="Люди с доступом">
      {PEOPLE.map((person) => (
        <Card
          key={person.key}
          onClick={() => openSheet({ key: 'personDetail', data: person })}
          style={{ marginBottom: 10 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <Photo
              seed={person.seed}
              style={{ width: 50, height: 50, borderRadius: '50%', flex: 'none' }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15.5, fontWeight: 700 }}>{person.name}</div>
              <div style={{ fontSize: 12.5, color: c.sec }}>
                {person.role} · {person.schedule}
              </div>
            </div>
            <Switch
              on={people[person.key]}
              onToggle={() => togglePerson(person.key, person.name)}
            />
          </div>
        </Card>
      ))}

      <Button full variant="soft" icon="plus" onClick={() => go({ key: 'createPass' })}>
        Добавить человека
      </Button>
    </RouteScreen>
  );
}

/** Автомобили семьи и въезд в паркинг. */
export function Cars() {
  const c = useColors();
  const { go, openSheet, showToast } = useNav();
  const { home, setHome } = useData();

  return (
    <RouteScreen title="Автомобили">
      <Card style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 13, marginBottom: 14 }}>
          <Photo seed={1} style={{ width: 60, height: 60, borderRadius: 14, flex: 'none' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16.5, fontWeight: 700 }}>BMW iX</div>
            <div style={{ fontSize: 13, color: c.sec }}>Электро · паркинг −2, место 14</div>
          </div>
          <StatusTag color={c.ok} style={{ padding: '5px 10px', borderRadius: 9, height: 'fit-content' }}>
            на месте
          </StatusTag>
        </div>

        <div style={{ background: c.chip, borderRadius: 14, padding: '12px 14px', marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 7 }}>
            <span style={{ color: c.sec }}>Заряд аккумулятора</span>
            <span style={{ fontWeight: 700, color: home.charging ? c.ok : c.text }}>
              82% {home.charging ? '· заряжается' : ''}
            </span>
          </div>
          <div style={{ height: 8, borderRadius: 5, background: c.line, overflow: 'hidden' }}>
            <div style={{ width: '82%', height: '100%', background: c.ok, borderRadius: 5 }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <Button sm icon="valet" style={{ flex: 1 }} onClick={() => openSheet({ key: 'callcar' })}>
            Вызвать
          </Button>
          <Button
            sm
            variant="soft"
            icon="bolt"
            style={{ flex: 1 }}
            onClick={() => {
              setHome({ charging: !home.charging });
              showToast(home.charging ? 'Зарядка остановлена' : 'Зарядка запущена', {
                icon: 'bolt',
                tone: 'ok',
              });
            }}
          >
            {home.charging ? 'Стоп зарядка' : 'Зарядить'}
          </Button>
        </div>
      </Card>

      <Card style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 13, alignItems: 'center' }}>
          <Photo seed={7} style={{ width: 52, height: 52, borderRadius: 12, flex: 'none' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15.5, fontWeight: 700 }}>Range Rover</div>
            <div style={{ fontSize: 12.5, color: c.sec }}>Паркинг −2, место 15 · полный бак</div>
          </div>
          <StatusTag color={c.ok} style={{ padding: '5px 10px', borderRadius: 9 }}>
            на месте
          </StatusTag>
        </div>
      </Card>

      <MenuGroup>
        <MenuRow
          icon="car"
          title="Гостевое парковочное место"
          sub="Свободно"
          onClick={() => showToast('Гостевое место забронировано', { icon: 'check', tone: 'ok' })}
        />
        <MenuRow
          icon="key"
          title="Открыть шлагбаум"
          sub="Въезд в паркинг"
          onClick={() => showToast('Шлагбаум открыт', { icon: 'check', tone: 'ok' })}
        />
        <MenuRow
          icon="plus"
          title="Добавить гостевой номер"
          sub="Для въезда гостя"
          onClick={() => go({ key: 'createPass' })}
          last
        />
      </MenuGroup>
    </RouteScreen>
  );
}

/** Ожидаемый курьер и история доставок. */
export function Deliveries() {
  const c = useColors();
  const { go, openModal, showToast } = useNav();

  return (
    <RouteScreen title="Доставки и курьеры">
      <Card style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 12 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: c.warn,
              boxShadow: `0 0 0 4px ${c.warn}33`,
            }}
          />
          <div style={{ fontSize: 15, fontWeight: 700 }}>Курьер ожидается</div>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: c.sec }}>Яндекс Еда · ~10 мин</span>
        </div>

        <div style={{ fontSize: 13.5, color: c.sec, marginBottom: 14, lineHeight: 1.4 }}>
          Разовый доступ в лобби на ближайшие 30 минут
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button
            sm
            onClick={() => showToast('Курьеру открыт доступ в лобби', { icon: 'check', tone: 'ok' })}
          >
            Разрешить вход
          </Button>
          <Button
            sm
            variant="soft"
            onClick={() => showToast('Отметили: оставить в лобби', { icon: 'box' })}
          >
            Оставить в лобби
          </Button>
          <Button
            sm
            variant="soft"
            onClick={() =>
              openModal({
                key: 'success',
                title: 'Консьерж поднимет заказ',
                text: 'Доставим к двери в течение 15 минут',
              })
            }
          >
            Поднять в квартиру
          </Button>
        </div>
      </Card>

      <SectionTitle>История доставок</SectionTitle>
      <MenuGroup>
        <MenuRow
          icon="box"
          title="СДЭК"
          sub="Сегодня 16:42 · на ресепшене"
          onClick={() => go({ key: 'parcelDetail' })}
          right={<StatusTag color={c.ok}>получено</StatusTag>}
        />
        <MenuRow
          icon="leaf"
          title="ВкусВилл"
          sub="Вчера 11:20 · доставлено в квартиру"
          last
          right={
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                color: c.sec,
                background: c.chip,
                padding: '4px 9px',
                borderRadius: 8,
              }}
            >
              закрыто
            </span>
          }
        />
      </MenuGroup>
    </RouteScreen>
  );
}

/** Журнал входов с фильтром по категориям. */
export function AccessHistory() {
  const c = useColors();
  const { historyFilter, setHistoryFilter } = useData();

  const filters = [
    { value: 'all', label: 'Все' },
    { value: 'family', label: 'Семья' },
    { value: 'guests', label: 'Гости' },
    { value: 'staff', label: 'Персонал' },
    { value: 'cars', label: 'Авто' },
    { value: 'delivery', label: 'Доставки' },
  ];

  const events = [
    { time: '08:10', name: 'Ольга (няня)', point: 'Главный вход', category: 'staff', icon: 'user' },
    { time: '08:35', name: 'София', point: 'Главный вход', category: 'family', icon: 'user' },
    { time: '09:30', name: 'BMW iX', point: 'Паркинг', category: 'cars', icon: 'car' },
    { time: '11:20', name: 'ВкусВилл', point: 'Лобби', category: 'delivery', icon: 'box' },
    { time: '16:42', name: 'СДЭК', point: 'Ресепшен', category: 'delivery', icon: 'box' },
    { time: '17:50', name: 'Игорь', point: 'Дверь квартиры', category: 'family', icon: 'key' },
  ];

  const shown = events.filter((e) => historyFilter === 'all' || e.category === historyFilter);

  return (
    <RouteScreen title="История доступа">
      <FilterPills
        options={filters}
        value={historyFilter}
        onChange={setHistoryFilter}
        style={{ marginBottom: 16 }}
      />

      {shown.length ? (
        <MenuGroup>
          {shown.map((e, i) => (
            <MenuRow
              key={e.time + e.name}
              icon={e.icon}
              title={e.name}
              sub={`${e.point} · ${e.time}`}
              right={null}
              last={i === shown.length - 1}
            />
          ))}
        </MenuGroup>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 0', color: c.sec }}>
          <Icon name="search" size={36} color={c.faint} />
          <div style={{ marginTop: 12, fontSize: 14 }}>Нет событий в этой категории</div>
        </div>
      )}
    </RouteScreen>
  );
}
