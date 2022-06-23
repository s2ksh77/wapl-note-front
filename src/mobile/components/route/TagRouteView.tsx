import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/mobile/constant/routes';

export const TagRouteView: React.FC = () => {
  const ChapterView = React.lazy(() => import('@mcomponents/ChapterView'));
  const PageView = React.lazy(() => import('@mcomponents/PageView'));
  const TagMenuView = React.lazy(() => import('@mcomponents/TagMenuView'));

  return (
    <Routes>
      <Route path="/" element={<TagMenuView />} />
      <Route path={`${ROUTES.CHAPTER}`} element={<ChapterView />} />
      <Route path={`${ROUTES.PAGE}`} element={<PageView />} />
    </Routes>
  );
};
