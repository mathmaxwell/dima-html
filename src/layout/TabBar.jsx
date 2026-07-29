import { useColors } from '../theme/ThemeContext';
import { bottom } from '../theme/safeArea';
import { useNav } from '../store/NavContext';
import { Icon } from '../ui/Icon';

/** Пять разделов приложения. */
export const TABS = [
  { key: 'today', label: 'Сегодня', icon: 'home' },
  { key: 'access', label: 'Доступ', icon: 'key' },
  { key: 'concierge', label: 'Консьерж', icon: 'chat' },
  { key: 'home', label: 'Дом', icon: 'house' },
  { key: 'club', label: 'Клуб', icon: 'star' },
];

/**
 * Нижняя навигация. Высота не задана жёстко: снизу добавляется отступ под
 * жестовую полосу телефона, поэтому бар одинаково хорошо смотрится
 * и в браузере, и в полноэкранном режиме.
 */
export function TabBar() {
  const c = useColors();
  const { tab, switchTab } = useNav();

  return (
    <div
      style={{
        flex: 'none',
        borderTop: `1px solid ${c.line}`,
        background: c.barBg,
        backdropFilter: 'blur(20px)',
        display: 'flex',
        padding: '8px 6px 0',
        paddingBottom: bottom(10),
      }}
    >
      {TABS.map(({ key, label, icon }) => {
        const active = tab === key;
        return (
          <button
            key={key}
            onClick={() => switchTab(key)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5,
              padding: '6px 0',
              color: active ? c.text : c.faint,
              transition: 'color .2s',
            }}
          >
            <Icon name={icon} size={23} color={active ? c.accent : c.faint} />
            <span style={{ fontSize: 10.5, fontWeight: active ? 700 : 500 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
