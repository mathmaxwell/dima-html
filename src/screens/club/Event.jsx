import { useColors } from '../../theme/ThemeContext';
import { SERIF } from '../../theme/palette';
import { HeroBackButton } from '../../layout/RouteScreen';
import { useNav } from '../../store/NavContext';
import { useData } from '../../store/DataContext';
import { Button } from '../../ui/Button';
import { KeyValue } from '../../ui/DetailList';
import { Icon } from '../../ui/Icon';
import { Scene } from '../../ui/Scene';

/** Закрытый показ: запись, гость, QR-билет. */
export function Event() {
  const c = useColors();
  const { back, openSheet, confirm, showToast } = useNav();
  const { event, setEvent } = useData();

  return (
    <div>
      <div style={{ padding: '10px 20px 40px' }}>
        <div
          style={{
            position: 'relative',
            height: 280,
            borderRadius: 24,
            overflow: 'hidden',
            marginBottom: 18,
          }}
        >
          <Scene image="lounge" zoom gradient={false} style={{ position: 'absolute', inset: 0 }} />
          <HeroBackButton onClick={back} left={14} dark />

          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(0deg,rgba(0,0,0,.75),transparent)',
              padding: '50px 20px 18px',
              color: '#fff',
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, opacity: 0.8 }}>
              ЗАКРЫТЫЙ ПОКАЗ
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 600, marginTop: 4 }}>
              «Расёмон»
            </div>
            <div style={{ fontSize: 14, opacity: 0.85 }}>Акира Куросава · 1950</div>
          </div>
        </div>

        <div style={{ fontSize: 14.5, color: c.sec, lineHeight: 1.5, marginBottom: 16 }}>
          Вечер японской классики с вводным словом киноведа и дегустацией саке. Только для
          резидентов и одного гостя.
        </div>

        <KeyValue
          rows={[
            ['Дата', '2 августа, 20:00'],
            ['Место', 'Частный кинозал, −1 этаж'],
            ['Дресс-код', 'Smart casual'],
            ['Свободно', '4 из 24 мест'],
            ['Гости', '+1 по приглашению'],
          ]}
        />

        {event.going && (
          <div
            style={{
              background: `${c.ok}16`,
              border: `1px solid ${c.ok}44`,
              borderRadius: 16,
              padding: '14px 16px',
              margin: '16px 0',
              display: 'flex',
              alignItems: 'center',
              gap: 11,
            }}
          >
            <Icon name="check" size={20} color={c.ok} />
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 700 }}>Вы участвуете</div>
              <div style={{ fontSize: 12.5, color: c.sec }}>
                {event.guest ? 'С гостем · 2 места' : '1 место'}
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 16 }}>
          {event.going ? (
            <>
              <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <Button
                  variant="soft"
                  icon="plus"
                  style={{ flex: 1 }}
                  disabled={event.guest}
                  onClick={() => {
                    setEvent({ guest: true });
                    showToast('Гость добавлен', { icon: 'check', tone: 'ok' });
                  }}
                >
                  {event.guest ? 'Гость добавлен' : 'Добавить гостя'}
                </Button>
                <Button
                  icon="qr"
                  style={{ flex: 1 }}
                  onClick={() => openSheet({ key: 'qr', data: { name: '«Расёмон» · 2 авг' } })}
                >
                  QR-билет
                </Button>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <Button
                  variant="ghost"
                  style={{ flex: 1 }}
                  disabled={event.inCalendar}
                  onClick={() => {
                    setEvent({ inCalendar: true });
                    showToast('Добавлено в календарь', { icon: 'calendar' });
                  }}
                >
                  {event.inCalendar ? 'В календаре' : 'В календарь'}
                </Button>
                <Button
                  variant="danger"
                  style={{ flex: 1 }}
                  onClick={() =>
                    confirm({
                      title: 'Отказаться от участия?',
                      text: 'Место освободится для других резидентов',
                      okLabel: 'Отказаться',
                      danger: true,
                      onOk: () => {
                        setEvent({ going: false, guest: false, inCalendar: false });
                        showToast('Вы отказались', { icon: 'x', tone: 'err' });
                      },
                    })
                  }
                >
                  Отказаться
                </Button>
              </div>
            </>
          ) : (
            <Button
              full
              onClick={() => {
                setEvent({ going: true });
                showToast('Вы записаны на показ', { icon: 'check', tone: 'ok' });
              }}
            >
              Участвовать
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
