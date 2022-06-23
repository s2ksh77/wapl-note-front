import React, { Suspense } from 'react';
import { Application } from '@wapl/sdk';
import { Header, useRoomStore } from '@wapl/core';
import { LoadingSpinner, styled } from '@wapl/ui';
import { StoreProvider } from '@wapl/note-core';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@mconstant/routes';
import NoteHeader from '@mcomponents/header/NoteHeader';
import Navigation from '@mcomponents/navigation/Navigation';
import { TagRouteView } from './mobile/components/route/TagRouteView';
import { SearchRouteView } from './mobile/components/route/SearchRouteView';
import { TalkRouteView } from './mobile/components/route/TalkRouteView';

const handleMount = () => {
  console.log('Mounted!');
};

const handleUnMount = () => {
  console.log('Unmounted!');
};

const handleOnError = (err, info, props) => {
  console.log('handleError!');
};

const AppContainer = () => {
  const roomStore = useRoomStore();

  // 각 컴포넌트 첫 렌더 시 화면 깜빡임 존재
  const NoteView = React.lazy(() => import('@mcomponents/NoteView'));
  const ChapterView = React.lazy(() => import('@mcomponents/ChapterView'));
  const PageView = React.lazy(() => import('@mcomponents/PageView'));

  return (
    <Application onMount={handleMount} onUnmount={handleUnMount} onError={handleOnError}>
      <StoreProvider>
        <Body>
          <Router basename={BASENAME}>
            <Suspense fallback={<LoadingSpinner />}>
              <Header>
                <NoteHeader />
              </Header>
              <Routes>
                <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.MY_NOTE} />} />
                <Route path={ROUTES.MY_NOTE} element={<NoteView />} />
                <Route path={`${ROUTES.TALK_NOTE}/*`} element={<TalkRouteView />} />
                <Route path={ROUTES.BOOKMARK} element={<ChapterView />} />
                <Route path={ROUTES.RECENT} element={<ChapterView />} />
                <Route path="/:navTab/*">
                  <Route path={`${ROUTES.CHAPTER}`} element={<ChapterView />} />
                  <Route path={`${ROUTES.PAGE}`} element={<PageView />} />
                  <Route path={`${ROUTES.TAG}/*`} element={<TagRouteView />} />
                  <Route path={`${ROUTES.SEARCH}/*`} element={<SearchRouteView />} />
                </Route>
              </Routes>
              <Navigation />
            </Suspense>
          </Router>
        </Body>
      </StoreProvider>
    </Application>
  );
};

export default AppContainer;

const Body = styled.div`
  height: 100%;
`;
