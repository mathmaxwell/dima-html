import { useColors } from '../../theme/ThemeContext';
import { SERIF } from '../../theme/palette';
import { RouteScreen } from '../../layout/RouteScreen';
import { useNav } from '../../store/NavContext';
import { useData } from '../../store/DataContext';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { ChipGroup } from '../../ui/Chips';
import { Notice } from '../../ui/DetailList';
import { ToggleCardRow, ToggleRow } from '../../ui/Field';
import { Icon } from '../../ui/Icon';
import { Photo } from '../../ui/Photo';
import { Scene } from '../../ui/Scene';
import { FieldLabel } from '../../ui/SectionTitle';
import { Switch } from '../../ui/Switch';

const SCENES = [
  { name: 'Дома', icon: 'home' },
  { name: 'Ушли', icon: 'logout' },
  { name: 'Ночь', icon: 'moon' },
  { name: 'Гости', icon: 'user' },
  { name: 'Кино', icon: 'film' },
  { name: 'Отпуск', icon: 'leaf' },
];

const SMART_ROOMS = [
  { name: 'Гостиная', key: 'living', temp: 24, seed: 1 },
  { name: 'Спальня', key: 'bed', temp: 22, seed: 7 },
  { name: 'Детская', key: 'kids', temp: 23, seed: 2 },
  { name: 'Кухня', key: 'kitchen', temp: 24, seed: 4 },
  { name: 'Ванная', key: 'bath', temp: 25, seed: 6 },
];

/** Быстрые контролы всегда включены по умолчанию для охраны и датчиков. */
const QUICK_CONTROLS = [
  { icon: 'bulb', label: 'Свет в гостиной', key: 'living', defaultOn: false },
  { icon: 'leaf', label: 'Розетки', key: 'sockets', defaultOn: false },
  { icon: 'shield', label: 'Охрана', key: 'security', defaultOn: true },
  { icon: 'drop', label: 'Датчики протечки', key: 'leak', defaultOn: true },
];

/** Умная квартира: сцены, комнаты и быстрые переключатели. */
export function Smart() {
  const c = useColors();
  const { go, showToast } = useNav();
  const { home, setHome, toggleLight } = useData();

  return (
    <RouteScreen title="Умная квартира">
      <FieldLabel style={{ marginBottom: 10 }}>СЦЕНЫ</FieldLabel>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 20, paddingBottom: 4 }}>
        {SCENES.map((scene) => {
          const active = home.scene === scene.name;
          return (
            <button
              key={scene.name}
              onClick={() => {
                setHome({ scene: scene.name });
                showToast(`Сцена «${scene.name}» включена`, { icon: 'check', tone: 'ok' });
              }}
              style={{
                flex: 'none',
                background: active ? c.inv : c.card,
                color: active ? c.invText : c.text,
                border: `1px solid ${c.line}`,
                borderRadius: 16,
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
                minWidth: 74,
              }}
            >
              <Icon name={scene.icon} size={20} color={active ? c.invText : c.accent} />
              <span style={{ fontSize: 12, fontWeight: 600 }}>{scene.name}</span>
            </button>
          );
        })}
      </div>

      <FieldLabel style={{ marginBottom: 10 }}>КОМНАТЫ</FieldLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        {SMART_ROOMS.map((room) => (
          <button
            key={room.key}
            onClick={() => go({ key: 'climate' })}
            style={{
              background: c.card,
              border: `1px solid ${c.line}`,
              borderRadius: 18,
              padding: 0,
              overflow: 'hidden',
              cursor: 'pointer',
              textAlign: 'left',
              color: c.text,
            }}
          >
            <Photo seed={room.seed} style={{ height: 70 }} />
            <div style={{ padding: '11px 13px' }}>
              <div style={{ fontSize: 14.5, fontWeight: 700 }}>{room.name}</div>
              <div style={{ fontSize: 12, color: c.sec, marginTop: 2 }}>
                {room.temp}° · {home.lights[room.key] ? 'свет вкл' : 'свет выкл'}
              </div>
            </div>
          </button>
        ))}
      </div>

      <FieldLabel style={{ marginBottom: 10 }}>БЫСТРЫЕ КОНТРОЛЫ</FieldLabel>
      <Card>
        {QUICK_CONTROLS.map((control, i) => (
          <ToggleRow
            key={control.key}
            icon={control.icon}
            label={control.label}
            last={i === QUICK_CONTROLS.length - 1}
            style={{ padding: '11px 0' }}
          >
            <Switch
              on={home.lights[control.key] ?? control.defaultOn}
              onToggle={() => toggleLight(control.key, control.defaultOn)}
            />
          </ToggleRow>
        ))}

        <div style={{ marginTop: 8, paddingTop: 14, borderTop: `1px solid ${c.line}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
            <span style={{ fontWeight: 500 }}>Шторы</span>
            <span style={{ color: c.sec }}>{home.curtains}% открыто</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={home.curtains}
            onChange={(e) => setHome({ curtains: Number(e.target.value) })}
            style={{ width: '100%', accentColor: c.accent }}
          />
        </div>
      </Card>
    </RouteScreen>
  );
}

const CLIMATE_MODES = ['Авто', 'Охлаждение', 'Обогрев', 'Вентиляция'];
const MIN_TEMP = 16;
const MAX_TEMP = 28;

/** Климат: круглый регулятор целевой температуры. */
export function Climate() {
  const c = useColors();
  const { showToast } = useNav();
  const { home, setHome } = useData();
  const target = home.climateTarget;
  const progress = ((target - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)) * 100;

  const step = (delta) =>
    setHome({ climateTarget: Math.min(MAX_TEMP, Math.max(MIN_TEMP, target + delta)) });

  const roundButton = {
    width: 54,
    height: 54,
    borderRadius: '50%',
    background: c.card,
    border: `1px solid ${c.line}`,
    cursor: 'pointer',
    color: c.text,
  };

  return (
    <RouteScreen title="Климат">
      <div style={{ textAlign: 'center', padding: '10px 0 20px' }}>
        <div style={{ position: 'relative', width: 220, height: 220, margin: '0 auto' }}>
          {/* кольцо-шкала: заполненная дуга вырезается радиальной маской */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: `conic-gradient(${c.accent} ${progress}%, ${c.line} 0)`,
              mask: 'radial-gradient(circle,transparent 62%,#000 63%)',
              WebkitMask: 'radial-gradient(circle,transparent 62%,#000 63%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontFamily: SERIF, fontSize: 64, fontWeight: 600, lineHeight: 1 }}>
              {target}°
            </div>
            <div style={{ fontSize: 13, color: c.sec, marginTop: 4 }}>
              сейчас 23° · цель {target}°
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 20 }}>
          <button onClick={() => step(-1)} style={{ ...roundButton, fontSize: 26 }}>
            −
          </button>
          <button onClick={() => step(1)} style={{ ...roundButton, fontSize: 24 }}>
            +
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {[
          ['Влажность', '48%'],
          ['Воздух', 'Отлично'],
          ['CO₂', '520 ppm'],
        ].map(([label, value]) => (
          <div
            key={label}
            style={{
              flex: 1,
              background: c.card,
              border: `1px solid ${c.line}`,
              borderRadius: 14,
              padding: '12px 10px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 700 }}>{value}</div>
            <div style={{ fontSize: 11.5, color: c.sec, marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      <FieldLabel>РЕЖИМ</FieldLabel>
      <ChipGroup
        options={CLIMATE_MODES}
        value={home.climateMode}
        onChange={(climateMode) => setHome({ climateMode })}
        style={{ marginBottom: 16 }}
      />

      <ToggleCardRow
        icon="leaf"
        label="Усиленная вентиляция"
        onClick={() => setHome({ boost: !home.boost })}
        style={{ marginBottom: 14 }}
      >
        <Switch on={home.boost} onToggle={() => setHome({ boost: !home.boost })} />
      </ToggleCardRow>

      <Button
        full
        onClick={() =>
          showToast(`Установлено ${target}° во всех комнатах`, { icon: 'check', tone: 'ok' })
        }
      >
        Применить ко всей квартире
      </Button>
    </RouteScreen>
  );
}

const CAMERAS = [
  { name: 'Входная зона', image: 'context', online: true },
  { name: 'Прихожая', image: 'lounge2', online: true },
  { name: 'Гостиная', image: 'lounge', online: false },
  { name: 'Сад / двор', image: 'garden', online: true },
];

/** Камеры с приватным доступом. */
export function Cameras() {
  const c = useColors();
  const { openModal, showToast } = useNav();

  return (
    <RouteScreen title="Камеры">
      <Notice icon="lock" style={{ marginBottom: 16, alignItems: 'flex-start', fontSize: 13 }}>
        Приватный доступ. Сотрудники УК не видят камеры внутри квартиры.
      </Notice>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {CAMERAS.map((cam) => (
          <button
            key={cam.name}
            onClick={() =>
              cam.online && openModal({ key: 'camera', data: { name: cam.name, image: cam.image } })
            }
            style={{
              background: c.card,
              border: `1px solid ${c.line}`,
              borderRadius: 16,
              overflow: 'hidden',
              padding: 0,
              cursor: cam.online ? 'pointer' : 'default',
              textAlign: 'left',
              color: c.text,
            }}
          >
            <div style={{ position: 'relative', height: 96 }}>
              {cam.online ? (
                <Scene image={cam.image} gradient={false} style={{ position: 'absolute', inset: 0 }} />
              ) : (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: c.chip,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon name="video" size={26} color={c.faint} />
                </div>
              )}

              {cam.online && (
                <div
                  style={{
                    position: 'absolute',
                    left: 8,
                    top: 8,
                    background: 'rgba(224,72,60,.9)',
                    color: '#fff',
                    fontSize: 9.5,
                    fontWeight: 700,
                    padding: '3px 7px',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} />
                  LIVE
                </div>
              )}
            </div>

            <div
              style={{
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600 }}>{cam.name}</span>
              <Switch
                on={cam.online}
                onToggle={() =>
                  showToast(`${cam.name}${cam.online ? ': выключена' : ': включена'}`, {
                    icon: 'video',
                  })
                }
              />
            </div>
          </button>
        ))}
      </div>
    </RouteScreen>
  );
}
