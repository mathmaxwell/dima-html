import { useColors } from '../theme/ThemeContext';
import { bottom } from '../theme/safeArea';

/**
 * Шторка снизу. Затемнение закрывает её по нажатию, содержимое
 * прокручивается и не заезжает под жестовую полосу телефона.
 */
export function BottomSheet({ children, onClose }) {
  const c = useColors();

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 120,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15,12,8,.5)',
          animation: 'dkfade .25s ease',
        }}
      />

      <div
        style={{
          position: 'relative',
          background: c.card,
          borderRadius: '28px 28px 0 0',
          padding: '10px 20px 34px',
          paddingBottom: bottom(34),
          maxHeight: '86%',
          overflowY: 'auto',
          animation: 'dkup .32s cubic-bezier(.2,.8,.2,1)',
          boxShadow: '0 -10px 40px rgba(0,0,0,.3)',
        }}
      >
        {/* «ручка» для перетаскивания */}
        <div
          style={{
            width: 40,
            height: 5,
            borderRadius: 3,
            background: c.line,
            margin: '0 auto 14px',
          }}
        />
        {children}
      </div>
    </div>
  );
}

/** Модальное окно по центру экрана. */
export function CenterModal({ children, onClose }) {
  const c = useColors();

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 140,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15,12,8,.55)',
          animation: 'dkfade .25s ease',
        }}
      />

      <div
        style={{
          position: 'relative',
          background: c.card,
          borderRadius: 24,
          padding: 24,
          width: '100%',
          maxWidth: 330,
          animation: 'dkpop .32s cubic-bezier(.2,.9,.3,1)',
          boxShadow: '0 20px 50px rgba(0,0,0,.35)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Заголовок внутри шторки. */
export function SheetTitle({ children, sub, color, style }) {
  const c = useColors();
  return (
    <div style={style}>
      <div style={{ fontSize: 20, fontWeight: 700, color: color || c.text, marginBottom: sub ? 4 : 16 }}>
        {children}
      </div>
      {sub && <div style={{ fontSize: 13.5, color: c.sec, marginBottom: 16, lineHeight: 1.4 }}>{sub}</div>}
    </div>
  );
}

/** Крутящийся индикатор ожидания. */
export function Spinner({ size = 20, color, thickness = 2 }) {
  const c = useColors();
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `${thickness}px solid ${color || c.accent}`,
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'dkspin .7s linear infinite',
        flex: 'none',
      }}
    />
  );
}
