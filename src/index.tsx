import React, { Suspense } from 'react';
import { Application } from '@wapl/sdk';
import { Header, useRoomStore } from '@wapl/core';
import { LoadingSpinner, styled } from '@wapl/ui';
import { StoreProvider } from '@wapl/note-core';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES, SEARCH_CHAPTER, SEARCH_PAGE, SEARCH_TAG } from '@mconstant/routes';
import NoteHeader from '@mcomponents/header/NoteHeader';
import Navigation from '@mcomponents/navigation/Navigation';

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
  const SearchView = React.lazy(() => import('@mcomponents/SearchView'));
  const TagMenuView = React.lazy(() => import('@mcomponents/TagMenuView'));
  const TalkNoteView = React.lazy(() => import('@mcomponents/TalkNoteView'));

  return (
    <Application onMount={handleMount} onUnmount={handleUnMount} onError={handleOnError}>
      <StoreProvider>
        <Header>
          <NoteHeader />
        </Header>
        <Body>
          <Router basename={BASENAME}>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.MY_NOTE} />} />
                <Route path={ROUTES.MY_NOTE} element={<NoteView />} />
                <Route path={ROUTES.TALK_NOTE} element={<TalkNoteView />} />
                <Route path={ROUTES.BOOKMARK} element={<ChapterView />} />
                <Route path={ROUTES.RECENT} element={<ChapterView />} />
                <Route path={`/:navTab${ROUTES.CHAPTER_DETAIL}`} element={<ChapterView />} />
                <Route path={`/:navTab${ROUTES.PAGE_DETAIL}`} element={<PageView />} />
                <Route path={`/:navTab${ROUTES.TAG_DETAIL}`} element={<TagMenuView />} />
                <Route path={`/:navTab${ROUTES.SEARCH_DETAIL}`} element={<SearchView />} />
                <Route path={`/:navTab${SEARCH_CHAPTER}`} element={<ChapterView />} />
                <Route path={`/:navTab${SEARCH_PAGE}`} element={<PageView />} />
                <Route path={`/:navTab${SEARCH_TAG}`} element={<TagMenuView />} />
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
  // editor 영역에 영향을 주고 있어서, 우선 주석처리 했어요 죄송합니다.
  // padding: 20px;
  height: 100%;
`;
