import { RouteScreen } from '../../layout/RouteScreen';
import { useNav } from '../../store/NavContext';
import { useData } from '../../store/DataContext';
import { Button } from '../../ui/Button';
import { ChipGroup, ToggleChip } from '../../ui/Chips';
import { Field, PickerButton, TextInput, ToggleCardRow } from '../../ui/Field';
import { Switch } from '../../ui/Switch';

const PASS_TYPES = [
  { value: 'guest', label: 'Гость' },
  { value: 'courier', label: 'Курьер' },
  { value: 'staff', label: 'Персонал' },
  { value: 'contractor', label: 'Подрядчик' },
];

const ZONES = ['Лобби', 'Лифт', 'Паркинг', 'Этаж 12'];

/** Форма создания пропуска: кто, когда и куда может пройти. */
export function CreatePass() {
  const { openSheet } = useNav();
  const { pass, setPass, togglePassZone } = useData();

  return (
    <RouteScreen title="Создать пропуск">
      <Field label="Тип">
        <ChipGroup
          options={PASS_TYPES}
          value={pass.type}
          onChange={(type) => setPass({ type })}
        />
      </Field>

      <Field label="Имя гостя">
        <TextInput
          value={pass.name}
          placeholder="Например, Мария Сокол"
          onChange={(name) => setPass({ name })}
        />
      </Field>

      <Field label="Телефон">
        <TextInput
          value={pass.phone}
          placeholder="+7 999 000-00-00"
          inputMode="tel"
          onChange={(phone) => setPass({ phone })}
        />
      </Field>

      <div style={{ display: 'flex', gap: 10 }}>
        <Field label="Дата" style={{ flex: 1 }}>
          <PickerButton
            value={pass.date}
            icon="calendar"
            onClick={() => openSheet({ key: 'pickDate' })}
          />
        </Field>
        <Field label="Время" style={{ flex: 1 }}>
          <PickerButton
            value="19:30–23:00"
            icon="clock"
            onClick={() => openSheet({ key: 'pickTime' })}
          />
        </Field>
      </div>

      <Field label="Разрешённые зоны">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {ZONES.map((zone) => (
            <ToggleChip
              key={zone}
              label={zone}
              active={pass.zones.includes(zone)}
              onClick={() => togglePassZone(zone)}
            />
          ))}
        </div>
      </Field>

      <ToggleCardRow
        icon="car"
        label="Добавить автомобиль гостя"
        onClick={() => setPass({ withCar: !pass.withCar })}
        style={{ marginBottom: 14 }}
      >
        <Switch on={pass.withCar} onToggle={() => setPass({ withCar: !pass.withCar })} />
      </ToggleCardRow>

      {pass.withCar && (
        <Field label="Гос. номер">
          <TextInput
            value={pass.carNumber}
            placeholder="А123ВС 777"
            onChange={(carNumber) => setPass({ carNumber })}
          />
        </Field>
      )}

      <Button
        full
        icon="qr"
        disabled={!pass.name}
        style={{ marginTop: 6 }}
        onClick={() => openSheet({ key: 'qr', data: { name: pass.name || 'Гость' } })}
      >
        Создать пропуск
      </Button>
    </RouteScreen>
  );
}
