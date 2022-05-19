/* eslint-disable consistent-return */
import { useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TLocation } from '@mcomponents/header/NoteHeader';
import {
  MY_NOTE,
  SEARCH_DETAIL,
  PANEL_CHAPTER,
  PANEL_CONTENT,
  PANEL_PAGE,
  PANEL_SEARCH_CHAPTER,
  PANEL_SEARCH_PAGE,
  PANEL_SEARCH,
  CHAPTER_DETAIL,
  PAGE_DETAIL,
} from '@mconstant/routes';

const useRoute = () => {
  const navigate = useNavigate();
  const { navTab } = useParams();
  const { pathname } = useLocation() as TLocation;

  const navPath = useCallback(() => {
    if (!navTab) return MY_NOTE;
    return `/${navTab}`;
  }, [navTab]);

  const panelPath = useCallback((panel: string) => {
    switch (panel) {
      case PANEL_CHAPTER:
        return '';
      case PANEL_PAGE:
        return CHAPTER_DETAIL;
      case PANEL_SEARCH:
        return '';
      case PANEL_CONTENT:
        return PAGE_DETAIL; // TODO: tag 쪽 panel정의
      case PANEL_SEARCH_CHAPTER:
        return CHAPTER_DETAIL;
      case PANEL_SEARCH_PAGE:
        return PAGE_DETAIL;
      default:
        return '';
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
    panel (chapter, page, tag)
   */

  const routeTo = useCallback(
    (panel?: string) => {
      if (pathname === navPath() && !panel) return pathname; // case 1
      if (panel !== 'search' && !pathname.includes(SEARCH_DETAIL)) return `${navPath()}${panelPath(panel)}`; // case 2
      return `${navPath()}${SEARCH_DETAIL}${panelPath(panel)}`; // case 3
    },
    [navPath, panelPath, pathname],
  );

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return { goBack, routeTo };
};

export default useRoute;