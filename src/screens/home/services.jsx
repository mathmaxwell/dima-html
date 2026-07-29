import { useColors } from '../../theme/ThemeContext';
import { SERIF } from '../../theme/palette';
import { RouteScreen } from '../../layout/RouteScreen';
import { useNav } from '../../store/NavContext';
import { useData } from '../../store/DataContext';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { ChipGroup, FilterPills } from '../../ui/Chips';
import { Notice } from '../../ui/DetailList';
import { ToggleRow } from '../../ui/Field';
import { Icon } from '../../ui/Icon';
import { MenuGroup, MenuRow } from '../../ui/MenuRow';
import { SectionTitle, FieldLabel } from '../../ui/SectionTitle';
import { Switch } from '../../ui/Switch';

/** Платежи: задолженность, автоплатёж, история. */
export function Payments() {
  const c = useColors();
  const { go, showToast } = useNav();
  const { bill, toggleAutopay } = useData();

  return (
    <RouteScreen title="Платежи">
      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12.5, color: c.sec, fontWeight: 600 }}>ТЕКУЩАЯ ЗАДОЛЖЕННОСТЬ</div>
        <div style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 600, margin: '4px 0' }}>
          {bill.paid ? '0 ₽' : '18 540 ₽'}
        </div>
        {!bill.paid && (
          <Button full style={{ marginTop: 8 }} onClick={() => go({ key: 'bill' })}>
            Оплатить счёт за июль
          </Button>
        )}
      </Card>

      <MenuGroup>
        <MenuRow
          icon="card"
          title="Автоплатёж"
          sub={bill.autopay ? 'Включён · 10 числа' : 'Выключен'}
          right={<Switch on={bill.autopay} onToggle={toggleAutopay} />}
        />
        <MenuRow
          icon="bolt"
          title="Показания счётчиков"
          sub="Передать за июль"
          onClick={() => showToast('Форма показаний открыта', { icon: 'bolt' })}
        />
        <MenuRow
          icon="doc"
          title="Квитанции"
          sub="Июль, июнь, май"
          onClick={() => showToast('Квитанции сохранены', { icon: 'doc' })}
          last
        />
      </MenuGroup>

      <SectionTitle>Предыдущие платежи</SectionTitle>
      <MenuGroup>
        <MenuRow
          icon="check"
          title="Июнь 2026"
          sub="01.07.2026 · карта ···4821"
          right={<span style={{ fontWeight: 700, fontSize: 14 }}>17 820 ₽</span>}
        />
        <MenuRow
          icon="check"
          title="Май 2026"
          sub="02.06.2026 · автоплатёж"
          right={<span style={{ fontWeight: 700, fontSize: 14 }}>18 100 ₽</span>}
          last
        />
      </MenuGroup>
    </RouteScreen>
  );
}

const EQUIPMENT = [
  { name: 'Кондиционер Daikin', sub: 'Установлен 03.2024 · гарантия до 03.2027' },
  { name: 'Система вентиляции', sub: 'Установлена 03.2024 · ТО 09.2026' },
  { name: 'Посудомоечная машина Miele', sub: 'Установлена 04.2024 · гарантия до 04.2029' },
  { name: 'Датчик протечки', sub: 'Установлен 03.2024 · исправен' },
];

/** Паспорт квартиры: оборудование, гарантии, обслуживание. */
export function Passport() {
  const c = useColors();
  const { openSheet } = useNav();

  return (
    <RouteScreen title="Паспорт квартиры">
      <FilterPills
        options={['Планировка', 'Оборудование', 'Гарантии', 'Акты', 'Страхование']}
        value="Оборудование"
        style={{ marginBottom: 16 }}
      />

      <FieldLabel style={{ marginBottom: 10 }}>ОБОРУДОВАНИЕ</FieldLabel>

      {EQUIPMENT.map((item) => (
        <Card
          key={item.name}
          onClick={() => openSheet({ key: 'equipment', data: item })}
          style={{ marginBottom: 10 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 11,
                background: c.chip,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 'none',
              }}
            >
              <Icon name="settings" size={20} color={c.accent} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14.5, fontWeight: 700 }}>{item.name}</div>
              <div style={{ fontSize: 12, color: c.sec, marginTop: 1 }}>{item.sub}</div>
            </div>
            <Icon name="chevR" size={17} color={c.faint} />
          </div>
        </Card>
      ))}
    </RouteScreen>
  );
}

const AWAY_OPTIONS = [
  { icon: 'drop', label: 'Контроль протечек', key: 'awayWater' },
  { icon: 'leaf', label: 'Имитация присутствия', key: 'awaySim' },
  { icon: 'thermo', label: 'Поддержка температуры 18°', key: 'awayTemp' },
  { icon: 'flower', label: 'Полив растений', key: 'awayPlants' },
  { icon: 'box', label: 'Пересылка корреспонденции', key: 'awayMail' },
];

/** Режим отсутствия: квартира присматривает за собой сама. */
export function Away() {
  const c = useColors();
  const { go, openSheet, openModal, showToast } = useNav();
  const { home, setHome } = useData();

  const options = home.awayOptions;
  const isOn = (key) => options[key] ?? true;

  const toggle = () => {
    const next = !home.away;
    setHome({ away: next });
    if (next) {
      openModal({
        key: 'success',
        title: 'Режим отсутствия включён',
        text: 'До 18 августа. Квартира под наблюдением, вы получите уведомление о любой активности.',
      });
    } else {
      showToast('Режим отсутствия выключен', { icon: 'check' });
    }
  };

  return (
    <RouteScreen title="Режим отсутствия">
      {home.away && (
        <div
          style={{
            background: `${c.ok}16`,
            border: `1px solid ${c.ok}44`,
            borderRadius: 16,
            padding: '14px 16px',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 11,
          }}
        >
          <Icon name="check" size={20} color={c.ok} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14.5, fontWeight: 700 }}>
              Режим включён до {home.awayTo}
            </div>
            <div style={{ fontSize: 12.5, color: c.sec }}>Квартира под наблюдением</div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {[
          { label: 'С', value: home.awayFrom },
          { label: 'По', value: home.awayTo },
        ].map((f) => (
          <div key={f.label} style={{ flex: 1 }}>
            <FieldLabel style={{ marginBottom: 7 }}>{f.label}</FieldLabel>
            <button
              onClick={() => openSheet({ key: 'pickDate' })}
              style={{
                width: '100%',
                background: c.card,
                border: `1px solid ${c.line}`,
                borderRadius: 14,
                padding: 14,
                fontSize: 15,
                fontWeight: 600,
                color: c.text,
                cursor: 'pointer',
              }}
            >
              {f.value}
            </button>
          </div>
        ))}
      </div>

      <Card style={{ marginBottom: 12 }}>
        {AWAY_OPTIONS.map((option, i) => (
          <ToggleRow
            key={option.key}
            icon={option.icon}
            label={option.label}
            last={i === AWAY_OPTIONS.length - 1}
          >
            <Switch
              on={isOn(option.key)}
              onToggle={() =>
                setHome({ awayOptions: { ...options, [option.key]: !isOn(option.key) } })
              }
            />
          </ToggleRow>
        ))}
      </Card>

      <MenuGroup>
        <MenuRow
          icon="user"
          title="Кто может входить"
          sub="Няня, водитель"
          onClick={() => go({ key: 'people' })}
        />
        <MenuRow
          icon="shield"
          title="Частота проверки"
          sub="Раз в 2 дня"
          onClick={() => openSheet({ key: 'pickTime' })}
          last
        />
      </MenuGroup>

      <Button full variant={home.away ? 'soft' : 'primary'} onClick={toggle}>
        {home.away ? 'Выключить режим' : 'Включить режим отсутствия'}
      </Button>
    </RouteScreen>
  );
}

/** Высота столбцов графика по периодам, в процентах. */
const CONSUMPTION = {
  Неделя: [40, 55, 48, 62, 58, 70, 52],
  Месяц: [60, 52, 68, 74, 58, 80, 66, 72],
  Год: [50, 58, 54, 62, 70, 66, 74, 80, 72, 68, 60, 64],
};

/** Потребление ресурсов. */
export function Consumption() {
  const c = useColors();
  const { home, setHome } = useData();
  const bars = CONSUMPTION[home.consumePeriod];

  const tiles = [
    { icon: 'drop', label: 'Вода', value: '12,4 м³' },
    { icon: 'thermo', label: 'Отопление', value: '280 кВт·ч' },
    { icon: 'bolt', label: 'Зарядка авто', value: '142 кВт·ч' },
    { icon: 'leaf', label: 'Экоиндекс', value: 'A' },
  ];

  return (
    <RouteScreen title="Потребление">
      <ChipGroup
        options={Object.keys(CONSUMPTION)}
        value={home.consumePeriod}
        onChange={(consumePeriod) => setHome({ consumePeriod })}
        stretch
        style={{ marginBottom: 16 }}
      />

      <Card style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 13, color: c.sec, fontWeight: 600, marginBottom: 2 }}>
          Электричество
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 14 }}>428 кВт·ч</div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120 }}>
          {bars.map((value, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${value}%`,
                background: i === bars.length - 1 ? c.accent : c.chip,
                borderRadius: 6,
                transition: 'height .3s',
              }}
            />
          ))}
        </div>
      </Card>

      <Notice icon="drop" tone={c.warn} style={{ marginBottom: 12, alignItems: 'flex-start' }}>
        Расход воды вырос на 18%. Основной рост — 19–21 июля.
      </Notice>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {tiles.map((tile) => (
          <div
            key={tile.label}
            style={{
              background: c.card,
              border: `1px solid ${c.line}`,
              borderRadius: 16,
              padding: 14,
            }}
          >
            <Icon name={tile.icon} size={20} color={c.accent} />
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 8 }}>{tile.value}</div>
            <div style={{ fontSize: 12, color: c.sec }}>{tile.label}</div>
          </div>
        ))}
      </div>
    </RouteScreen>
  );
}
