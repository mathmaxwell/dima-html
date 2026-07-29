import { useColors, useTheme } from '../../theme/ThemeContext';
import { EDITORIAL, SERIF } from '../../theme/palette';
import { IMAGES } from '../../assets/images';
import { useNav } from '../../store/NavContext';
import { Button } from '../../ui/Button';
import { FacadeMotif } from '../../ui/FacadeMotif';
import { Icon } from '../../ui/Icon';
import { Scene } from '../../ui/Scene';
import { SectionTitle } from '../../ui/SectionTitle';

const GARDEN = { name: 'Приватный сад', image: 'garden', capacity: 'до 20 гостей', price: 'бесплатно' };

/** Крупная карточка пространства резиденции. */
function SpaceCard({ name, image, availability, availabilityColor, data }) {
  const c = useColors();
  const { go } = useNav();

  return (
    <div
      onClick={() => go({ key: 'space', data })}
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 12,
        cursor: 'pointer',
        border: `1px solid ${c.line}`,
        position: 'relative',
      }}
    >
      <Scene
        image={image}
        gradient="linear-gradient(0deg, rgba(15,9,11,.8), rgba(15,9,11,.05) 60%)"
        style={{ height: 170 }}
      />
      <div
        style={{
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 14,
          color: '#fff',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 600, letterSpacing: 0.3 }}>
            {name}
          </div>
          <div
            style={{
              fontSize: 12.5,
              marginTop: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              opacity: 0.95,
            }}
          >
            <span
              style={{ width: 7, height: 7, borderRadius: '50%', background: availabilityColor }}
            />
            {availability}
          </div>
        </div>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: 'rgba(255,255,255,.18)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="chevR" size={20} color="#fff" />
        </div>
      </div>
    </div>
  );
}

/** Клубная карта резидента поверх фрагмента фасада. */
function MembershipCard() {
  const c = useColors();
  const stats = [
    ['PLATINUM', 'статус'],
    ['6', 'приглашений'],
    ['кв. 1204', 'резиденция'],
  ];

  return (
    <div
      style={{
        borderRadius: 22,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 8,
        padding: 22,
        color: '#f3e9e4',
        boxShadow: c.shadow,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${IMAGES.facadeT})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(120deg, rgba(35,15,18,.94), rgba(90,25,30,.72))',
        }}
      />
      <FacadeMotif
        columns={5}
        color="#d98a86"
        style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 64, opacity: 0.3 }}
      />

      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div
              style={{
                fontSize: 11.5,
                letterSpacing: 2,
                opacity: 0.8,
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Клуб резидентов
            </div>
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 26,
                fontWeight: 600,
                marginTop: 6,
                letterSpacing: 0.5,
              }}
            >
              АННА ВОЛКОВА
            </div>
          </div>
          <FacadeMotif
            columns={5}
            color="#d98a86"
            opacity={1}
            style={{ width: 26, height: 28, borderRadius: 3 }}
          />
        </div>

        <div style={{ display: 'flex', gap: 28, marginTop: 24 }}>
          {stats.map(([value, label]) => (
            <div key={label}>
              <div style={{ fontSize: 20, fontWeight: 600, fontFamily: SERIF, letterSpacing: 0.5 }}>
                {value}
              </div>
              <div style={{ fontSize: 11, opacity: 0.65 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ClubTab() {
  const c = useColors();
  const { dark } = useTheme();
  const { go } = useNav();

  // вечером на первый план выходит закрытый показ, днём — сад
  const evening = dark;

  const shortcuts = [
    { icon: 'film', label: 'Кино и культура', route: 'cinema' },
    { icon: 'gift', label: 'Привилегии', route: 'privileges' },
    { icon: 'user', label: 'Для детей', route: 'spaces' },
    { icon: 'ticket', label: 'Мои бронирования', route: 'bookings' },
  ];

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <Scene
          image={evening ? 'lounge' : 'garden'}
          zoom
          gradient="linear-gradient(180deg, rgba(15,9,11,.45) 0%, rgba(15,9,11,.1) 34%, rgba(15,9,11,.92) 100%)"
          style={{ height: 400 }}
        />
        <FacadeMotif
          columns={24}
          color="#c76b6b"
          opacity={0.85}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 5 }}
        />

        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 26, color: '#fff' }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: 'uppercase',
              opacity: 0.85,
              fontFamily: SERIF,
              fontWeight: 500,
            }}
          >
            Сегодня в Доме Кино
          </div>
          <div
            style={{
              fontFamily: EDITORIAL,
              fontSize: 34,
              fontWeight: 500,
              lineHeight: 1.05,
              marginTop: 6,
            }}
          >
            {evening ? '«Расёмон»' : 'Приватный сад открыт'}
          </div>
          <div style={{ fontSize: 14, opacity: 0.85, marginTop: 4, marginBottom: 16 }}>
            {evening
              ? 'Закрытый показ · 20:00 · осталось 4 места'
              : 'Спокойное утро в саду резиденции · до 23:00'}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <Button
              sm
              style={{ background: '#fff', color: '#241417' }}
              onClick={() => (evening ? go({ key: 'event' }) : go({ key: 'space', data: GARDEN }))}
            >
              {evening ? 'Участвовать' : 'Забронировать сад'}
            </Button>
            <Button
              sm
              style={{ background: 'rgba(255,255,255,.16)', color: '#fff', backdropFilter: 'blur(8px)' }}
              onClick={() => go({ key: 'cinema' })}
            >
              Все события
            </Button>
          </div>
        </div>
      </div>

      <div style={{ padding: '18px 20px 30px' }}>
        <SectionTitle action={{ label: 'Все', onClick: () => go({ key: 'spaces' }) }}>
          Пространства резиденции
        </SectionTitle>

        <SpaceCard
          name="Приватный сад"
          image="garden"
          availability="Открыт до 23:00 · сейчас свободно"
          availabilityColor={c.ok}
          data={GARDEN}
        />
        <SpaceCard
          name="Wellness & Spa"
          image="wellness"
          availability="Свободно · 2 из 8 гостей"
          availabilityColor={c.ok}
          data={{ name: 'Wellness & Spa', image: 'wellness', capacity: '1–8 гостей', price: 'от 3 500 ₽' }}
        />
        <SpaceCard
          name="Lounge"
          image="lounge"
          availability="Ближайший слот 18:00"
          availabilityColor={c.accent}
          data={{ name: 'Lounge', image: 'lounge', capacity: 'до 12 гостей', price: 'от 4 000 ₽' }}
        />

        <SectionTitle>Клубная карта</SectionTitle>
        <MembershipCard />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
          {shortcuts.map((s) => (
            <button
              key={s.route}
              onClick={() => go({ key: s.route })}
              style={{
                background: c.card,
                border: `1px solid ${c.line}`,
                borderRadius: 16,
                padding: '16px 14px',
                cursor: 'pointer',
                color: c.text,
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: 11,
              }}
            >
              <Icon name={s.icon} size={20} color={c.accent} />
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
