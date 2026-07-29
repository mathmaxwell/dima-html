import { useColors } from '../../theme/ThemeContext';
import { FONT, SERIF } from '../../theme/palette';
import { Header, useIconButtonStyle } from '../../layout/Header';
import { useNav } from '../../store/NavContext';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { Icon } from '../../ui/Icon';
import { MenuGroup, MenuRow, StatusTag } from '../../ui/MenuRow';
import { Photo } from '../../ui/Photo';
import { Scene } from '../../ui/Scene';
import { SectionTitle } from '../../ui/SectionTitle';

/** Быстрые услуги. Уборка и техпомощь ведут на свои экраны, остальное — на общий бланк. */
const SERVICES = [
  { icon: 'spark', label: 'Уборка', route: 'cleaning' },
  { icon: 'dumbbell', label: 'Массаж' },
  { icon: 'bag', label: 'Прачечная' },
  { icon: 'leaf', label: 'Продукты' },
  { icon: 'flower', label: 'Цветы' },
  { icon: 'wrench', label: 'Техпомощь', route: 'techhelp' },
  { icon: 'user', label: 'Няня' },
  { icon: 'car', label: 'Транспорт' },
  { icon: 'ticket', label: 'Рестораны' },
  { icon: 'more', label: 'Другое' },
];

export function ConciergeTab() {
  const c = useColors();
  const { go, showToast } = useNav();
  const iconBtn = useIconButtonStyle();

  const openService = (service) => {
    if (service.route) go({ key: service.route });
    else go({ key: 'orderTemplate', data: { title: service.label, icon: service.icon } });
  };

  return (
    <div>
      <Header greeting="Добрый вечер, Анна" />

      <div style={{ padding: '14px 20px 30px' }}>
        {/* карточка личного консьержа */}
        <Card style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <div style={{ position: 'relative', flex: 'none' }}>
              <Photo seed={2} style={{ width: 54, height: 54, borderRadius: '50%' }} />
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: c.ok,
                  border: `2.5px solid ${c.card}`,
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Екатерина</div>
              <div style={{ fontSize: 13, color: c.sec }}>
                Ваш консьерж · на связи · отвечает ~2 мин
              </div>
            </div>

            <button
              onClick={() => showToast('Звоним консьержу…', { icon: 'phone' })}
              style={iconBtn}
            >
              <Icon name="phone" size={19} color={c.accent} />
            </button>
          </div>

          <button
            onClick={() => go({ key: 'chat' })}
            style={{
              marginTop: 14,
              width: '100%',
              background: c.chip,
              border: `1px solid ${c.line}`,
              borderRadius: 14,
              padding: '15px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              color: c.sec,
              fontFamily: FONT,
              fontSize: 15,
            }}
          >
            Что для вас сделать?
            <Icon name="chat" size={20} color={c.accent} />
          </button>
        </Card>

        {/* комплексный сценарий */}
        <SectionTitle>Подготовить квартиру</SectionTitle>
        <div
          onClick={() => go({ key: 'prepare' })}
          style={{
            borderRadius: 20,
            overflow: 'hidden',
            cursor: 'pointer',
            position: 'relative',
            border: `1px solid ${c.line}`,
          }}
        >
          <Scene
            image="lounge"
            gradient="linear-gradient(90deg, rgba(15,9,11,.82), rgba(15,9,11,.15))"
            style={{ height: 150 }}
          />
          <div
            style={{
              position: 'absolute',
              left: 18,
              right: 18,
              top: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 600 }}>
              Комплексный сценарий
            </div>
            <div style={{ fontSize: 13, opacity: 0.9, marginTop: 3, maxWidth: 220, lineHeight: 1.4 }}>
              Уборка, продукты, климат, цветы и авто — одним запросом
            </div>
            <div style={{ marginTop: 12 }}>
              <Button
                sm
                style={{ background: '#fff', color: '#241417' }}
                onClick={() => go({ key: 'prepare' })}
              >
                Собрать план
              </Button>
            </div>
          </div>
        </div>

        <SectionTitle>Быстрые сценарии</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {SERVICES.map((service) => (
            <button
              key={service.label}
              onClick={() => openService(service)}
              style={{
                background: c.card,
                border: `1px solid ${c.line}`,
                borderRadius: 16,
                padding: '16px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 11,
                cursor: 'pointer',
                color: c.text,
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 11,
                  background: c.chip,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 'none',
                }}
              >
                <Icon name={service.icon} size={19} color={c.accent} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{service.label}</span>
            </button>
          ))}
        </div>

        <SectionTitle action={{ label: 'Все', onClick: () => go({ key: 'requests' }) }}>
          Активные запросы
        </SectionTitle>
        <MenuGroup>
          <MenuRow
            icon="spark"
            title="Клининг"
            sub="Завтра 15:00 · Мария"
            onClick={() => go({ key: 'cleanDetail' })}
            right={<StatusTag color={c.ok}>подтверждён</StatusTag>}
          />
          <MenuRow
            icon="leaf"
            title="Доставка продуктов"
            sub="Воскресенье, утро"
            onClick={() => go({ key: 'orderTemplate', data: { title: 'Продукты', icon: 'leaf' } })}
            right={<StatusTag color={c.warn}>комплектуется</StatusTag>}
          />
          <MenuRow
            icon="wrench"
            title="Инженер"
            sub="Кондиционер · сегодня"
            onClick={() => go({ key: 'techhelp' })}
            right={<StatusTag color={c.accent}>в пути</StatusTag>}
            last
          />
        </MenuGroup>

        <Button full variant="soft" onClick={() => go({ key: 'regular' })}>
          Регулярные услуги
        </Button>
      </div>
    </div>
  );
}
