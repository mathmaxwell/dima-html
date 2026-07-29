import { useColors } from '../../theme/ThemeContext';
import { SERIF } from '../../theme/palette';
import { Header } from '../../layout/Header';
import { useNav } from '../../store/NavContext';
import { useData } from '../../store/DataContext';
import { Card } from '../../ui/Card';
import { Icon } from '../../ui/Icon';
import { MenuGroup, MenuRow } from '../../ui/MenuRow';
import { Spinner } from '../../ui/Overlay';

/** Двери, вынесенные на главную плитку доступа. */
const QUICK_DOORS = [
  { id: 'main', label: 'Главный вход' },
  { id: 'park', label: 'Паркинг' },
  { id: 'yard', label: 'Вход со двора' },
  { id: 'flat', label: 'Дверь квартиры' },
];

export function AccessTab() {
  const c = useColors();
  const { go, openSheet } = useNav();
  const { doors, openDoor } = useData();

  return (
    <div>
      <Header greeting="Добрый вечер, Анна" />

      <div style={{ padding: '14px 20px 30px' }}>
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: -0.3,
            marginBottom: 16,
          }}
        >
          Доступ
        </div>

        <Card style={{ marginBottom: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 14,
            }}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Открыть дверь</div>
              <div style={{ fontSize: 12.5, color: c.sec }}>
                Bluetooth активен · последний вход 16:42
              </div>
            </div>
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                background: c.ok,
                boxShadow: `0 0 0 4px ${c.ok}33`,
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {QUICK_DOORS.map(({ id, label }) => {
              const state = doors[id];
              const opened = state === 'open';
              return (
                <button
                  key={id}
                  onClick={() => openDoor(id)}
                  disabled={opened}
                  style={{
                    background: opened ? `${c.ok}1e` : c.chip,
                    border: `1px solid ${opened ? c.ok : c.line}`,
                    borderRadius: 14,
                    padding: '13px 12px',
                    cursor: opened ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: c.text,
                    textAlign: 'left',
                  }}
                >
                  {state === 'opening' ? (
                    <Spinner size={18} />
                  ) : (
                    <Icon name={opened ? 'check' : 'lock'} size={18} color={opened ? c.ok : c.accent} />
                  )}
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{opened ? 'Открыто' : label}</span>
                </button>
              );
            })}
          </div>
        </Card>

        <MenuGroup>
          <MenuRow icon="qr" title="Создать пропуск" sub="Гость, курьер, персонал" onClick={() => go({ key: 'createPass' })} />
          <MenuRow icon="user" title="Люди с доступом" sub="5 человек" onClick={() => go({ key: 'people' })} />
          <MenuRow icon="car" title="Автомобили" sub="2 авто · 1 гостевое место" onClick={() => go({ key: 'cars' })} />
          <MenuRow icon="box" title="Доставки и курьеры" sub="1 курьер ожидается" onClick={() => go({ key: 'deliveries' })} />
          <MenuRow icon="clock" title="История доступа" sub="Сегодня 8 событий" onClick={() => go({ key: 'accessHistory' })} />
          <MenuRow icon="video" title="Домофон" sub="Демонстрационный звонок" onClick={() => go({ key: 'intercom' })} last />
        </MenuGroup>

        <Card
          onClick={() => openSheet({ key: 'emergency' })}
          style={{ border: `1px solid ${c.err}44` }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 11,
                background: `${c.err}1e`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 'none',
              }}
            >
              <Icon name="shield" size={20} color={c.err} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: c.err }}>
                Экстренно отозвать доступы
              </div>
              <div style={{ fontSize: 12.5, color: c.sec }}>Заблокировать все ключи и пропуска</div>
            </div>
            <Icon name="chevR" size={18} color={c.err} />
          </div>
        </Card>
      </div>
    </div>
  );
}
