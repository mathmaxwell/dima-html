import { useColors } from '../../theme/ThemeContext';
import { useNav } from '../../store/NavContext';
import { Button } from '../../ui/Button';
import { Icon } from '../../ui/Icon';
import { CenterModal } from '../../ui/Overlay';
import { Photo } from '../../ui/Photo';
import { Scene } from '../../ui/Scene';

/** Диалог «да/нет». */
function ConfirmModal({ modal }) {
  const c = useColors();
  const { closeModal } = useNav();

  return (
    <>
      <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 8 }}>{modal.title}</div>
      {modal.text && (
        <div style={{ fontSize: 14.5, color: c.sec, lineHeight: 1.45, marginBottom: 20 }}>
          {modal.text}
        </div>
      )}

      <div style={{ display: 'flex', gap: 10 }}>
        <Button variant="soft" style={{ flex: 1 }} onClick={closeModal}>
          Отмена
        </Button>
        <Button
          variant={modal.danger ? 'danger' : 'primary'}
          style={{
            flex: 1,
            ...(modal.danger ? { background: c.err, color: '#fff', border: 'none' } : {}),
          }}
          onClick={() => {
            closeModal();
            modal.onOk?.();
          }}
        >
          {modal.okLabel || 'Подтвердить'}
        </Button>
      </div>
    </>
  );
}

/** Экран успеха: галочка, текст и необязательная приписка или карточка человека. */
function SuccessModal({ modal }) {
  const c = useColors();
  const { closeModal } = useNav();

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: `${c.ok}22`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '6px auto 16px',
        }}
      >
        <Icon name="check" size={34} color={c.ok} />
      </div>

      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{modal.title}</div>

      {modal.text ? (
        <div style={{ fontSize: 14.5, color: c.sec, lineHeight: 1.45, marginBottom: 20 }}>
          {modal.text}
        </div>
      ) : (
        <div style={{ height: 8 }} />
      )}

      {modal.note && (
        <div
          style={{
            background: c.chip,
            borderRadius: 14,
            padding: '12px 14px',
            fontSize: 13,
            color: c.sec,
            textAlign: 'left',
          }}
        >
          {modal.note}
        </div>
      )}

      {modal.person && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 11,
            background: c.chip,
            borderRadius: 14,
            padding: '12px 14px',
            textAlign: 'left',
          }}
        >
          <Photo
            seed={modal.person.seed}
            style={{ width: 40, height: 40, borderRadius: '50%', flex: 'none' }}
          />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{modal.person.name}</div>
            <div style={{ fontSize: 12, color: c.sec }}>{modal.person.role}</div>
          </div>
        </div>
      )}

      <Button
        full
        style={{ marginTop: 6 }}
        onClick={() => {
          closeModal();
          modal.onOk?.();
        }}
      >
        {modal.okLabel || 'Готово'}
      </Button>
    </div>
  );
}

/** Ожидание проведения платежа. */
function PayingModal() {
  const c = useColors();

  return (
    <div style={{ textAlign: 'center', padding: '8px 0' }}>
      <div
        style={{
          width: 48,
          height: 48,
          border: `3px solid ${c.line}`,
          borderTopColor: c.accent,
          borderRadius: '50%',
          animation: 'dkspin .8s linear infinite',
          margin: '0 auto 18px',
        }}
      />
      <div style={{ fontSize: 17, fontWeight: 700 }}>Платёж обрабатывается</div>
      <div style={{ fontSize: 14, color: c.sec, marginTop: 6 }}>Подтверждаем оплату…</div>
    </div>
  );
}

/** Прямой эфир с камеры. */
function CameraModal({ modal }) {
  const c = useColors();
  const { closeModal } = useNav();

  return (
    <>
      <div style={{ position: 'relative', height: 200, borderRadius: 16, overflow: 'hidden', marginBottom: 14 }}>
        <Scene image={modal.data.image} gradient={false} style={{ position: 'absolute', inset: 0 }} />
        <div
          style={{
            position: 'absolute',
            left: 10,
            top: 10,
            background: 'rgba(224,72,60,.9)',
            color: '#fff',
            fontSize: 10,
            fontWeight: 700,
            padding: '4px 8px',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#fff',
              animation: 'dkpulse 1s infinite',
            }}
          />
          LIVE
        </div>
      </div>

      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 2 }}>{modal.data.name}</div>
      <div style={{ fontSize: 13, color: c.sec, marginBottom: 16 }}>
        Прямой эфир · запись включена
      </div>

      <Button full variant="soft" onClick={closeModal}>
        Закрыть
      </Button>
    </>
  );
}

/** Реестр модальных окон: ключ из openModal({ key }) → компонент. */
const MODALS = {
  confirm: ConfirmModal,
  success: SuccessModal,
  paying: PayingModal,
  camera: CameraModal,
};

/** Показывает открытое модальное окно, если оно есть. */
export function ModalHost() {
  const { modal, closeModal } = useNav();
  if (!modal) return null;

  const Component = MODALS[modal.key];
  return (
    <CenterModal onClose={closeModal}>
      {Component ? <Component modal={modal} /> : <div>—</div>}
    </CenterModal>
  );
}
