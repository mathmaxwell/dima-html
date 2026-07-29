import { useColors } from '../../theme/ThemeContext';
import { FONT } from '../../theme/palette';
import { useSession } from '../../store/SessionContext';
import { Button } from '../../ui/Button';
import { AuthShell } from './AuthShell';

/** «+7» показан отдельной меткой, значит в поле вводят 10 цифр. */
const REQUIRED_DIGITS = 10;

export function PhoneStep({ phone, onPhoneChange }) {
  const c = useColors();
  const { setStep } = useSession();

  const valid = phone.replace(/\D/g, '').length >= REQUIRED_DIGITS;

  return (
    <AuthShell
      title="Вход"
      sub="Введите номер телефона, привязанный к квартире"
      onBack={() => setStep('splash')}
      footer={
        <Button full icon="chevR" disabled={!valid} onClick={() => setStep('code')}>
          Продолжить
        </Button>
      }
    >
      <div
        style={{
          background: c.card,
          border: `1px solid ${c.line}`,
          borderRadius: 16,
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ fontSize: 19, fontWeight: 600, color: c.sec }}>+7</span>
        <input
          value={phone}
          placeholder="999 000-00-00"
          inputMode="tel"
          onChange={(e) => onPhoneChange(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: FONT,
            fontSize: 19,
            fontWeight: 600,
            color: c.text,
            padding: '14px 0',
            letterSpacing: 0.5,
          }}
        />
      </div>

      <div style={{ marginTop: 14, fontSize: 12.5, color: c.faint, lineHeight: 1.5 }}>
        Продолжая, вы принимаете{' '}
        <span style={{ color: c.accent, fontWeight: 600 }}>условия сервиса</span> и{' '}
        <span style={{ color: c.accent, fontWeight: 600 }}>политику конфиденциальности</span>
      </div>
    </AuthShell>
  );
}
