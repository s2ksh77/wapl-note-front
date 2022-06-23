/* eslint-disable consistent-return */
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  SEARCH_DETAIL,
  PANEL_PAGE,
  PANEL_SEARCH,
  CHAPTER_DETAIL,
  PAGE_DETAIL,
  TAG_DETAIL,
  TAG_CHAPTER,
  PANEL_TAG,
  MY_NOTE,
} from '@mconstant/routes';
import { RouteType } from '../@types/common';

const useRoute = () => {
  const navigate = useNavigate();
  const { chId } = useParams();

  const navPath = useCallback(() => {
    const { pathname } = window.location;
    const navTab = `/${pathname.match(/(?<=note\/)[a-zA-Z0-9_.-]*/i)[0]}`;
    return chId ? `${navTab}/${chId}` : navTab;
  }, [window.location.pathname]);

  const isSearch = window.location.pathname.includes(PANEL_SEARCH);
  const isTag = window.location.pathname.includes(PANEL_TAG);

  const getPath = useCallback((routeType: string) => {
    switch (routeType) {
      case RouteType.PRESS_CHAPTER:
        if (isSearch) return `${SEARCH_DETAIL}${CHAPTER_DETAIL}`;
        if (isTag) return `${TAG_DETAIL}${CHAPTER_DETAIL}`;
        return `${CHAPTER_DETAIL}`;
      case RouteType.PRESS_PAGE:
        if (isSearch) return `${SEARCH_DETAIL}${PAGE_DETAIL}`;
        if (isTag) return `${TAG_DETAIL}${PAGE_DETAIL}`;
        return `${PAGE_DETAIL}`;
      case RouteType.PRESS_TAG:
        return `${TAG_DETAIL}`;
      case RouteType.SEARCH:
        return `${SEARCH_DETAIL}`;
      default:
    }
  }, []);

  /**
   * route 관리를 위한 hook 
    case 1 : only Route
      :navTab -> myNote, talkNote, bookmark, recent
    case 2 : nested Route
      /:navTab/chapter, /:navTab/page, /:navTab/content
    case 3 : nested Route
      /:navTab/search/chapter, /:navTab/search/page, /:navTab/search/tag
    case 4 : nested Route with tag
      /:myNote/tag/chapter, /:myNote/tag/page, /:talkNote/tag/chapter, /:talkNote/tag/page
    panel (chapter, page, tag)
   */

  const routeTo = useCallback((routeType: string) => {
    return `${navPath()}${getPath(routeType)}`;
  }, []);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    goBack,
    routeTo,
    isContent: window.location.pathname.includes(PANEL_PAGE),
    isSearch: window.location.pathname.includes(PANEL_SEARCH),
    isTag: window.location.pathname.includes(PANEL_TAG),
    isTagChapter: window.location.pathname.includes(TAG_CHAPTER),
  };
};

export default useRoute;
