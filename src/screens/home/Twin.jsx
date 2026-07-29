import { useColors } from '../../theme/ThemeContext';
import { EDITORIAL, SERIF } from '../../theme/palette';
import { RouteScreen } from '../../layout/RouteScreen';
import { useNav } from '../../store/NavContext';
import { useData, ROOMS, PLAN_SIZE, isLit } from '../../store/DataContext';
import { Card } from '../../ui/Card';
import { Icon } from '../../ui/Icon';
import { MenuGroup, MenuRow } from '../../ui/MenuRow';
import { Scene } from '../../ui/Scene';

/** Интерактивный план: каждая комната — плитка с температурой и светом. */
function FloorPlan({ lights, onRoomClick }) {
  const c = useColors();

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: `${PLAN_SIZE.width} / ${PLAN_SIZE.height}` }}>
      {Object.entries(ROOMS).map(([key, room]) => {
        const lit = isLit(lights, key);
        return (
          <div
            key={key}
            onClick={() => onRoomClick(key)}
            style={{
              position: 'absolute',
              left: `${(room.x / PLAN_SIZE.width) * 100}%`,
              top: `${(room.y / PLAN_SIZE.height) * 100}%`,
              width: `${(room.w / PLAN_SIZE.width) * 100}%`,
              height: `${(room.h / PLAN_SIZE.height) * 100}%`,
              padding: '9px 10px',
              borderRadius: 10,
              cursor: 'pointer',
              background: room.leak ? `${c.err}14` : lit ? `${c.accent}12` : c.chip,
              border: `1px solid ${room.leak ? c.err : c.line}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Icon name={room.icon} size={16} color={room.leak ? c.err : lit ? c.accent : c.sec} />
              {room.leak ? (
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: c.err,
                    animation: 'dkpulse 1.2s infinite',
                  }}
                />
              ) : (
                lit && (
                  <span
                    style={{ width: 7, height: 7, borderRadius: '50%', background: c.accent2 }}
                  />
                )
              )}
            </div>

            <div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: c.text, lineHeight: 1.1 }}>
                {room.name}
              </div>
              <div style={{ fontFamily: SERIF, fontSize: 14, fontWeight: 600, color: c.sec }}>
                {room.temp}°
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Цифровой двойник квартиры. */
export function Twin() {
  const c = useColors();
  const { go, openSheet } = useNav();
  const { home } = useData();

  const legend = [
    { dot: c.accent2, label: 'свет включён' },
    { dot: c.err, label: 'событие' },
  ];

  const stats = [
    { icon: 'thermo', value: '23°', label: 'средняя', color: c.accent },
    { icon: 'leaf', value: 'A', label: 'воздух', color: c.accent },
    { icon: 'drop', value: '1', label: 'событие', color: c.err },
  ];

  return (
    <RouteScreen title="Цифровой двойник">
      <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', marginBottom: 14 }}>
        <Scene
          image="lounge"
          gradient="linear-gradient(90deg, rgba(15,9,11,.82), rgba(15,9,11,.2))"
          style={{ height: 130 }}
        />
        <div
          style={{
            position: 'absolute',
            left: 16,
            top: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          <div
            style={{
              fontSize: 11.5,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              opacity: 0.85,
              fontFamily: SERIF,
              fontWeight: 500,
            }}
          >
            Квартира 1204
          </div>
          <div
            style={{
              fontFamily: EDITORIAL,
              fontSize: 26,
              fontWeight: 500,
              lineHeight: 1.05,
              marginTop: 2,
            }}
          >
            142 м² · 7 комнат
          </div>
          <div
            style={{
              fontSize: 12,
              opacity: 0.85,
              marginTop: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: c.ok }} />
            дом на связи
          </div>
        </div>
      </div>

      {/* авария: дом уже отреагировал сам */}
      <div
        onClick={() => openSheet({ key: 'leak' })}
        style={{
          background: `${c.err}14`,
          border: `1px solid ${c.err}44`,
          borderRadius: 16,
          padding: '13px 15px',
          display: 'flex',
          gap: 11,
          alignItems: 'center',
          marginBottom: 16,
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 11,
            background: `${c.err}22`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none',
          }}
        >
          <Icon name="drop" size={20} color={c.err} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: c.err }}>
            В ванной обнаружена протечка
          </div>
          <div style={{ fontSize: 12.5, color: c.sec }}>
            Вода перекрыта автоматически · инженер вызван
          </div>
        </div>
        <Icon name="chevR" size={18} color={c.err} />
      </div>

      <Card style={{ marginBottom: 14 }}>
        <FloorPlan
          lights={home.lights}
          onRoomClick={(id) => openSheet({ key: 'room', data: { id } })}
        />

        <div
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 14,
            justifyContent: 'center',
            fontSize: 11.5,
            color: c.sec,
            flexWrap: 'wrap',
          }}
        >
          {legend.map((l) => (
            <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: l.dot }} />
              {l.label}
            </span>
          ))}
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="leaf" size={13} color={c.ok} />
            воздух отличный
          </span>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: c.card,
              border: `1px solid ${c.line}`,
              borderRadius: 14,
              padding: '13px 10px',
              textAlign: 'center',
            }}
          >
            <Icon name={s.icon} size={19} color={s.color} />
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 6 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: c.sec }}>{s.label}</div>
          </div>
        ))}
      </div>

      <MenuGroup>
        <MenuRow icon="bulb" title="Управление светом" sub="3 из 7 комнат" onClick={() => go({ key: 'smart' })} />
        <MenuRow icon="thermo" title="Климат" sub="Авто · 22°" onClick={() => go({ key: 'climate' })} />
        <MenuRow icon="video" title="Камеры" sub="4 камеры" onClick={() => go({ key: 'cameras' })} />
        <MenuRow
          icon="wrench"
          title="Плановое обслуживание"
          sub="ТО вентиляции в сентябре"
          onClick={() => go({ key: 'passport' })}
          last
        />
      </MenuGroup>
    </RouteScreen>
  );
}
