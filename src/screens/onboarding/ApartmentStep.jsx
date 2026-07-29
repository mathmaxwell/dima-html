import { useState } from 'react';
import { useColors } from '../../theme/ThemeContext';
import { useNav } from '../../store/NavContext';
import { useSession } from '../../store/SessionContext';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { Icon } from '../../ui/Icon';
import { Photo } from '../../ui/Photo';
import { AuthShell } from './AuthShell';

/** Резиденции, привязанные к номеру телефона. */
const RESIDENCES = [
  { id: 'dk', title: 'Дом Кино · квартира 1204', sub: 'Тверская, Москва', seed: 5 },
  { id: 'country', title: 'Загородный дом', sub: 'Резиденция «Лесная»', seed: 2, unavailable: true },
];

export function ApartmentStep() {
  const c = useColors();
  const { setStep } = useSession();
  const { showToast } = useNav();
  const [selected, setSelected] = useState(null);

  const pick = (residence) => {
    if (residence.unavailable) {
      setSelected('dk');
      showToast('Эта резиденция пока недоступна в демоверсии', { icon: 'lock' });
      return;
    }
    setSelected(residence.id);
  };

  return (
    <AuthShell
      title="Выберите резиденцию"
      sub="К вашему номеру привязаны:"
      onBack={() => setStep('code')}
      footer={
        <Button full icon="chevR" disabled={!selected} onClick={() => setStep('biometry')}>
          Продолжить
        </Button>
      }
    >
      {RESIDENCES.map((r) => {
        const active = selected === r.id;
        return (
          <Card
            key={r.id}
            onClick={() => pick(r)}
            style={{
              marginBottom: 12,
              border: `${active ? '1.5px' : '1px'} solid ${active ? c.accent : c.line}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Photo
                seed={r.seed}
                style={{ width: 52, height: 52, borderRadius: 14, flex: 'none' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{r.title}</div>
                <div style={{ color: c.sec, fontSize: 13, marginTop: 2 }}>{r.sub}</div>
              </div>

              {active ? (
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: c.ok,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon name="check" size={15} color="#fff" />
                </div>
              ) : (
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: `2px solid ${c.line}`,
                  }}
                />
              )}
            </div>
          </Card>
        );
      })}
    </AuthShell>
  );
}
