import { EDITORIAL, SERIF, FONT } from '../../theme/palette';
import { bottom, heroTop } from '../../theme/safeArea';
import { IMAGES } from '../../assets/images';
import { useSession } from '../../store/SessionContext';
import { FacadeMotif } from '../../ui/FacadeMotif';
import { Icon } from '../../ui/Icon';

/**
 * Заставка. Ночная башня с медленным отъездом камеры и «загорающимися»
 * окнами — первое, что видит житель. Нажатие в любом месте ведёт ко входу.
 */
export function Splash() {
  const { setStep, startDemo } = useSession();

  return (
    <div
      onClick={() => setStep('phone')}
      style={{
        flex: 1,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        background: '#0e0a0c',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${IMAGES.tower})`,
          backgroundSize: 'cover',
          backgroundPosition: '62% center',
          animation: 'dkzoom 6s ease-out forwards',
        }}
      />

      {/* тёплое свечение окон, разгорается вслед за отъездом камеры */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '8%',
          width: 170,
          height: 340,
          background: 'radial-gradient(closest-side, rgba(208,110,90,.5), transparent 70%)',
          filter: 'blur(14px)',
          animation: 'dklight 3.2s ease-in forwards',
          mixBlendMode: 'screen',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(12,8,10,.35) 0%, rgba(12,8,10,.15) 40%, rgba(12,8,10,.82) 100%)',
        }}
      />

      <FacadeMotif
        columns={22}
        color="#c76b6b"
        opacity={0.85}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 6 }}
      />

      <div
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 34,
          paddingTop: heroTop(34),
          paddingBottom: bottom(40),
          color: '#fff',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 11,
            animation: 'dkrise .9s ease both',
          }}
        >
          <FacadeMotif
            columns={4}
            color="#d98a86"
            opacity={1}
            style={{ width: 22, height: 24, borderRadius: 3 }}
          />
          <div
            style={{
              fontFamily: SERIF,
              fontSize: 23,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            Дом Кино
          </div>
        </div>

        <div>
          <div
            style={{
              fontFamily: EDITORIAL,
              fontSize: 44,
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: -0.5,
              animation: 'dkrise 1.2s ease both',
            }}
          >
            Дом,
            <br />
            опережающий
            <br />
            время
          </div>

          <div
            style={{
              marginTop: 18,
              fontSize: 14.5,
              opacity: 0.8,
              fontWeight: 500,
              letterSpacing: 0.2,
              animation: 'dkrise 1.6s ease both',
            }}
          >
            Доступ, сервис и привилегии — в одной цифровой среде
          </div>

          <div
            style={{
              marginTop: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              opacity: 0.92,
              fontSize: 13,
              letterSpacing: 0.3,
              animation: 'dkpulse 2.4s infinite 1.8s',
            }}
          >
            Нажмите, чтобы войти
            <Icon name="chevR" size={16} color="#fff" />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation(); // иначе сработает переход ко входу
              startDemo();
            }}
            style={{
              marginTop: 22,
              background: 'rgba(255,255,255,.14)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,.25)',
              borderRadius: 14,
              padding: '13px 18px',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: FONT,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              animation: 'dkrise 2s ease both',
            }}
          >
            <Icon name="film" size={18} color="#fff" />
            Демонстрация концепции
          </button>
        </div>
      </div>
    </div>
  );
}
