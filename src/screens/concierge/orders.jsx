import { useColors } from '../../theme/ThemeContext';
import { RouteScreen } from '../../layout/RouteScreen';
import { useNav } from '../../store/NavContext';
import { useData } from '../../store/DataContext';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { ChipGroup } from '../../ui/Chips';
import { ActionList, KeyValue } from '../../ui/DetailList';
import { Field, PickerButton, TextArea, ToggleCardRow } from '../../ui/Field';
import { Icon } from '../../ui/Icon';
import { MenuGroup, MenuRow, StatusTag } from '../../ui/MenuRow';
import { FieldLabel } from '../../ui/SectionTitle';
import { Switch } from '../../ui/Switch';

const CLEANING_TYPES = ['Обычная', 'Генеральная', 'После мероприятия', 'Подготовка к приезду'];
const cleaningPrice = (type) => (type === 'Генеральная' ? '6 500 ₽' : '4 200 ₽');

/** Заказ уборки. */
export function Cleaning() {
  const { back, openSheet, openModal, showToast } = useNav();
  const { services, setServices } = useData();
  const price = cleaningPrice(services.cleanType);

  return (
    <RouteScreen title="Уборка">
      <FieldLabel>ТИП УБОРКИ</FieldLabel>
      <ChipGroup
        options={CLEANING_TYPES}
        value={services.cleanType}
        onChange={(cleanType) => setServices({ cleanType })}
        style={{ marginBottom: 18 }}
      />

      <KeyValue
        rows={[
          ['Площадь', '142 м²'],
          ['Дата', 'Завтра, 15:00'],
          ['Длительность', '≈ 3 часа'],
          ['Исполнитель', 'Мария (знакомый)'],
          ['Стоимость', price],
        ]}
      />

      <ActionList
        items={[
          { icon: 'doc', label: 'Состав услуги', onClick: () => openSheet({ key: 'cleanScope' }) },
          {
            icon: 'spark',
            label: 'Повторить как в прошлый раз',
            onClick: () =>
              showToast('Настройки прошлого заказа применены', { icon: 'check', tone: 'ok' }),
          },
          {
            icon: 'calendar',
            label: 'Сделать регулярной',
            onClick: () => showToast('Уборка добавлена в регулярные', { icon: 'check', tone: 'ok' }),
          },
        ]}
      />

      <Button
        full
        style={{ marginTop: 16 }}
        onClick={() =>
          openModal({
            key: 'success',
            title: 'Уборка заказана',
            text: `${services.cleanType} завтра в 15:00. Ответственная — Мария.`,
            onOk: back,
          })
        }
      >
        {`Заказать · ${price}`}
      </Button>
    </RouteScreen>
  );
}

const TECH_CATEGORIES = ['Электрика', 'Сантехника', 'Климат', 'Техника', 'Мебель', 'Другое'];
const URGENCY = ['Обычная', 'Срочно', 'Аварийно'];

/** Заявка на техническую помощь. */
export function TechHelp() {
  const c = useColors();
  const { back, openModal } = useNav();
  const { services, setServices } = useData();

  const submit = () =>
    openModal({
      key: 'success',
      title: 'Инженер назначен',
      text: 'Алексей приедет сегодня с 16:00 до 16:30. Ориентировочная стоимость — 1 800 ₽.',
      okLabel: 'Понятно',
      person: { name: 'Алексей', role: 'Инженер · рейтинг 4.9', seed: 1 },
      onOk: back,
    });

  return (
    <RouteScreen title="Техническая помощь">
      <FieldLabel>КАТЕГОРИЯ</FieldLabel>
      <ChipGroup
        options={TECH_CATEGORIES}
        value={services.techCategory}
        onChange={(techCategory) => setServices({ techCategory })}
        style={{ marginBottom: 16 }}
      />

      <FieldLabel style={{ marginBottom: 7 }}>ОПИСАНИЕ</FieldLabel>
      <TextArea
        value={services.techDescription}
        placeholder="Например: не охлаждает кондиционер в спальне"
        onChange={(techDescription) => setServices({ techDescription })}
        style={{ marginBottom: 14 }}
      />

      <button
        onClick={() => setServices({ techPhoto: !services.techPhoto })}
        style={{
          width: '100%',
          background: c.card,
          border: `1px dashed ${c.line}`,
          borderRadius: 14,
          padding: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          cursor: 'pointer',
          color: services.techPhoto ? c.ok : c.sec,
          marginBottom: 16,
        }}
      >
        <Icon
          name={services.techPhoto ? 'check' : 'plus'}
          size={20}
          color={services.techPhoto ? c.ok : c.sec}
        />
        <span style={{ fontSize: 14, fontWeight: 600 }}>
          {services.techPhoto ? 'Фотография добавлена' : 'Добавить фотографию'}
        </span>
      </button>

      <FieldLabel>СРОЧНОСТЬ</FieldLabel>
      <ChipGroup
        options={URGENCY}
        value={services.techUrgency}
        onChange={(techUrgency) => setServices({ techUrgency })}
        stretch
        style={{ marginBottom: 16 }}
      />

      <ToggleCardRow
        label="Разрешить вход в моё отсутствие"
        onClick={() => setServices({ techAllowEntry: !services.techAllowEntry })}
        style={{ marginBottom: 16 }}
      >
        <Switch
          on={services.techAllowEntry}
          onToggle={() => setServices({ techAllowEntry: !services.techAllowEntry })}
        />
      </ToggleCardRow>

      <Button full onClick={submit}>
        Отправить заявку
      </Button>
    </RouteScreen>
  );
}

/** Универсальный бланк заказа для услуг без своего экрана. */
export function OrderTemplate({ data }) {
  const c = useColors();
  const { back, openSheet, openModal } = useNav();
  const { pass, services, setServices } = useData();
  const service = data || { title: 'Услуга', icon: 'more' };

  return (
    <RouteScreen title={service.title}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 18 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 15,
            background: c.chip,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name={service.icon} size={26} color={c.accent} />
        </div>
        <div>
          <div style={{ fontSize: 19, fontWeight: 700 }}>{service.title}</div>
          <div style={{ fontSize: 13, color: c.sec }}>Консьерж организует под вас</div>
        </div>
      </div>

      <Field label="КОГДА">
        <PickerButton value={pass.date} icon="calendar" onClick={() => openSheet({ key: 'pickDate' })} />
      </Field>

      <Field label="КОММЕНТАРИЙ">
        <TextArea
          value={services.orderNote}
          placeholder="Пожелания и детали…"
          minHeight={80}
          onChange={(orderNote) => setServices({ orderNote })}
        />
      </Field>

      <Button
        full
        style={{ marginTop: 2 }}
        onClick={() =>
          openModal({
            key: 'success',
            title: 'Заявка отправлена',
            text: 'Екатерина свяжется с вами в ближайшее время и подтвердит детали.',
            onOk: back,
          })
        }
      >
        Отправить консьержу
      </Button>
    </RouteScreen>
  );
}

/** Список активных заявок. */
export function Requests() {
  const c = useColors();
  const { go, switchTab, openSheet } = useNav();

  const items = [
    { icon: 'spark', title: 'Клининг', sub: 'Завтра 15:00 · Мария', status: 'подтверждён', color: c.ok, route: 'cleanDetail' },
    { icon: 'leaf', title: 'Доставка продуктов', sub: 'Воскресенье, утро', status: 'комплектуется', color: c.warn },
    { icon: 'wrench', title: 'Инженер · кондиционер', sub: 'Сегодня 16:00 · Алексей', status: 'в пути', color: c.accent, route: 'techhelp' },
    { icon: 'ticket', title: 'Ресторан «Sartoria»', sub: 'Сб 20:00, 4 персоны', status: 'ожидает', color: c.sec },
  ];

  return (
    <RouteScreen title="Активные запросы">
      <MenuGroup>
        {items.map((item, i) => (
          <MenuRow
            key={item.title}
            icon={item.icon}
            title={item.title}
            sub={item.sub}
            last={i === items.length - 1}
            onClick={() =>
              item.route
                ? go({ key: item.route })
                : openSheet({ key: 'orderStatus', data: { title: item.title, status: item.status } })
            }
            right={<StatusTag color={item.color}>{item.status}</StatusTag>}
          />
        ))}
      </MenuGroup>

      <Button full variant="soft" icon="plus" onClick={() => switchTab('concierge')}>
        Новый запрос
      </Button>
    </RouteScreen>
  );
}

/** Регулярные услуги с расписанием. */
export function Regular() {
  const c = useColors();
  const { openSheet, showToast } = useNav();

  const items = [
    { icon: 'spark', title: 'Уборка', schedule: 'Каждый вторник, 10:00' },
    { icon: 'bag', title: 'Химчистка', schedule: 'Раз в две недели' },
    { icon: 'drop', title: 'Питьевая вода', schedule: 'Замена по средам' },
    { icon: 'user', title: 'Выгул собаки', schedule: 'Ежедневно, 8:00 и 20:00' },
    { icon: 'flower', title: 'Обслуживание цветов', schedule: 'Раз в неделю' },
  ];

  return (
    <RouteScreen title="Регулярные услуги">
      {items.map((item) => (
        <Card key={item.title} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 11,
                background: c.chip,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name={item.icon} size={19} color={c.accent} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15.5, fontWeight: 700 }}>{item.title}</div>
              <div style={{ fontSize: 12.5, color: c.sec }}>{item.schedule}</div>
            </div>
            <StatusTag color={c.ok}>активно</StatusTag>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              sm
              variant="soft"
              style={{ flex: 1 }}
              onClick={() => showToast(`${item.title}: ближайший визит пропущен`, { icon: 'clock' })}
            >
              Пропустить раз
            </Button>
            <Button sm variant="ghost" style={{ flex: 1 }} onClick={() => openSheet({ key: 'pickTime' })}>
              Изменить
            </Button>
          </div>
        </Card>
      ))}
    </RouteScreen>
  );
}
