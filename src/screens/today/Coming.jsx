import { useColors } from '../../theme/ThemeContext';
import { EDITORIAL, SERIF } from '../../theme/palette';
import { HeroBackButton } from '../../layout/RouteScreen';
import { useNav } from '../../store/NavContext';
import { useData, COMING_STEPS } from '../../store/DataContext';
import { Button } from '../../ui/Button';
import { Icon } from '../../ui/Icon';
import { Spinner } from '../../ui/Overlay';
import { Scene } from '../../ui/Scene';
import { Switch } from '../../ui/Switch';

/**
 * «Я еду домой» — дом готовится к возвращению.
 *
 * Шаги можно отключать до запуска; после нажатия сценарий проигрывается
 * сам, подсвечивая текущий шаг.
 */
export function Coming() {
  const c = useColors();
  const { back, openSheet } = useNav();
  const { coming, toggleComingStep, runComing } = useData();

  const { disabled, running, done, activeIndex } = coming;
  const active = activeIndex ?? -1;

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <Scene
          image="tower"
          position="62% 40%"
          gradient="linear-gradient(180deg, rgba(15,9,11,.5), rgba(15,9,11,.92))"
          style={{ height: 200 }}
        />
        <HeroBackButton onClick={back} />

        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 22, color: '#fff' }}>
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
            Сценарий возвращения
          </div>
          <div style={{ fontFamily: EDITORIAL, fontSize: 32, fontWeight: 500, marginTop: 4 }}>
            {done ? 'Всё готово к приезду' : 'Я еду домой'}
          </div>
        </div>
      </div>

      <div style={{ padding: '18px 20px 40px' }}>
        {done ? (
          <div
            style={{
              background: `${c.ok}16`,
              border: `1px solid ${c.ok}44`,
              borderRadius: 16,
              padding: '15px 16px',
              marginBottom: 18,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: c.ok,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 'none',
              }}
            >
              <Icon name="check" size={22} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Дом подготовлен</div>
              <div style={{ fontSize: 12.5, color: c.sec }}>
                Всё будет готово к вашему приезду в 19:40
              </div>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: 14, color: c.sec, lineHeight: 1.5, marginBottom: 18 }}>
            Дом Кино оркеструет сервисы к вашему возвращению. Отключите ненужное и запустите
            сценарий.
          </div>
        )}

        <div style={{ position: 'relative' }}>
          {COMING_STEPS.map((step, i) => {
            const off = disabled[step.key];
            const isActive = running && active === i;
            const isDone = (running && active > i) || done;
            const last = i === COMING_STEPS.length - 1;

            return (
              <div
                key={step.key}
                style={{
                  display: 'flex',
                  gap: 14,
                  paddingBottom: last ? 0 : 16,
                  opacity: off ? 0.4 : 1,
                  transition: 'opacity .3s',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: isDone ? c.ok : isActive ? c.accent : c.chip,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 'none',
                      transition: 'background .3s',
                      boxShadow: isActive ? `0 0 0 5px ${c.accent}22` : 'none',
                    }}
                  >
                    {isActive ? (
                      <Spinner size={18} color="#fff" />
                    ) : (
                      <Icon
                        name={isDone ? 'check' : step.icon}
                        size={20}
                        color={isDone ? '#fff' : off ? c.faint : c.accent}
                      />
                    )}
                  </div>

                  {!last && (
                    <div
                      style={{
                        width: 2,
                        flex: 1,
                        minHeight: 16,
                        background: isDone ? c.ok : c.line,
                        marginTop: 4,
                        transition: 'background .3s',
                      }}
                    />
                  )}
                </div>

                <div
                  style={{
                    flex: 1,
                    paddingTop: 5,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 10,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{step.title}</div>
                    <div style={{ fontSize: 12.5, color: c.sec, marginTop: 1 }}>{step.sub}</div>
                  </div>

                  {/* время прибытия отключить нельзя — это факт, а не услуга */}
                  {!running && !done && step.key !== 'eta' && (
                    <Switch on={!off} onToggle={() => toggleComingStep(step.key)} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 22 }}>
          {done ? (
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="soft" style={{ flex: 1 }} onClick={back}>
                На главную
              </Button>
              <Button style={{ flex: 1 }} onClick={() => openSheet({ key: 'pickTime' })}>
                Изменить время
              </Button>
            </div>
          ) : running ? (
            <Button full disabled>
              Подготовка дома…
            </Button>
          ) : (
            <Button full icon="car" onClick={runComing}>
              Запустить сценарий
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
