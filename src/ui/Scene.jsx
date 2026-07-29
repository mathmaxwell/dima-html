import { useColors } from '../theme/ThemeContext';
import { FONT } from '../theme/palette';
import { imageOf } from '../assets/images';
import { Icon } from './Icon';

/** Затемнение по умолчанию: снизу плотное, к верху сходит на нет. */
const DEFAULT_GRADIENT = 'linear-gradient(0deg, rgba(20,10,10,.55), rgba(20,10,10,.05) 55%)';

/**
 * Фотография комплекса с кинематографичной обработкой: кадрирование,
 * градиент поверх, необязательный медленный наезд.
 *
 * @param {string} image        — имя из assets/images
 * @param {string} label        — подпись в левом нижнем углу
 * @param {string} position     — background-position кадра
 * @param {boolean} zoom        — медленный наезд
 * @param {string|false} gradient — своё затемнение либо false, чтобы убрать
 * @param {string} tint         — цветной фильтр поверх (умножением)
 * @param {boolean} spark       — метка «подобрано для вас» в углу
 */
export function Scene({
  image,
  label,
  position = 'center',
  zoom = false,
  gradient,
  tint,
  spark = false,
  style,
  children,
}) {
  const c = useColors();

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: c.photo, ...style }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${imageOf(image)})`,
          backgroundSize: 'cover',
          backgroundPosition: position,
          animation: zoom ? 'dkzoomslow 12s ease-out forwards' : 'none',
        }}
      />

      {gradient !== false && (
        <div style={{ position: 'absolute', inset: 0, background: gradient || DEFAULT_GRADIENT }} />
      )}

      {tint && (
        <div style={{ position: 'absolute', inset: 0, background: tint, mixBlendMode: 'multiply' }} />
      )}

      {spark && (
        <div style={{ position: 'absolute', top: 9, right: 10, display: 'flex' }}>
          <Icon name="spark" size={14} color="rgba(255,255,255,.9)" />
        </div>
      )}

      {label && (
        <div
          style={{
            position: 'absolute',
            left: 12,
            bottom: 10,
            color: '#fff',
            fontSize: 12,
            fontWeight: 600,
            fontFamily: FONT,
            textShadow: '0 1px 6px rgba(0,0,0,.5)',
          }}
        >
          {label}
        </div>
      )}

      {children}
    </div>
  );
}
