import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/mobile/constant/routes';

export const SearchRouteView: React.FC = () => {
  const ChapterView = React.lazy(() => import('@mcomponents/ChapterView'));
  const PageView = React.lazy(() => import('@mcomponents/PageView'));
  const SearchView = React.lazy(() => import('@mcomponents/SearchView'));
  const TagMenuView = React.lazy(() => import('@mcomponents/TagMenuView'));

  return (
    <Routes>
      <Route path="/" element={<SearchView />} />
      <Route path={`${ROUTES.CHAPTER}`} element={<ChapterView />} />
      <Route path={`${ROUTES.PAGE}`} element={<PageView />} />
      <Route path={`${ROUTES.TAG}`} element={<TagMenuView />} />
    </Routes>
  );
};
