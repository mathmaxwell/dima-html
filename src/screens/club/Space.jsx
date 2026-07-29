import { useColors } from '../../theme/ThemeContext';
import { EDITORIAL, FONT } from '../../theme/palette';
import { HeroBackButton } from '../../layout/RouteScreen';
import { useNav } from '../../store/NavContext';
import { useData } from '../../store/DataContext';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { ToggleRow } from '../../ui/Field';
import { Icon } from '../../ui/Icon';
import { Scene } from '../../ui/Scene';
import { FieldLabel } from '../../ui/SectionTitle';
import { Switch } from '../../ui/Switch';

const SLOTS = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
/** Занятые слоты приходили бы с сервера; в демонстрации зашиты. */
const BUSY_SLOTS = ['12:00'];

const EXTRAS = [
  { icon: 'leaf', label: 'Напитки и снеки', key: 'drinks' },
  { icon: 'ticket', label: 'Кейтеринг', key: 'catering' },
  { icon: 'spark', label: 'Уборка после', key: 'cleaning' },
  { icon: 'user', label: 'Детский сопровождающий', key: 'nanny' },
  { icon: 'dumbbell', label: 'Оборудование', key: 'equipment' },
];

const DEFAULT_SPACE = {
  name: 'Пространство',
  image: 'garden',
  capacity: 'до 20 гостей',
  price: 'бесплатно',
};

/** Карточка пространства с галереей, слотами и дополнительными услугами. */
export function Space({ data }) {
  const c = useColors();
  const { back, openSheet, openModal } = useNav();
  const { pass, booking, setBooking, toggleBookingExtra } = useData();

  const space = data || DEFAULT_SPACE;
  const { slot, guests, extras } = booking;

  const stepGuests = (delta) => setBooking({ guests: Math.max(1, guests + delta) });

  const counterButton = {
    width: 30,
    height: 30,
    borderRadius: 8,
    border: 'none',
    background: c.chip,
    cursor: 'pointer',
    color: c.text,
  };

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <Scene
          image={space.image}
          zoom
          gradient="linear-gradient(180deg, rgba(15,9,11,.4), rgba(15,9,11,.6))"
          style={{ height: 260 }}
        />
        <HeroBackButton onClick={back} />

        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 22, color: '#fff' }}>
          <div style={{ fontFamily: EDITORIAL, fontSize: 32, fontWeight: 500 }}>{space.name}</div>
          <div style={{ fontSize: 13.5, opacity: 0.9, marginTop: 2 }}>
            {space.capacity} · {space.price}
          </div>
        </div>
      </div>

      <div style={{ padding: '18px 20px 40px' }}>
        {/* лента дополнительных кадров */}
        <div
          style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 18, paddingBottom: 4 }}
        >
          {[space.image, 'garden', 'wellness', 'lounge', 'facadeT'].map((image, i) => (
            <Scene
              key={`${image}-${i}`}
              image={image}
              gradient={false}
              style={{ width: 96, height: 70, borderRadius: 12, flex: 'none' }}
            />
          ))}
        </div>

        <div style={{ fontSize: 14.5, color: c.sec, lineHeight: 1.5, marginBottom: 18 }}>
          Пространство резиденции с приватным доступом только для жителей и приглашённых гостей.
          Мягкий свет, тактильные материалы и спокойствие.
        </div>

        <FieldLabel>ДАТА И ГОСТИ</FieldLabel>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <button
            onClick={() => openSheet({ key: 'pickDate' })}
            style={{
              flex: 1,
              background: c.card,
              border: `1px solid ${c.line}`,
              borderRadius: 14,
              padding: '13px 15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              color: c.text,
            }}
          >
            <span style={{ fontSize: 14.5, fontWeight: 600 }}>{pass.date}</span>
            <Icon name="calendar" size={18} color={c.accent} />
          </button>

          <div
            style={{
              flex: 1,
              background: c.card,
              border: `1px solid ${c.line}`,
              borderRadius: 14,
              padding: '9px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <button onClick={() => stepGuests(-1)} style={{ ...counterButton, fontSize: 18 }}>
              −
            </button>
            <span style={{ fontSize: 15, fontWeight: 700 }}>{guests}</span>
            <button onClick={() => stepGuests(1)} style={{ ...counterButton, fontSize: 16 }}>
              +
            </button>
          </div>
        </div>

        <FieldLabel>{`ВРЕМЯ · ${pass.date.toUpperCase()}`}</FieldLabel>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 8,
            marginBottom: 18,
          }}
        >
          {SLOTS.map((time) => {
            const busy = BUSY_SLOTS.includes(time);
            const selected = slot === time;
            return (
              <button
                key={time}
                disabled={busy}
                onClick={() => setBooking({ slot: time })}
                style={{
                  background: selected ? c.accent : busy ? 'transparent' : c.chip,
                  color: selected ? '#fff' : busy ? c.faint : c.text,
                  border: busy ? `1px dashed ${c.line}` : 'none',
                  borderRadius: 12,
                  padding: '13px 0',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: busy ? 'default' : 'pointer',
                  fontFamily: FONT,
                  textDecoration: busy ? 'line-through' : 'none',
                }}
              >
                {time}
              </button>
            );
          })}
        </div>

        <FieldLabel>ДОПОЛНИТЕЛЬНО</FieldLabel>
        <Card style={{ marginBottom: 18 }}>
          {EXTRAS.map((extra, i) => (
            <ToggleRow
              key={extra.key}
              icon={extra.icon}
              label={extra.label}
              last={i === EXTRAS.length - 1}
              style={{ padding: '11px 0' }}
            >
              <Switch on={Boolean(extras[extra.key])} onToggle={() => toggleBookingExtra(extra.key)} />
            </ToggleRow>
          ))}
        </Card>

        <Button
          full
          disabled={!slot}
          onClick={() => {
            openModal({
              key: 'success',
              title: `${space.name} забронировано`,
              text: `${pass.date}, ${slot} · ${guests} гостя. Консьерж всё подготовит.`,
              onOk: back,
            });
            setBooking({ slot: null, extras: {} });
          }}
        >
          {slot ? `Забронировать · ${pass.date}, ${slot}` : 'Выберите время'}
        </Button>
      </div>
    </div>
  );
}
