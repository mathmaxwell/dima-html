import { useColors } from '../../theme/ThemeContext';
import { SERIF } from '../../theme/palette';
import { RouteScreen } from '../../layout/RouteScreen';
import { useNav } from '../../store/NavContext';
import { useData } from '../../store/DataContext';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { ActionList, KeyValue, Notice } from '../../ui/DetailList';
import { Icon } from '../../ui/Icon';
import { MenuGroup, MenuRow } from '../../ui/MenuRow';
import { Switch } from '../../ui/Switch';

/** Счёт за месяц с расшифровкой и оплатой. */
export function Bill() {
  const c = useColors();
  const { switchTab, showToast } = useNav();
  const { bill, payBill, toggleAutopay } = useData();

  return (
    <RouteScreen title="Счёт за июль">
      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 600 }}>
          {bill.paid ? '0 ₽' : '18 540 ₽'}
        </div>
        <div
          style={{
            fontSize: 13.5,
            color: bill.paid ? c.ok : c.warn,
            fontWeight: 600,
            marginTop: 2,
          }}
        >
          {bill.paid ? 'Оплачено · чек отправлен' : 'К оплате до 10 августа · +4% к июню'}
        </div>
      </Card>

      <KeyValue
        rows={[
          ['Содержание дома', '7 200 ₽'],
          ['Охрана', '2 400 ₽'],
          ['Коммунальные услуги', '4 180 ₽'],
          ['Паркинг (2 места)', '3 000 ₽'],
          ['Дополнительные услуги', '1 760 ₽'],
        ]}
      />

      <Notice icon="bolt" tone={c.warn} style={{ marginTop: 14, alignItems: 'flex-start' }}>
        Рост на 4% — из-за увеличенного расхода воды 19–21 июля
      </Notice>

      {bill.paid ? (
        <ActionList
          items={[
            {
              icon: 'doc',
              label: 'Скачать чек',
              onClick: () => showToast('Чек сохранён в файлы', { icon: 'check', tone: 'ok' }),
            },
            { icon: 'chat', label: 'Задать вопрос', onClick: () => switchTab('concierge') },
          ]}
        />
      ) : (
        <>
          <div style={{ marginTop: 16, marginBottom: 10, fontSize: 13, fontWeight: 600, color: c.sec }}>
            СПОСОБ ОПЛАТЫ
          </div>

          <MenuGroup>
            <MenuRow
              icon="card"
              title="Карта ···4821"
              sub="Visa · основная"
              last
              right={
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: c.ok,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon name="check" size={14} color="#fff" />
                </div>
              }
            />
          </MenuGroup>

          <Button full onClick={payBill}>
            Оплатить 18 540 ₽
          </Button>

          <button
            onClick={toggleAutopay}
            style={{
              marginTop: 12,
              width: '100%',
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 4px',
              cursor: 'pointer',
              color: c.text,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 500 }}>Включить автоплатёж</span>
            <Switch on={bill.autopay} onToggle={toggleAutopay} />
          </button>
        </>
      )}
    </RouteScreen>
  );
}
