import { useColors } from '../../theme/ThemeContext';
import { EDITORIAL, SERIF } from '../../theme/palette';
import { HeroBackButton } from '../../layout/RouteScreen';
import { useNav } from '../../store/NavContext';
import { useData, PREPARE_ITEMS } from '../../store/DataContext';
import { Button } from '../../ui/Button';
import { Icon } from '../../ui/Icon';
import { Scene } from '../../ui/Scene';
import { Switch } from '../../ui/Switch';

const money = (value) => `${value.toLocaleString('ru')} ₽`;

/**
 * «Подготовить квартиру» — один запрос превращается в план из услуг.
 * Позиции можно отключать, итог пересчитывается на лету.
 */
export function Prepare() {
  const c = useColors();
  const { back, go, switchTab, scrollTop } = useNav();
  const { prepare, togglePrepareItem, confirmPrepare } = useData();

  const { disabled, done } = prepare;
  const total = PREPARE_ITEMS.filter((i) => !disabled[i.key]).reduce((sum, i) => sum + i.cost, 0);

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <Scene
          image="lounge"
          gradient="linear-gradient(180deg, rgba(15,9,11,.4), rgba(15,9,11,.9))"
          style={{ height: 190 }}
        />
        <HeroBackButton onClick={back} />

        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 20, color: '#fff' }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: 'uppercase',
              opacity: 0.8,
              fontFamily: SERIF,
              fontWeight: 500,
            }}
          >
            Запрос консьержу
          </div>
          <div style={{ fontFamily: EDITORIAL, fontSize: 30, fontWeight: 500, marginTop: 2 }}>
            Подготовить квартиру
          </div>
        </div>
      </div>

      <div style={{ padding: '18px 20px 40px' }}>
        {/* исходная просьба жителя, как в переписке */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
          <div
            style={{
              maxWidth: '85%',
              background: c.inv,
              color: c.invText,
              borderRadius: '18px 18px 4px 18px',
              padding: '13px 16px',
              fontSize: 14.5,
              lineHeight: 1.45,
            }}
          >
            Мы возвращаемся в воскресенье вечером. Подготовьте квартиру к нашему приезду.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            marginBottom: 16,
            fontSize: 12.5,
            color: c.sec,
          }}
        >
          <Icon name="spark" size={15} color={c.accent} />
          {done ? 'План выполняется' : 'Екатерина собрала план — проверьте и подтвердите'}
        </div>

        {PREPARE_ITEMS.map((item) => {
          const off = disabled[item.key];
          return (
            <div
              key={item.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 13,
                background: c.card,
                border: `1px solid ${c.line}`,
                borderRadius: 16,
                padding: '13px 15px',
                marginBottom: 10,
                opacity: off ? 0.5 : 1,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 11,
                  background: done ? `${c.ok}1e` : c.chip,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 'none',
                }}
              >
                <Icon name={done ? 'check' : item.icon} size={20} color={done ? c.ok : c.accent} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{item.title}</div>
                <div style={{ fontSize: 12.5, color: c.sec }}>
                  {done ? `Ответственный назначен · ${item.sub}` : item.sub}
                </div>
              </div>

              {!done && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 700, color: off ? c.faint : c.text }}>
                    {item.cost ? money(item.cost) : '—'}
                  </span>
                  <Switch on={!off} onToggle={() => togglePrepareItem(item.key)} />
                </div>
              )}
            </div>
          );
        })}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 4px 4px',
            marginTop: 6,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 600, color: c.sec }}>Итого</span>
          <span style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 600 }}>{money(total)}</span>
        </div>

        {done ? (
          <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
            <Button variant="soft" style={{ flex: 1 }} onClick={() => go({ key: 'chat' })}>
              Написать Екатерине
            </Button>
            <Button style={{ flex: 1 }} onClick={() => switchTab('today')}>
              На главную
            </Button>
          </div>
        ) : (
          <Button
            full
            icon="check"
            style={{ marginTop: 12 }}
            onClick={() => {
              confirmPrepare();
              scrollTop();
            }}
          >
            {`Подтвердить план · ${money(total)}`}
          </Button>
        )}
      </div>
    </div>
  );
}
