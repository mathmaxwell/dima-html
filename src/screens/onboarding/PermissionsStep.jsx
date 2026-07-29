import { useState } from 'react';
import { useColors } from '../../theme/ThemeContext';
import { useSession } from '../../store/SessionContext';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { Icon } from '../../ui/Icon';
import { Switch } from '../../ui/Switch';
import { AuthShell } from './AuthShell';

const PERMISSIONS = [
  { key: 'notif', icon: 'bell', title: 'Уведомления', sub: 'Гости, доставки, статусы заявок' },
  { key: 'ble', icon: 'wifi', title: 'Bluetooth', sub: 'Открытие дверей рядом с домом' },
  { key: 'cam', icon: 'video', title: 'Камера', sub: 'Сканирование QR-кодов' },
  { key: 'geo', icon: 'map', title: 'Геолокация', sub: 'Автосценарии «дома» и «ушли»' },
];

export function PermissionsStep() {
  const c = useColors();
  const { setStep } = useSession();
  const [granted, setGranted] = useState({ notif: true, ble: true, cam: false, geo: false });

  return (
    <AuthShell
      title="Разрешения"
      sub="Их можно изменить в любой момент в профиле"
      onBack={() => setStep('biometry')}
      footer={
        <Button full icon="check" onClick={() => setStep('done')}>
          Всё готово
        </Button>
      }
    >
      {PERMISSIONS.map((p) => (
        <Card key={p.key} pad={14} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 13,
                background: c.chip,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 'none',
              }}
            >
              <Icon name={p.icon} size={22} color={c.accent} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{p.title}</div>
              <div style={{ color: c.sec, fontSize: 12.5, marginTop: 2, lineHeight: 1.35 }}>
                {p.sub}
              </div>
            </div>

            <Switch
              on={granted[p.key]}
              onToggle={() => setGranted((g) => ({ ...g, [p.key]: !g[p.key] }))}
            />
          </div>
        </Card>
      ))}
    </AuthShell>
  );
}
