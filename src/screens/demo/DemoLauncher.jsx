import { EDITORIAL, FONT, SERIF } from '../../theme/palette';
import { TopSpacer } from '../../layout/AppShell';
import { useNav } from '../../store/NavContext';
import { useData } from '../../store/DataContext';
import { useSession } from '../../store/SessionContext';
import { FacadeMotif } from '../../ui/FacadeMotif';
import { Icon } from '../../ui/Icon';
import { Scene } from '../../ui/Scene';
import { DEMO_SCENARIOS } from './scenarios';

/** Список демонстрационных сценариев — точка входа в демо-режим. */
export function DemoLauncher() {
  const nav = useNav();
  const data = useData();
  const { pickScenario, exitDemo } = useSession();

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0e0a0c' }}>
      <TopSpacer />

      <div className="dk-scroll" style={{ flex: 1, padding: '8px 22px 30px', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <FacadeMotif
            columns={4}
            color="#d98a86"
            opacity={1}
            style={{ width: 22, height: 24, borderRadius: 3 }}
          />
          <div
            style={{
              fontFamily: SERIF,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Дом Кино
          </div>
        </div>

        <div style={{ fontFamily: EDITORIAL, fontSize: 34, fontWeight: 500, lineHeight: 1.05, marginTop: 8 }}>
          Демонстрация концепции
        </div>
        <div style={{ fontSize: 14, opacity: 0.7, marginTop: 8, marginBottom: 22, lineHeight: 1.5 }}>
          Выберите сценарий — приложение откроется на нужном экране с подготовленными данными.
        </div>

        {DEMO_SCENARIOS.map((scenario, i) => (
          <button
            key={scenario.name}
            onClick={() => {
              pickScenario(scenario.name);
              scenario.open(nav, data);
            }}
            style={{
              width: '100%',
              marginBottom: 12,
              borderRadius: 18,
              overflow: 'hidden',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              padding: 0,
              textAlign: 'left',
              height: 96,
            }}
          >
            <Scene
              image={scenario.image}
              gradient="linear-gradient(90deg, rgba(15,9,11,.86), rgba(15,9,11,.35))"
              style={{ position: 'absolute', inset: 0 }}
            />
            <div
              style={{
                position: 'relative',
                padding: '16px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                height: '100%',
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontFamily: SERIF,
                  fontWeight: 600,
                  flex: 'none',
                }}
              >
                {i + 1}
              </div>
              <div style={{ flex: 1, color: '#fff' }}>
                <div style={{ fontSize: 16.5, fontWeight: 700 }}>{scenario.name}</div>
                <div style={{ fontSize: 12.5, opacity: 0.85, marginTop: 2 }}>
                  {scenario.description}
                </div>
              </div>
              <Icon name="chevR" size={20} color="#fff" />
            </div>
          </button>
        ))}

        <button
          onClick={exitDemo}
          style={{
            width: '100%',
            marginTop: 6,
            background: 'rgba(255,255,255,.1)',
            border: 'none',
            borderRadius: 14,
            padding: 14,
            color: '#fff',
            fontSize: 14.5,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: FONT,
          }}
        >
          Выйти из демо-режима
        </button>
      </div>
    </div>
  );
}
