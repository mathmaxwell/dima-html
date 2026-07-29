import { useColors } from '../../theme/ThemeContext';
import { pressHandlers } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { Icon } from '../../ui/Icon';

/** Квадратная кнопка быстрого действия под главным блоком «Сегодня». */
export function QuickAction({ icon, label, onClick }) {
  const c = useColors();

  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        background: c.card,
        border: `1px solid ${c.line}`,
        borderRadius: 18,
        padding: '14px 6px 12px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        color: c.text,
        transition: 'transform .12s',
      }}
      {...pressHandlers(0.95)}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          background: c.chip,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={icon} size={20} color={c.accent} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 600, textAlign: 'center', lineHeight: 1.15 }}>
        {label}
      </span>
    </button>
  );
}

/** Компактная карточка события дня: иконка, надзаголовок, название, подпись. */
export function CompactDayCard({ icon, kicker, title, sub, onClick, color }) {
  const c = useColors();
  const tone = color || c.accent;

  return (
    <Card onClick={onClick} style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: `${tone}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none',
          }}
        >
          <Icon name={icon} size={20} color={tone} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: c.sec, fontWeight: 700, letterSpacing: 0.3 }}>
            {kicker}
          </div>
          <div style={{ fontSize: 15.5, fontWeight: 700, marginTop: 1 }}>{title}</div>
          <div style={{ fontSize: 12.5, color: c.sec }}>{sub}</div>
        </div>

        <Icon name="chevR" size={17} color={c.faint} />
      </div>
    </Card>
  );
}
