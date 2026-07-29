import { useColors } from '../theme/ThemeContext';

/**
 * Переключатель. Гасит всплытие клика — он часто живёт внутри нажимаемой
 * карточки, и без этого нажатие уводило бы на другой экран.
 */
export function Switch({ on, onToggle }) {
  const c = useColors();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      style={{
        width: 50,
        height: 30,
        borderRadius: 16,
        border: 'none',
        cursor: 'pointer',
        flex: 'none',
        background: on ? c.ok : c.switchOff,
        position: 'relative',
        transition: 'background .22s',
        padding: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: on ? 23 : 3,
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,.3)',
          transition: 'left .22s',
        }}
      />
    </button>
  );
}
