import { useColors } from '../../theme/ThemeContext';
import { RouteScreen } from '../../layout/RouteScreen';
import { useNav } from '../../store/NavContext';
import { useData } from '../../store/DataContext';
import { useSession } from '../../store/SessionContext';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { FilterPills } from '../../ui/Chips';
import { MenuGroup, MenuRow } from '../../ui/MenuRow';
import { Photo } from '../../ui/Photo';
import { FieldLabel } from '../../ui/SectionTitle';
import { Switch } from '../../ui/Switch';

/** Личные предпочтения, которые сервис учитывает автоматически. */
const PREFERENCES = [
  { key: 'm1', label: 'Комфортная температура', value: '22°' },
  { key: 'm2', label: 'Любимый клинер — Мария' },
  { key: 'm3', label: 'Аллергии для кейтеринга', value: 'орехи' },
  { key: 'm4', label: 'Места в кинозале', value: 'ряд 3, центр' },
];

export function Profile() {
  const c = useColors();
  const { go, confirm, showToast } = useNav();
  const { preferences, togglePreference } = useData();
  const { signOut } = useSession();

  return (
    <RouteScreen title="Профиль">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        <Photo seed={9} style={{ width: 88, height: 88, borderRadius: '50%', marginBottom: 12 }} />
        <div style={{ fontSize: 22, fontWeight: 700 }}>Анна Волкова</div>
        <div style={{ fontSize: 14, color: c.sec }}>Дом Кино · квартира 1204</div>
      </div>

      <FieldLabel>СЕМЬЯ И ДОСТУП</FieldLabel>
      <MenuGroup>
        <MenuRow icon="user" title="Члены семьи" sub="Игорь, София + няня, водитель" onClick={() => go({ key: 'people' })} />
        <MenuRow icon="car" title="Автомобили" sub="BMW iX, Range Rover" onClick={() => go({ key: 'cars' })} />
        <MenuRow
          icon="card"
          title="Способы оплаты"
          sub="Карта ···4821"
          onClick={() => showToast('Карты открыты', { icon: 'card' })}
          last
        />
      </MenuGroup>

      <FieldLabel>ПРЕДПОЧТЕНИЯ</FieldLabel>
      <Card style={{ marginBottom: 16 }}>
        {PREFERENCES.map((pref, i) => (
          <div
            key={pref.key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 0',
              borderBottom: i === PREFERENCES.length - 1 ? 'none' : `1px solid ${c.line}`,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, fontWeight: 500 }}>{pref.label}</div>
              {pref.value && <div style={{ fontSize: 12, color: c.sec }}>{pref.value}</div>}
            </div>
            <Switch on={preferences[pref.key]} onToggle={() => togglePreference(pref.key)} />
          </div>
        ))}
      </Card>

      <MenuGroup>
        <MenuRow icon="bell" title="Уведомления" onClick={() => go({ key: 'notifications' })} />
        <MenuRow
          icon="lock"
          title="Безопасность"
          sub="Face ID · PIN"
          onClick={() => showToast('Настройки безопасности', { icon: 'lock' })}
        />
        <MenuRow
          icon="doc"
          title="Документы"
          onClick={() => showToast('Документы', { icon: 'doc' })}
          last
        />
      </MenuGroup>

      <Button
        full
        variant="soft"
        icon="logout"
        onClick={() =>
          confirm({ title: 'Выйти из аккаунта?', okLabel: 'Выйти', danger: true, onOk: signOut })
        }
      >
        Выйти
      </Button>
    </RouteScreen>
  );
}

/** История уведомлений, сгруппированная по времени. */
export function Notifications() {
  const c = useColors();
  const { showToast } = useNav();

  const groups = [
    {
      title: 'Сегодня',
      items: [
        { icon: 'user', text: 'Няня вошла через главный вход', time: '08:10' },
        { icon: 'box', text: 'Получена посылка от СДЭК', time: '16:42' },
        { icon: 'card', text: 'Оплата паркинга прошла успешно', time: '17:05' },
      ],
    },
    {
      title: 'Ранее',
      items: [
        { icon: 'wrench', text: 'Инженер будет у вас через 15 минут', time: 'вчера' },
        { icon: 'film', text: 'Освободилось место на закрытый показ', time: 'вчера' },
        { icon: 'drop', text: 'Обнаружена протечка — вода перекрыта', time: '2 дня назад' },
      ],
    },
  ];

  return (
    <RouteScreen title="Уведомления">
      <FilterPills
        options={['Все', 'Доступ', 'Сервисы', 'Дом', 'Платежи', 'Клуб', 'Безопасность']}
        value="Все"
        style={{ marginBottom: 16 }}
      />

      {groups.map((group) => (
        <div key={group.title}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: c.sec, margin: '6px 0 10px' }}>
            {group.title.toUpperCase()}
          </div>
          <MenuGroup>
            {group.items.map((item, i) => (
              <MenuRow
                key={item.text}
                icon={item.icon}
                title={item.text}
                sub={item.time}
                right={null}
                last={i === group.items.length - 1}
                onClick={() => showToast('Открываем связанный экран…', { icon: item.icon })}
              />
            ))}
          </MenuGroup>
        </div>
      ))}

      <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
        <Button
          sm
          variant="soft"
          style={{ flex: 1 }}
          onClick={() => showToast('Всё прочитано', { icon: 'check', tone: 'ok' })}
        >
          Отметить прочитанным
        </Button>
        <Button
          sm
          variant="ghost"
          style={{ flex: 1 }}
          onClick={() => showToast('Уведомления очищены', { icon: 'x' })}
        >
          Очистить
        </Button>
      </div>
    </RouteScreen>
  );
}
