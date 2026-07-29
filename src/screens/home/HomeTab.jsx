import { useColors } from '../../theme/ThemeContext';
import { SERIF } from '../../theme/palette';
import { Header } from '../../layout/Header';
import { useNav } from '../../store/NavContext';
import { useData } from '../../store/DataContext';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { Icon } from '../../ui/Icon';
import { MenuGroup, MenuRow } from '../../ui/MenuRow';

/** Схематичный план квартиры для превью цифрового двойника. */
function MiniPlan() {
  const c = useColors();
  const tiles = [
    { x: 10, y: 10, w: 150, h: 60 },
    { x: 164, y: 10, w: 116, h: 60 },
    { x: 10, y: 76, w: 90, h: 64 },
    { x: 104, y: 76, w: 56, h: 64, alert: true },
    { x: 164, y: 76, w: 116, h: 64 },
  ];

  return (
    <svg
      viewBox="0 0 290 150"
      width="100%"
      style={{ display: 'block', borderRadius: 12, background: c.chip, padding: 8 }}
    >
      {tiles.map((t, i) => (
        <rect
          key={i}
          x={t.x}
          y={t.y}
          width={t.w}
          height={t.h}
          rx={6}
          fill={t.alert ? `${c.err}18` : c.card}
          stroke={t.alert ? c.err : c.line}
          strokeWidth={1}
        />
      ))}
      <circle cx={150} cy={24} r={4} fill={c.accent2} />
      <circle cx={44} cy={96} r={4} fill={c.accent2} />
      <circle cx={146} cy={90} r={5} fill={c.err} style={{ animation: 'dkpulse 1.2s infinite' }} />
    </svg>
  );
}

export function HomeTab() {
  const c = useColors();
  const { go } = useNav();
  const { bill, home } = useData();

  return (
    <div>
      <Header greeting="Добрый вечер, Анна" />

      <div style={{ padding: '14px 20px 30px' }}>
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 34,
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          Дом
        </div>

        {/* цифровой двойник — главный блок раздела */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 11,
                background: `${c.accent}18`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="house" size={20} color={c.accent} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Цифровой двойник</div>
              <div style={{ fontSize: 12.5, color: c.sec }}>Живая карта вашей квартиры</div>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: c.err,
                background: `${c.err}1a`,
                padding: '4px 9px',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: c.err,
                  animation: 'dkpulse 1.2s infinite',
                }}
              />
              1 событие
            </span>
          </div>

          <MiniPlan />

          <Button full icon="map" style={{ marginTop: 12 }} onClick={() => go({ key: 'twin' })}>
            Открыть план квартиры
          </Button>
        </Card>

        {/* счёт */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12.5, color: c.sec, fontWeight: 600, letterSpacing: 0.2 }}>
            СЧЁТ ЗА ИЮЛЬ
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, margin: '6px 0 4px' }}>
            <div style={{ fontFamily: SERIF, fontSize: 38, fontWeight: 600, lineHeight: 1 }}>
              {bill.paid ? '0 ₽' : '18 540 ₽'}
            </div>
            {bill.paid ? (
              <span style={{ fontSize: 12.5, fontWeight: 700, color: c.ok, marginBottom: 6 }}>
                оплачено
              </span>
            ) : (
              <span style={{ fontSize: 12.5, color: c.warn, fontWeight: 600, marginBottom: 6 }}>
                до 10 августа
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            <Button
              sm
              style={{ flex: 1 }}
              disabled={bill.paid}
              onClick={() => go({ key: 'bill' })}
            >
              {bill.paid ? 'Оплачено' : 'Оплатить'}
            </Button>
            <Button sm variant="soft" style={{ flex: 1 }} onClick={() => go({ key: 'bill' })}>
              Детализация
            </Button>
          </div>
        </Card>

        <MenuGroup>
          <MenuRow icon="map" title="Цифровой двойник" sub="Живой план квартиры" onClick={() => go({ key: 'twin' })} />
          <MenuRow icon="house" title="Умная квартира" sub={`7 комнат · сцена «${home.scene}»`} onClick={() => go({ key: 'smart' })} />
          <MenuRow icon="thermo" title="Управление климатом" sub="22° · воздух отличный" onClick={() => go({ key: 'climate' })} />
          <MenuRow icon="video" title="Камеры" sub="4 камеры · приватный доступ" onClick={() => go({ key: 'cameras' })} />
          <MenuRow icon="card" title="Платежи" sub={`Автоплатёж ${bill.autopay ? 'вкл' : 'выкл'}`} onClick={() => go({ key: 'payments' })} />
          <MenuRow icon="doc" title="Паспорт квартиры" sub="Оборудование, гарантии, акты" onClick={() => go({ key: 'passport' })} />
          <MenuRow icon="leaf" title="Режим отсутствия" sub={home.away ? `включён до ${home.awayTo}` : 'выключен'} onClick={() => go({ key: 'away' })} />
          <MenuRow icon="bolt" title="Потребление ресурсов" sub="Свет, вода, отопление" onClick={() => go({ key: 'consume' })} />
          <MenuRow icon="wrench" title="Заявки и обслуживание" sub="1 открытая заявка" onClick={() => go({ key: 'requests' })} last />
        </MenuGroup>
      </div>
    </div>
  );
}
