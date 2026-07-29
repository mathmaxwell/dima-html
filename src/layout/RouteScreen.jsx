import { heroTop } from '../theme/safeArea';
import { Icon } from '../ui/Icon';
import { TopSpacer } from './AppShell';
import { SubHeader } from './Header';

/**
 * Обычный внутренний экран: отступ сверху, шапка с кнопкой «назад»,
 * содержимое с полями.
 */
export function RouteScreen({ title, right, children }) {
  return (
    <div>
      <TopSpacer />
      <SubHeader title={title} right={right} />
      <div style={{ padding: '10px 20px 40px' }}>{children}</div>
    </div>
  );
}

/**
 * Кнопка «назад», наложенная на полноэкранное фото.
 * Опускается ниже чёлки телефона за счёт safe-area.
 */
export function HeroBackButton({ onClick, left = 18, top = 14, dark = false }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        left,
        top: heroTop(top),
        background: dark ? 'rgba(0,0,0,.4)' : 'rgba(255,255,255,.15)',
        backdropFilter: 'blur(8px)',
        border: 'none',
        width: 40,
        height: 40,
        borderRadius: 12,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon name="chevL" size={20} color="#fff" />
    </button>
  );
}
