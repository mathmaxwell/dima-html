import { FONT } from '../theme/palette';
import { Icon } from './Icon';

/**
 * Заглушка вместо фотографии: тёплый градиент в палитре комплекса.
 * Стоит там, где настоящего снимка нет — аватары, кадры с камер, превью.
 */

/** Пары цветов градиента; выбираются по seed, так что кадр стабилен. */
const GRADIENTS = [
  ['#c97b76', '#7a2a2f'],
  ['#b56a66', '#5c1f24'],
  ['#d0938c', '#9a4a44'],
  ['#a85a54', '#3a1518'],
  ['#c88a7e', '#7d3a36'],
  ['#b07a72', '#4f2a28'],
];

export function Photo({ seed = 0, label, style }) {
  const [from, to] = GRADIENTS[Math.abs(seed) % GRADIENTS.length];

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
        ...style,
      }}
    >
      {/* блик сверху справа — кадр перестаёт быть плоским */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(90% 70% at 75% 15%, rgba(255,255,255,.28), transparent 60%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(0deg, rgba(0,0,0,.28), transparent 55%)',
        }}
      />
      <div style={{ position: 'absolute', top: 8, right: 9, display: 'flex' }}>
        <Icon name="spark" size={14} color="rgba(255,255,255,.92)" />
      </div>

      {label && (
        <div
          style={{
            position: 'absolute',
            left: 11,
            bottom: 9,
            color: '#fff',
            fontSize: 11,
            fontWeight: 600,
            fontFamily: FONT,
            textShadow: '0 1px 4px rgba(0,0,0,.4)',
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
