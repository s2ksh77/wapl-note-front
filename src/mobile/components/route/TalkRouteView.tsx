import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/mobile/constant/routes';

export const TalkRouteView: React.FC = () => {
  const NoteView = React.lazy(() => import('@mcomponents/NoteView'));
  const ChapterView = React.lazy(() => import('@mcomponents/ChapterView'));
  const PageView = React.lazy(() => import('@mcomponents/PageView'));
  const TagMenuView = React.lazy(() => import('@mcomponents/TagMenuView'));
  const TalkNoteView = React.lazy(() => import('@mcomponents/TalkNoteView'));

  return (
    <Routes>
      <Route path="/" element={<TalkNoteView />} />
      <Route path="/:chId">
        <Route index element={<NoteView />} />
        <Route path={`${ROUTES.CHAPTER}`} element={<ChapterView />} />
        <Route path={`${ROUTES.PAGE}`} element={<PageView />} />
        <Route path={`${ROUTES.TAG}`} element={<TagMenuView />} />
      </Route>
    </Routes>
  );
};
