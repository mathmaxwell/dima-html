import { useColors } from '../../theme/ThemeContext';
import { RouteScreen } from '../../layout/RouteScreen';
import { useNav } from '../../store/NavContext';
import { ActionList, KeyValue, Notice } from '../../ui/DetailList';
import { Icon } from '../../ui/Icon';
import { Photo } from '../../ui/Photo';
import { StatusTag } from '../../ui/MenuRow';

/** Крупное фото-заглушка в шапке экрана детали. */
function DetailHero({ seed, label }) {
  return <Photo seed={seed} label={label} style={{ height: 180, borderRadius: 20, marginBottom: 16 }} />;
}

/** Подача автомобиля из паркинга. */
export function CarDetail() {
  const { back, openSheet, openModal, confirm, showToast } = useNav();

  return (
    <RouteScreen title="Подача автомобиля">
      <DetailHero seed={1} label="BMW iX · паркинг −2" />

      <KeyValue
        rows={[
          ['Автомобиль', 'BMW iX'],
          ['Время подачи', '19:30'],
          ['Статус', 'В пути к подъезду'],
          ['Valet', 'Дмитрий'],
        ]}
      />

      <Notice icon="clock" style={{ marginTop: 14, fontSize: 14, fontWeight: 600 }}>
        Будет у подъезда А через 20 минут
      </Notice>

      <ActionList
        items={[
          { icon: 'clock', label: 'Изменить время', onClick: () => openSheet({ key: 'pickTime' }) },
          {
            icon: 'phone',
            label: 'Позвонить valet',
            onClick: () => showToast('Звоним Дмитрию…', { icon: 'phone' }),
          },
          {
            icon: 'check',
            label: 'Подтвердить получение',
            onClick: () =>
              openModal({
                key: 'success',
                title: 'Автомобиль передан',
                text: 'Хорошей дороги, Анна',
                onOk: back,
              }),
          },
          {
            icon: 'x',
            label: 'Отменить подачу',
            danger: true,
            onClick: () =>
              confirm({
                title: 'Отменить подачу?',
                text: 'BMW iX вернётся на парковочное место',
                okLabel: 'Отменить',
                danger: true,
                onOk: () => {
                  showToast('Подача отменена', { icon: 'x', tone: 'err' });
                  back();
                },
              }),
          },
        ]}
      />
    </RouteScreen>
  );
}

/** Гостевой пропуск: кто, когда и куда может войти. */
export function GuestDetail() {
  const c = useColors();
  const { back, openSheet, switchTab, confirm, showToast } = useNav();

  return (
    <RouteScreen title="Гостевой пропуск">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <Photo seed={2} style={{ width: 64, height: 64, borderRadius: '50%', flex: 'none' }} />
        <div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>Мария Сокол</div>
          <div style={{ fontSize: 14, color: c.sec }}>Гость · сегодня 20:00–23:00</div>
        </div>
      </div>

      <KeyValue
        rows={[
          ['Тип доступа', 'Разовый'],
          ['Зоны', 'Лобби, лифт, этаж 12'],
          ['Действует', 'Сегодня до 23:00'],
          ['Автомобиль', 'Не указан'],
        ]}
      />

      <ActionList
        items={[
          {
            icon: 'qr',
            label: 'Открыть QR-код',
            onClick: () => openSheet({ key: 'qr', data: { name: 'Мария Сокол' } }),
          },
          {
            icon: 'clock',
            label: 'Продлить доступ',
            onClick: () => showToast('Доступ продлён до 01:00', { icon: 'check', tone: 'ok' }),
          },
          {
            icon: 'share',
            label: 'Отправить повторно',
            onClick: () => openSheet({ key: 'qr', data: { name: 'Мария Сокол' } }),
          },
          { icon: 'chat', label: 'Связаться с консьержем', onClick: () => switchTab('concierge') },
          {
            icon: 'x',
            label: 'Отозвать пропуск',
            danger: true,
            onClick: () =>
              confirm({
                title: 'Отозвать пропуск?',
                text: 'Мария больше не сможет войти',
                okLabel: 'Отозвать',
                danger: true,
                onOk: () => {
                  showToast('Пропуск отозван', { icon: 'x', tone: 'err' });
                  back();
                },
              }),
          },
        ]}
      />
    </RouteScreen>
  );
}

/** Посылка на ресепшене — что с ней делать. */
export function ParcelDetail() {
  const { back, openModal, showToast } = useNav();

  return (
    <RouteScreen title="Посылка">
      <DetailHero seed={6} label="Упаковка · СДЭК" />

      <KeyValue
        rows={[
          ['Служба', 'СДЭК'],
          ['Получена', 'Сегодня в 16:42'],
          ['Хранение', 'Ресепшен, ячейка B-14'],
          ['Размер', 'Небольшая коробка'],
        ]}
      />

      <ActionList
        items={[
          {
            icon: 'user',
            label: 'Заберу сам',
            onClick: () => showToast('Отметили: заберёте лично', { icon: 'check', tone: 'ok' }),
          },
          {
            icon: 'house',
            label: 'Доставить в квартиру',
            onClick: () =>
              openModal({
                key: 'success',
                title: 'Посылку принесут',
                text: 'Консьерж поднимет посылку в течение часа',
                onOk: back,
              }),
          },
          {
            icon: 'car',
            label: 'Передать водителю',
            onClick: () => showToast('Водитель заберёт посылку', { icon: 'check', tone: 'ok' }),
          },
          {
            icon: 'phone',
            label: 'Связаться с ресепшеном',
            onClick: () => showToast('Звоним на ресепшен…', { icon: 'phone' }),
          },
        ]}
      />
    </RouteScreen>
  );
}

/** Подтверждённый заказ клининга. */
export function CleanDetail() {
  const c = useColors();
  const { back, openSheet, switchTab, confirm, showToast } = useNav();

  return (
    <RouteScreen title="Заказ · клининг">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <Photo seed={4} style={{ width: 56, height: 56, borderRadius: 16, flex: 'none' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 19, fontWeight: 700 }}>Генеральная уборка</div>
          <div style={{ fontSize: 13.5, color: c.sec }}>Завтра, 15:00 · 3 часа</div>
        </div>
        <StatusTag color={c.ok} style={{ padding: '5px 10px', borderRadius: 9 }}>
          подтверждён
        </StatusTag>
      </div>

      <KeyValue
        rows={[
          ['Исполнитель', 'Мария (знакомый)'],
          ['Стоимость', '6 500 ₽'],
          ['Оплата', 'С карты ···4821'],
        ]}
      />

      <ActionList
        items={[
          { icon: 'clock', label: 'Перенести', onClick: () => openSheet({ key: 'pickTime' }) },
          { icon: 'chat', label: 'Написать исполнителю', onClick: () => switchTab('concierge') },
          {
            icon: 'doc',
            label: 'Посмотреть состав услуги',
            onClick: () => openSheet({ key: 'cleanScope' }),
          },
          {
            icon: 'spark',
            label: 'Повторить как в прошлый раз',
            onClick: () => showToast('Повторили прошлый заказ', { icon: 'check', tone: 'ok' }),
          },
          {
            icon: 'x',
            label: 'Отменить',
            danger: true,
            onClick: () =>
              confirm({
                title: 'Отменить уборку?',
                text: 'Заказ на завтра будет отменён',
                okLabel: 'Отменить',
                danger: true,
                onOk: () => {
                  showToast('Уборка отменена', { icon: 'x', tone: 'err' });
                  back();
                },
              }),
          },
        ]}
      />
    </RouteScreen>
  );
}

/** Лента всех событий дня. */
export function Timeline() {
  const c = useColors();

  const items = [
    ['08:10', 'Няня вошла через главный вход', 'user', c.accent],
    ['09:30', 'Автомобиль выехал из паркинга', 'car', c.sec],
    ['16:42', 'Получена посылка СДЭК', 'box', c.accent],
    ['17:05', 'Оплата паркинга прошла', 'card', c.ok],
    ['19:30', 'Подача BMW iX', 'valet', c.accent],
    ['20:00', 'Ожидается гость — Мария', 'user', c.warn],
  ];

  return (
    <RouteScreen title="События дня">
      {items.map(([time, label, icon, color], i) => {
        const last = i === items.length - 1;
        return (
          <div key={time + label} style={{ display: 'flex', gap: 14, paddingBottom: last ? 0 : 18 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 11,
                  background: c.chip,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 'none',
                }}
              >
                <Icon name={icon} size={19} color={color} />
              </div>
              {!last && <div style={{ width: 2, flex: 1, background: c.line, marginTop: 6 }} />}
            </div>

            <div style={{ paddingTop: 2 }}>
              <div style={{ fontSize: 12.5, color: c.sec, fontWeight: 600 }}>{time}</div>
              <div style={{ fontSize: 15, fontWeight: 500, marginTop: 2 }}>{label}</div>
            </div>
          </div>
        );
      })}
    </RouteScreen>
  );
}
