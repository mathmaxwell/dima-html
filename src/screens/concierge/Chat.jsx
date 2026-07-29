import { useState } from 'react';
import { useColors } from '../../theme/ThemeContext';
import { FONT } from '../../theme/palette';
import { bottom } from '../../theme/safeArea';
import { TopSpacer } from '../../layout/AppShell';
import { useIconButtonStyle } from '../../layout/Header';
import { useNav } from '../../store/NavContext';
import { useData } from '../../store/DataContext';
import { Button } from '../../ui/Button';
import { Icon } from '../../ui/Icon';
import { Photo } from '../../ui/Photo';

/** Одно сообщение переписки. Свои — справа и инверсным цветом. */
function Bubble({ message, showQuoteActions, onConfirm }) {
  const c = useColors();
  const { showToast } = useNav();
  const mine = message.who === 'me';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: mine ? 'flex-end' : 'flex-start',
        marginBottom: 12,
      }}
    >
      <div style={{ maxWidth: '78%' }}>
        <div
          style={{
            background: mine ? c.inv : c.card,
            color: mine ? c.invText : c.text,
            border: mine ? 'none' : `1px solid ${c.line}`,
            borderRadius: mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
            padding: '12px 15px',
            fontSize: 14.5,
            lineHeight: 1.45,
          }}
        >
          {message.text}
        </div>

        {/* смета от консьержа — её нужно подтвердить */}
        {showQuoteActions && (
          <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Button sm icon="check" onClick={onConfirm}>
              Подтвердить
            </Button>
            <Button
              sm
              variant="soft"
              onClick={() => showToast('Напишите правки в чат', { icon: 'chat' })}
            >
              Изменить
            </Button>
            <Button
              sm
              variant="ghost"
              onClick={() => showToast('Подключаем консьержа Екатерину', { icon: 'phone' })}
            >
              Позвать человека
            </Button>
          </div>
        )}

        {message.confirmed && (
          <div
            style={{
              marginTop: 8,
              fontSize: 12.5,
              color: c.ok,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Icon name="check" size={15} color={c.ok} />
            Заказ подтверждён · 18 500 ₽
          </div>
        )}
      </div>
    </div>
  );
}

/** Переписка с консьержем. */
export function Chat() {
  const c = useColors();
  const { back, showToast } = useNav();
  const { chat, chatConfirmed, chatScrollRef, sendChatMessage, confirmChatQuote } = useData();
  const [draft, setDraft] = useState('');
  const iconBtn = useIconButtonStyle();

  const send = () => {
    sendChatMessage(draft);
    setDraft('');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopSpacer />

      <div
        style={{
          padding: '0 18px 12px',
          flex: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          borderBottom: `1px solid ${c.line}`,
        }}
      >
        <button onClick={back} style={iconBtn}>
          <Icon name="chevL" size={20} />
        </button>

        <div style={{ position: 'relative' }}>
          <Photo seed={2} style={{ width: 40, height: 40, borderRadius: '50%' }} />
          <span
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: c.ok,
              border: `2px solid ${c.bg}`,
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15.5, fontWeight: 700 }}>Екатерина</div>
          <div style={{ fontSize: 12, color: c.ok }}>на связи</div>
        </div>

        <button onClick={() => showToast('Звоним…', { icon: 'phone' })} style={iconBtn}>
          <Icon name="phone" size={18} color={c.accent} />
        </button>
      </div>

      <div className="dk-scroll" ref={chatScrollRef} style={{ flex: 1, padding: '16px 18px' }}>
        <div style={{ textAlign: 'center', fontSize: 12, color: c.faint, marginBottom: 16 }}>
          Сегодня
        </div>
        {chat.map((message, i) => (
          <Bubble
            key={i}
            message={message}
            showQuoteActions={message.quote && !chatConfirmed}
            onConfirm={confirmChatQuote}
          />
        ))}
      </div>

      <div
        style={{
          flex: 'none',
          padding: '10px 14px 30px',
          paddingBottom: bottom(30),
          borderTop: `1px solid ${c.line}`,
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <input
          value={draft}
          placeholder="Сообщение…"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          style={{
            flex: 1,
            background: c.card,
            border: `1px solid ${c.line}`,
            borderRadius: 22,
            padding: '13px 18px',
            fontFamily: FONT,
            fontSize: 15,
            color: c.text,
            outline: 'none',
          }}
        />
        <button
          onClick={send}
          style={{
            width: 46,
            height: 46,
            borderRadius: '50%',
            background: c.inv,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none',
          }}
        >
          <Icon name="share" size={20} color={c.invText} />
        </button>
      </div>
    </div>
  );
}
