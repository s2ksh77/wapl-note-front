import React from 'react';
import { Application } from '@wapl/sdk';
import { Header, useRoomStore } from '@wapl/core';
import { styled } from '@wapl/ui';
import { StoreProvider, RootStore } from '@wapl/note-core';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES, SEARCH_CHAPTER, SEARCH_PAGE, SEARCH_TAG } from '@mconstant/routes';
import NoteHeader from '@mcomponents/header/NoteHeader';

const handleMount = () => {
  console.log('Mounted!');
};

const handleUnMount = () => {
  console.log('Unmounted!');
};

const handleOnError = (err, info, props) => {};

const rootStore = new RootStore();

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
      <StoreProvider value={rootStore}>
        <Header>
          <NoteHeader />
        </Header>
        <Body>
          <Router basename={BASENAME}>
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
          </Router>
        </Body>
      </StoreProvider>
    </Application>
  );
};

export default AppContainer;

const Body = styled.div`
  padding: 20px;
`;
