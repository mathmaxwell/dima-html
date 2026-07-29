import { useCallback, useEffect, useRef, useState } from 'react';
import { useColors } from '../../theme/ThemeContext';
import { FONT } from '../../theme/palette';
import { useNav } from '../../store/NavContext';
import { useSession } from '../../store/SessionContext';
import { Button } from '../../ui/Button';
import { AuthShell } from './AuthShell';

const RESEND_SECONDS = 45;
const KEYPAD = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];
/** Демонстрационный «неверный» код — чтобы показать состояние ошибки. */
const WRONG_CODE = '0000';

export function CodeStep({ phone, onRestart }) {
  const c = useColors();
  const { setStep } = useSession();
  const { showToast } = useNav();

  const [digits, setDigits] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [resendIn, setResendIn] = useState(RESEND_SECONDS);
  const timer = useRef(null);

  const startCountdown = useCallback(() => {
    clearInterval(timer.current);
    setResendIn(RESEND_SECONDS);
    timer.current = setInterval(() => {
      setResendIn((s) => {
        if (s <= 1) {
          clearInterval(timer.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startCountdown();
    return () => clearInterval(timer.current);
  }, [startCountdown]);

  const tapKey = (key) => {
    setError(false);
    setDigits((prev) => {
      const next = [...prev];
      if (key === '⌫') {
        for (let i = next.length - 1; i >= 0; i -= 1) {
          if (next[i] !== '') {
            next[i] = '';
            break;
          }
        }
      } else {
        for (let i = 0; i < next.length; i += 1) {
          if (next[i] === '') {
            next[i] = key;
            break;
          }
        }
      }
      return next;
    });
  };

  const complete = digits.every((d) => d !== '');

  const submit = () => {
    if (digits.join('') === WRONG_CODE) setError(true);
    else setStep('apartment');
  };

  return (
    <AuthShell
      title="Код из СМС"
      sub={`Отправили код на +7 ${phone || '999 000-00-00'}`}
      onBack={onRestart}
      footer={
        <>
          <Button full disabled={!complete} onClick={submit}>
            {complete ? 'Подтвердить' : 'Введите код'}
          </Button>
          <div
            onClick={onRestart}
            style={{
              textAlign: 'center',
              marginTop: 14,
              fontSize: 13.5,
              color: c.sec,
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Изменить номер
          </div>
        </>
      }
    >
      <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
        {digits.map((d, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 64,
              borderRadius: 16,
              border: `1.5px solid ${error ? c.err : d ? c.accent : c.line}`,
              background: c.card,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              fontWeight: 700,
              color: c.text,
              transition: 'border .2s',
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {error && (
        <div style={{ color: c.err, fontSize: 13, fontWeight: 500, marginBottom: 14 }}>
          Неверный код. Попробуйте ещё раз.
        </div>
      )}

      {/* Своя клавиатура: системная перекрыла бы половину экрана */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
        {KEYPAD.map((key, i) =>
          key === '' ? (
            <div key={i} />
          ) : (
            <button
              key={i}
              onClick={() => tapKey(key)}
              style={{
                height: 52,
                borderRadius: 14,
                border: 'none',
                background: c.card,
                fontFamily: FONT,
                fontSize: 20,
                fontWeight: 600,
                color: c.text,
                cursor: 'pointer',
              }}
            >
              {key}
            </button>
          )
        )}
      </div>

      <div style={{ marginTop: 18, textAlign: 'center', fontSize: 13.5, color: c.sec }}>
        {resendIn > 0 ? (
          `Повторная отправка через ${resendIn} с`
        ) : (
          <span
            onClick={() => {
              startCountdown();
              showToast('Код отправлен повторно', { icon: 'check' });
            }}
            style={{ color: c.accent, fontWeight: 600, cursor: 'pointer' }}
          >
            Отправить код повторно
          </span>
        )}
      </div>
    </AuthShell>
  );
}
