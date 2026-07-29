import { useState } from 'react';
import { useSession } from '../../store/SessionContext';
import { Splash } from './Splash';
import { PhoneStep } from './PhoneStep';
import { CodeStep } from './CodeStep';
import { ApartmentStep } from './ApartmentStep';
import { BiometryStep } from './BiometryStep';
import { PermissionsStep } from './PermissionsStep';

/**
 * Мастер входа. Номер телефона хранится здесь, а не в глобальном состоянии:
 * дальше онбординга он никому не нужен.
 */
export function Onboarding() {
  const { step, setStep } = useSession();
  const [phone, setPhone] = useState('');

  const restart = () => {
    setStep('phone');
  };

  switch (step) {
    case 'splash':
      return <Splash />;
    case 'phone':
      return <PhoneStep phone={phone} onPhoneChange={setPhone} />;
    case 'code':
      return <CodeStep phone={phone} onRestart={restart} />;
    case 'apartment':
      return <ApartmentStep />;
    case 'biometry':
      return <BiometryStep />;
    case 'permissions':
      return <PermissionsStep />;
    default:
      return null;
  }
}
