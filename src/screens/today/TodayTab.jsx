import { useColors, useTheme } from '../../theme/ThemeContext';
import { EDITORIAL, SERIF } from '../../theme/palette';
import { heroTop } from '../../theme/safeArea';
import { useNav } from '../../store/NavContext';
import { useData } from '../../store/DataContext';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { FacadeMotif } from '../../ui/FacadeMotif';
import { Icon } from '../../ui/Icon';
import { Scene } from '../../ui/Scene';
import { SectionTitle } from '../../ui/SectionTitle';
import { QuickAction, CompactDayCard } from './parts';

/** Живое состояние резиденции — четыре плитки в карточке. */
function ResidenceNow() {
  const c = useColors();
  const items = [
    { icon: 'leaf', title: 'Сад открыт', sub: 'до 23:00', color: c.ok },
    { icon: 'dumbbell', title: 'Wellness свободен', sub: '2 из 8 гостей', color: c.ok },
    { icon: 'film', title: 'Кинозал', sub: '6 мест на показ', color: c.accent },
    { icon: 'valet', title: 'Valet', sub: 'подача 4 мин', color: c.accent2 },
  ];

  return (
    <Card style={{ marginBottom: 4 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 12px' }}>
        {items.map((item) => (
          <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: `${item.color}1c`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 'none',
              }}
            >
              <Icon name={item.icon} size={18} color={item.color} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap' }}>
                {item.title}
              </div>
              <div style={{ fontSize: 11.5, color: c.sec }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 14,
          paddingTop: 12,
          borderTop: `1px solid ${c.line}`,
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          fontSize: 13,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: c.ok,
            boxShadow: `0 0 0 4px ${c.ok}33`,
          }}
        />
        <span style={{ color: c.sec }}>Инженерные системы работают штатно</span>
      </div>
    </Card>
  );
}

export function TodayTab() {
  const c = useColors();
  const { dark, toggleTheme } = useTheme();
  const { go, switchTab, openSheet } = useNav();
  const { bill } = useData();

  return (
    <div>
      {/* ---- кинематографичный герой: башня во всю ширину ---- */}
      <div style={{ position: 'relative', margin: '0 0 4px' }}>
        <Scene
          image="tower"
          position="62% 30%"
          zoom
          gradient="linear-gradient(180deg, rgba(15,9,11,.5) 0%, rgba(15,9,11,.12) 38%, rgba(15,9,11,.9) 100%)"
          style={{ height: 340 }}
        />

        <FacadeMotif
          columns={24}
          color="#c76b6b"
          opacity={0.85}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 5 }}
        />

        <div
          style={{
            position: 'absolute',
            left: 20,
            right: 20,
            top: heroTop(20),
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            color: '#fff',
          }}
        >
          <button
            onClick={toggleTheme}
            style={{
              background: 'rgba(255,255,255,.14)',
              backdropFilter: 'blur(8px)',
              border: 'none',
              borderRadius: 12,
              padding: '7px 12px',
              color: '#fff',
              fontSize: 12.5,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Icon name={dark ? 'sun' : 'moon'} size={15} color="#fff" />
            {dark ? 'День' : 'Вечер'}
          </button>

          <button
            onClick={() => go({ key: 'notifications' })}
            style={{
              position: 'relative',
              background: 'rgba(255,255,255,.14)',
              backdropFilter: 'blur(8px)',
              border: 'none',
              width: 38,
              height: 38,
              borderRadius: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="bell" size={18} color="#fff" />
            <span
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: c.live,
              }}
            />
          </button>
        </div>

        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 26, color: '#fff' }}>
          <div
            style={{
              fontSize: 12.5,
              letterSpacing: 2,
              textTransform: 'uppercase',
              opacity: 0.82,
              fontFamily: SERIF,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Icon name="moon" size={14} color="#fff" />
            Вечер · 18°, ясно
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
            Добрый вечер, Анна
          </div>
          <div style={{ fontSize: 14, opacity: 0.82, marginTop: 4 }}>
            Квартира готова к вашему возвращению
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px 30px' }}>
        {/* ---- главное действие ---- */}
        <button
          onClick={() => go({ key: 'coming' })}
          style={{
            width: '100%',
            background: c.accent,
            border: 'none',
            borderRadius: 20,
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            cursor: 'pointer',
            color: '#fff',
            textAlign: 'left',
            boxShadow: `0 12px 30px ${c.accent}44`,
            transition: 'transform .12s',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'rgba(255,255,255,.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 'none',
            }}
          >
            <Icon name="car" size={26} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.2 }}>Я еду домой</div>
            <div style={{ fontSize: 13, opacity: 0.9, marginTop: 1 }}>
              Дом подготовится к вашему приезду
            </div>
          </div>
          <Icon name="chevR" size={22} color="#fff" />
        </button>

        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <QuickAction icon="lock" label="Открыть дверь" onClick={() => openSheet({ key: 'doors' })} />
          <QuickAction icon="qr" label="Пропуск" onClick={() => go({ key: 'createPass' })} />
          <QuickAction icon="chat" label="Консьерж" onClick={() => switchTab('concierge')} />
          <QuickAction icon="star" label="Клуб" onClick={() => switchTab('club')} />
        </div>

        <SectionTitle action={{ label: 'Подробно', onClick: () => go({ key: 'residence' }) }}>
          Резиденция сейчас
        </SectionTitle>
        <ResidenceNow />

        {/* ---- лента дня ---- */}
        <SectionTitle>Ваш день</SectionTitle>

        <Card style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: `${c.accent}18`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="valet" size={18} color={c.accent} />
            </div>
            <div style={{ flex: 1, fontSize: 12, color: c.sec, fontWeight: 700, letterSpacing: 0.4 }}>
              ПОДАЧА АВТОМОБИЛЯ
            </div>
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                color: '#fff',
                background: c.accent,
                padding: '4px 10px',
                borderRadius: 8,
              }}
            >
              через 20 мин
            </span>
          </div>

          <div style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 600, letterSpacing: -0.2 }}>
            BMW iX будет подан
          </div>
          <div style={{ fontSize: 13.5, color: c.sec, marginTop: 2, marginBottom: 12 }}>
            19:30 · valet Дмитрий · подъезд А
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Button sm variant="soft" style={{ flex: 1 }} onClick={() => openSheet({ key: 'pickTime' })}>
              Изменить время
            </Button>
            <Button sm style={{ flex: 1 }} onClick={() => go({ key: 'carDetail' })}>
              Детали
            </Button>
          </div>
        </Card>

        <CompactDayCard
          icon="user"
          kicker="ГОСТЬ · 20:00"
          title="Мария Сокол"
          sub="Разовый пропуск · лобби и лифт"
          color={c.accent}
          onClick={() => go({ key: 'guestDetail' })}
        />

        <CompactDayCard
          icon="box"
          kicker="ДОСТАВКА · 16:42"
          title="Посылка от СДЭК"
          sub="На ресепшене · ячейка B-14"
          color={c.sec}
          onClick={() => go({ key: 'parcelDetail' })}
        />

        <Card onClick={() => go({ key: 'event' })} style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 13, alignItems: 'center' }}>
            <Scene
              image="lounge"
              gradient={false}
              style={{ width: 64, height: 64, borderRadius: 14, flex: 'none' }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11.5, color: c.accent, fontWeight: 700, letterSpacing: 0.3 }}>
                ЗАКРЫТЫЙ ПОКАЗ · 2 АВГ
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>«Расёмон» · Куросава</div>
              <div style={{ fontSize: 12.5, color: c.sec }}>20:00 · частный кинозал · 4 места</div>
            </div>
            <Icon name="chevR" size={18} color={c.faint} />
          </div>
        </Card>

        <CompactDayCard
          icon="card"
          kicker={bill.paid ? 'СЧЁТ · ОПЛАЧЕНО' : 'СЧЁТ ЗА ИЮЛЬ'}
          title="18 540 ₽"
          sub={bill.paid ? 'Оплачено · чек отправлен' : 'Оплатить до 10 августа'}
          color={bill.paid ? c.ok : c.warn}
          onClick={() => go({ key: 'bill' })}
        />

        <Button full variant="soft" style={{ marginTop: 6 }} onClick={() => go({ key: 'timeline' })}>
          Все события дня
        </Button>
      </div>
    </div>
  );
}
