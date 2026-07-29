import { BOTTOM_PAD } from '../theme/safeArea';
import { TopSpacer } from '../layout/AppShell';
import { TabBar } from '../layout/TabBar';
import { RouteScreen } from '../layout/RouteScreen';
import { useNav } from '../store/NavContext';
import { DemoBar } from './demo/DemoBar';
import { SheetHost } from './sheets';
import { ModalHost } from './modals';
import { TAB_SCREENS, ROUTE_SCREENS, FULLSCREEN_ROUTES, BLEED_TABS } from './routes';

/** Заглушка для ещё не сделанного экрана. */
function UnknownRoute({ route }) {
  return (
    <RouteScreen title={route.title || 'Экран'}>
      <div style={{ padding: 40, textAlign: 'center' }}>Экран в разработке</div>
    </RouteScreen>
  );
}

/** Содержимое вкладки. Полноэкранные вкладки не получают отступ сверху. */
function TabContent({ tab }) {
  const Screen = TAB_SCREENS[tab];
  return (
    <div>
      {!BLEED_TABS.has(tab) && <TopSpacer />}
      <Screen />
    </div>
  );
}

/**
 * Основное приложение после входа: вкладка или внутренний экран,
 * а поверх — шторки, модальные окна и панель демонстрации.
 */
export function MainApp() {
  const { tab, route, scrollRef } = useNav();

  const RouteComponent = route ? ROUTE_SCREENS[route.key] : null;

  // Домофон рисует себя во весь экран сам — без общей прокручиваемой обёртки.
  if (route && FULLSCREEN_ROUTES.has(route.key)) {
    return (
      <>
        <RouteComponent data={route.data} />
        <SheetHost />
        <ModalHost />
        <DemoBar />
      </>
    );
  }

  return (
    <>
      <div
        // ключ заставляет React пересоздать область при смене экрана,
        // иначе не проигрывается анимация появления
        key={route ? `r-${route.key}` : `t-${tab}`}
        className="dk-scroll"
        ref={scrollRef}
        style={{
          flex: 1,
          animation: route ? 'dkslidein .3s ease' : 'dkscreen .3s ease',
          // без таб-бара низ экрана упирается в жестовую полосу телефона
          paddingBottom: route ? BOTTOM_PAD : 0,
        }}
      >
        {route ? (
          RouteComponent ? (
            <RouteComponent data={route.data} />
          ) : (
            <UnknownRoute route={route} />
          )
        ) : (
          <TabContent tab={tab} />
        )}
      </div>

      {!route && <TabBar />}

      <SheetHost />
      <ModalHost />
      <DemoBar />
    </>
  );
}
