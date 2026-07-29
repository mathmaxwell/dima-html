import { useColors } from '../../theme/ThemeContext';
import { FONT, SERIF } from '../../theme/palette';
import { useNav } from '../../store/NavContext';
import { useData, ROOMS, isLit } from '../../store/DataContext';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { ActionList, KeyValue } from '../../ui/DetailList';
import { ToggleRow } from '../../ui/Field';
import { Icon } from '../../ui/Icon';
import { BottomSheet, SheetTitle, Spinner } from '../../ui/Overlay';
import { Photo } from '../../ui/Photo';
import { Switch } from '../../ui/Switch';
import { QrCode } from './QrCode';

/** Все двери, которые можно открыть с телефона. */
const ALL_DOORS = [
  { id: 'main', label: 'Главный вход', icon: 'lock' },
  { id: 'park', label: 'Паркинг', icon: 'car' },
  { id: 'yard', label: 'Вход со двора', icon: 'house' },
  { id: 'flat', label: 'Дверь квартиры', icon: 'key' },
  { id: 'store', label: 'Кладовая', icon: 'box' },
];

function DoorsSheet() {
  const c = useColors();
  const { doors, openDoor } = useData();

  return (
    <>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Открыть дверь</div>
      <div
        style={{
          fontSize: 13.5,
          color: c.sec,
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 7,
        }}
      >
        <Icon name="wifi" size={15} color={c.ok} />
        Bluetooth активен · вы рядом с домом
      </div>

      {ALL_DOORS.map((door) => {
        const state = doors[door.id];
        const opened = state === 'open';
        return (
          <button
            key={door.id}
            onClick={() => openDoor(door.id)}
            disabled={opened}
            style={{
              width: '100%',
              marginBottom: 10,
              background: opened ? `${c.ok}1a` : c.chip,
              border: `1px solid ${opened ? c.ok : c.line}`,
              borderRadius: 16,
              padding: '15px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 13,
              cursor: opened ? 'default' : 'pointer',
              color: c.text,
              textAlign: 'left',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: c.card,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 'none',
              }}
            >
              {state === 'opening' ? (
                <Spinner size={20} />
              ) : (
                <Icon name={opened ? 'check' : door.icon} size={20} color={opened ? c.ok : c.accent} />
              )}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15.5, fontWeight: 600 }}>{door.label}</div>
              <div style={{ fontSize: 12.5, color: opened ? c.ok : c.sec }}>
                {opened
                  ? 'Открыто на 10 секунд'
                  : state === 'opening'
                    ? 'Открываем…'
                    : 'Нажмите, чтобы открыть'}
              </div>
            </div>

            {!state && <Icon name="chevR" size={18} color={c.faint} />}
          </button>
        );
      })}
    </>
  );
}

const CARS = [
  { name: 'BMW iX', sub: 'Заряд 82% · паркинг −2', seed: 1 },
  { name: 'Range Rover', sub: 'Готов · паркинг −2', seed: 7 },
  { name: 'Гостевой автомобиль', sub: 'Место свободно', seed: 6 },
];

function CallCarSheet() {
  const c = useColors();
  const { closeSheet, openModal } = useNav();

  return (
    <>
      <SheetTitle>Вызвать автомобиль</SheetTitle>
      {CARS.map((car) => (
        <button
          key={car.name}
          onClick={() => {
            closeSheet();
            openModal({
              key: 'success',
              title: `${car.name} подаётся`,
              text: 'Valet подаст автомобиль к подъезду А через 15 минут',
            });
          }}
          style={{
            width: '100%',
            marginBottom: 10,
            background: c.chip,
            border: `1px solid ${c.line}`,
            borderRadius: 16,
            padding: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 13,
            cursor: 'pointer',
            color: c.text,
            textAlign: 'left',
          }}
        >
          <Photo seed={car.seed} style={{ width: 52, height: 52, borderRadius: 12, flex: 'none' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15.5, fontWeight: 600 }}>{car.name}</div>
            <div style={{ fontSize: 12.5, color: c.sec }}>{car.sub}</div>
          </div>
          <Icon name="valet" size={20} color={c.accent} />
        </button>
      ))}
    </>
  );
}

const EMERGENCY_ACTIONS = [
  { label: 'Отозвать все гостевые доступы', icon: 'user' },
  { label: 'Временно отключить персонал', icon: 'user' },
  { label: 'Заблокировать цифровые ключи', icon: 'key' },
];

function EmergencySheet() {
  const c = useColors();
  const { closeSheet, confirm, showToast } = useNav();

  return (
    <>
      <SheetTitle
        color={c.err}
        sub="Действие требует подтверждения и мгновенно ограничивает доступ"
      >
        Экстренный отзыв
      </SheetTitle>

      {EMERGENCY_ACTIONS.map((action) => (
        <button
          key={action.label}
          onClick={() =>
            confirm({
              title: `${action.label}?`,
              text: 'Действие вступит в силу немедленно',
              okLabel: 'Подтвердить',
              danger: true,
              onOk: () => {
                closeSheet();
                showToast(`${action.label.split(' ')[0]} — выполнено`, { icon: 'check', tone: 'err' });
              },
            })
          }
          style={{
            width: '100%',
            marginBottom: 10,
            background: `${c.err}12`,
            border: `1px solid ${c.err}33`,
            borderRadius: 16,
            padding: '15px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 13,
            cursor: 'pointer',
            color: c.err,
            textAlign: 'left',
          }}
        >
          <Icon name={action.icon} size={20} color={c.err} />
          <span style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>{action.label}</span>
          <Icon name="chevR" size={17} color={c.err} />
        </button>
      ))}

      <Button
        full
        variant="soft"
        icon="shield"
        style={{ marginTop: 6 }}
        onClick={() => {
          closeSheet();
          showToast('Соединяем с постом охраны…', { icon: 'phone' });
        }}
      >
        Связаться с безопасностью
      </Button>
    </>
  );
}

const TIMES = ['15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '19:00', '19:30', '20:00'];

function PickTimeSheet() {
  const c = useColors();
  const { closeSheet, showToast } = useNav();

  return (
    <>
      <SheetTitle>Выберите время</SheetTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
        {TIMES.map((time) => (
          <button
            key={time}
            onClick={() => {
              closeSheet();
              showToast(`Перенесено на ${time}`, { icon: 'check', tone: 'ok' });
            }}
            style={{
              background: c.chip,
              border: `1px solid ${c.line}`,
              borderRadius: 14,
              padding: '15px 0',
              fontSize: 15,
              fontWeight: 600,
              color: c.text,
              cursor: 'pointer',
              fontFamily: FONT,
            }}
          >
            {time}
          </button>
        ))}
      </div>
    </>
  );
}

const DATES = ['Сегодня', 'Завтра', '2 августа', '3 августа', '5 августа', '10 августа'];

function PickDateSheet() {
  const c = useColors();
  const { closeSheet } = useNav();
  const { pass, setPass } = useData();

  return (
    <>
      <SheetTitle>Выберите дату</SheetTitle>
      {DATES.map((date) => {
        const active = pass.date === date;
        return (
          <button
            key={date}
            onClick={() => {
              setPass({ date });
              closeSheet();
            }}
            style={{
              width: '100%',
              marginBottom: 8,
              background: active ? `${c.accent}1a` : c.chip,
              border: `1px solid ${active ? c.accent : c.line}`,
              borderRadius: 14,
              padding: '14px 16px',
              fontSize: 15,
              fontWeight: 600,
              color: c.text,
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: FONT,
            }}
          >
            {date}
          </button>
        );
      })}
    </>
  );
}

const CLEAN_SCOPE = [
  'Влажная уборка всех комнат',
  'Мытьё окон и зеркал',
  'Чистка кухни и техники',
  'Санузлы с дезинфекцией',
  'Смена постельного белья',
  'Полировка мебели',
];

function CleanScopeSheet() {
  const c = useColors();

  return (
    <>
      <SheetTitle>Состав услуги</SheetTitle>
      {CLEAN_SCOPE.map((item, i) => (
        <div
          key={item}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '11px 0',
            borderBottom: i === CLEAN_SCOPE.length - 1 ? 'none' : `1px solid ${c.line}`,
          }}
        >
          <Icon name="check" size={18} color={c.ok} />
          <span style={{ fontSize: 15 }}>{item}</span>
        </div>
      ))}
    </>
  );
}

function QrSheet({ sheet }) {
  const c = useColors();
  const { closeSheet, route, back, showToast } = useNav();
  const name = sheet.data?.name || 'Гость';

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 20, fontWeight: 700 }}>Пропуск готов</div>
      <div style={{ fontSize: 13.5, color: c.sec, marginTop: 4, marginBottom: 18 }}>
        {name} · покажите QR на входе
      </div>

      <div
        style={{
          width: 200,
          height: 200,
          margin: '0 auto',
          background: '#fff',
          borderRadius: 20,
          padding: 16,
          boxShadow: '0 4px 14px rgba(0,0,0,.1)',
        }}
      >
        <QrCode />
      </div>

      <div style={{ display: 'flex', gap: 10, margin: '20px 0 4px' }}>
        <Button
          sm
          variant="soft"
          icon="copy"
          style={{ flex: 1 }}
          onClick={() => showToast('Ссылка скопирована', { icon: 'copy' })}
        >
          Скопировать
        </Button>
        <Button
          sm
          icon="share"
          style={{ flex: 1 }}
          onClick={() => showToast('Ссылка отправлена', { icon: 'share', tone: 'ok' })}
        >
          Поделиться
        </Button>
      </div>

      <Button
        full
        variant="ghost"
        style={{ marginTop: 4 }}
        onClick={() => {
          closeSheet();
          // после выдачи пропуска возвращаемся из формы создания
          if (route?.key === 'createPass') back();
        }}
      >
        Готово
      </Button>
    </div>
  );
}

function PersonDetailSheet({ sheet }) {
  const c = useColors();
  const { closeSheet, showToast } = useNav();
  const person = sheet.data;

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 16 }}>
        <Photo seed={person.seed} style={{ width: 56, height: 56, borderRadius: '50%', flex: 'none' }} />
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{person.name}</div>
          <div style={{ fontSize: 13, color: c.sec }}>{person.role}</div>
        </div>
      </div>

      <KeyValue
        rows={[
          ['Расписание', person.schedule],
          ['Последняя активность', 'Сегодня 08:10 · главный вход'],
          ['Зоны', 'Все, кроме кладовой'],
        ]}
      />

      <Button
        full
        variant="soft"
        style={{ marginTop: 14 }}
        onClick={() => {
          closeSheet();
          showToast('Открываем расписание…', { icon: 'calendar' });
        }}
      >
        Изменить расписание
      </Button>
    </>
  );
}

function RoomSheet({ sheet }) {
  const c = useColors();
  const { closeSheet, go } = useNav();
  const { home, toggleLight } = useData();

  const id = sheet.data.id;
  const room = ROOMS[id];
  const lit = isLit(home.lights, id);

  return (
    <>
      <div style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 600, letterSpacing: -0.2 }}>
        {room.name}
      </div>
      <div style={{ fontSize: 13, color: c.sec, marginBottom: 16 }}>
        {room.temp}° · {room.leak ? 'внимание: протечка' : 'всё в норме'}
      </div>

      <Card style={{ marginBottom: 12 }}>
        <ToggleRow icon="bulb" label="Свет" style={{ padding: '4px 0 12px' }}>
          <Switch on={lit} onToggle={() => toggleLight(id, lit)} />
        </ToggleRow>

        <div style={{ padding: '12px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
            <span style={{ fontWeight: 600 }}>Температура</span>
            <span style={{ color: c.accent, fontWeight: 700 }}>{room.temp}°</span>
          </div>
          <input
            type="range"
            min={16}
            max={28}
            defaultValue={room.temp}
            style={{ width: '100%', accentColor: c.accent }}
          />
        </div>

        <ToggleRow icon="curtain" label="Шторы" last style={{ padding: '12px 0 4px', borderTop: `1px solid ${c.line}` }}>
          <Switch on onToggle={() => {}} />
        </ToggleRow>
      </Card>

      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          variant="soft"
          icon="video"
          style={{ flex: 1 }}
          onClick={() => {
            closeSheet();
            go({ key: 'cameras' });
          }}
        >
          Камера комнаты
        </Button>
        <Button style={{ flex: 1 }} onClick={closeSheet}>
          Готово
        </Button>
      </div>
    </>
  );
}

const LEAK_STEPS = [
  { time: '16:20', text: 'Датчик зафиксировал протечку под раковиной', icon: 'drop' },
  { time: '16:20', text: 'Подача воды в ванную перекрыта автоматически', icon: 'shield' },
  { time: '16:21', text: 'Уведомление отправлено вам и консьержу', icon: 'bell' },
  { time: '16:24', text: 'Инженер Алексей вызван · прибудет к 17:00', icon: 'wrench' },
];

function LeakSheet() {
  const c = useColors();
  const { closeSheet, showToast } = useNav();

  return (
    <>
      <div style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 600, color: c.err }}>
        Протечка в ванной
      </div>
      <div style={{ fontSize: 13.5, color: c.sec, marginBottom: 18 }}>
        Ситуация под контролем. Вода перекрыта, инженер уже в пути.
      </div>

      {LEAK_STEPS.map((step, i) => {
        const last = i === LEAK_STEPS.length - 1;
        // первые два шага дом выполнил сам — они уже завершены
        const done = i < 2;
        return (
          <div key={step.text} style={{ display: 'flex', gap: 13, paddingBottom: last ? 0 : 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: done ? `${c.ok}1e` : c.chip,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 'none',
                }}
              >
                <Icon name={done ? 'check' : step.icon} size={18} color={done ? c.ok : c.accent} />
              </div>
              {!last && (
                <div style={{ width: 2, flex: 1, minHeight: 14, background: c.line, marginTop: 4 }} />
              )}
            </div>

            <div style={{ paddingTop: 2 }}>
              <div style={{ fontSize: 12, color: c.sec, fontWeight: 600 }}>{step.time}</div>
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 1 }}>{step.text}</div>
            </div>
          </div>
        );
      })}

      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <Button
          sm
          variant="soft"
          style={{ flex: 1 }}
          onClick={() => showToast('Звоним Алексею…', { icon: 'phone' })}
        >
          Позвонить инженеру
        </Button>
        <Button sm style={{ flex: 1 }} onClick={closeSheet}>
          Понятно
        </Button>
      </div>
    </>
  );
}

function EquipmentSheet({ sheet }) {
  const { closeSheet, go } = useNav();
  const item = sheet.data;
  const model = item.name.split(' ').slice(1).join(' ') || '—';

  return (
    <>
      <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 14 }}>{item.name}</div>
      <KeyValue
        rows={[
          ['Модель', model],
          ['Установка', 'Март 2024'],
          ['Гарантия', 'до марта 2027'],
          ['Последнее ТО', 'Сентябрь 2025'],
          ['Следующее ТО', 'Сентябрь 2026'],
        ]}
      />
      <Button
        full
        style={{ marginTop: 14 }}
        onClick={() => {
          closeSheet();
          go({ key: 'techhelp' });
        }}
      >
        Заказать обслуживание
      </Button>
    </>
  );
}

function OrderStatusSheet({ sheet }) {
  const c = useColors();
  const { closeSheet, go, showToast } = useNav();

  return (
    <>
      <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 4 }}>{sheet.data.title}</div>
      <div style={{ fontSize: 13.5, color: c.sec, marginBottom: 16 }}>
        Статус: {sheet.data.status}
      </div>

      <ActionList
        style={{ marginTop: 0 }}
        items={[
          {
            icon: 'chat',
            label: 'Написать по заявке',
            onClick: () => {
              closeSheet();
              go({ key: 'chat' });
            },
          },
          {
            icon: 'x',
            label: 'Отменить заявку',
            danger: true,
            onClick: () => {
              closeSheet();
              showToast('Заявка отменена', { icon: 'x', tone: 'err' });
            },
          },
        ]}
      />
    </>
  );
}

function PrivilegeSheet({ sheet }) {
  const c = useColors();
  const { closeSheet, openModal, switchTab, showToast } = useNav();
  const item = sheet.data;

  return (
    <>
      <Photo seed={item.seed} style={{ height: 140, borderRadius: 16, marginBottom: 14 }} />
      <div style={{ fontSize: 20, fontWeight: 700 }}>{item.title}</div>
      <div style={{ fontSize: 14, color: c.sec, marginTop: 4, marginBottom: 16, lineHeight: 1.45 }}>
        {item.sub}. Доступно только резидентам Дома Кино по цифровой карте клуба.
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <Button
          style={{ flex: 1 }}
          onClick={() => {
            closeSheet();
            openModal({
              key: 'success',
              title: 'Готово',
              text: 'Консьерж оформит привилегию и пришлёт подтверждение.',
            });
          }}
        >
          Воспользоваться
        </Button>
        <Button
          variant="soft"
          icon="copy"
          style={{ flex: 1 }}
          onClick={() => showToast('Код DOMKINO скопирован', { icon: 'copy' })}
        >
          Код
        </Button>
      </div>

      <Button
        full
        variant="ghost"
        icon="chat"
        onClick={() => {
          closeSheet();
          switchTab('concierge');
        }}
      >
        Связаться с консьержем
      </Button>
    </>
  );
}

/** Реестр шторок: ключ из openSheet({ key }) → компонент. */
const SHEETS = {
  doors: DoorsSheet,
  callcar: CallCarSheet,
  emergency: EmergencySheet,
  pickTime: PickTimeSheet,
  pickDate: PickDateSheet,
  cleanScope: CleanScopeSheet,
  qr: QrSheet,
  personDetail: PersonDetailSheet,
  room: RoomSheet,
  leak: LeakSheet,
  equipment: EquipmentSheet,
  orderStatus: OrderStatusSheet,
  privilege: PrivilegeSheet,
};

/** Показывает открытую шторку, если она есть. */
export function SheetHost() {
  const { sheet, closeSheet } = useNav();
  if (!sheet) return null;

  const Component = SHEETS[sheet.key];
  return (
    <BottomSheet onClose={closeSheet}>
      {Component ? <Component sheet={sheet} /> : <div style={{ padding: 20 }}>—</div>}
    </BottomSheet>
  );
}
