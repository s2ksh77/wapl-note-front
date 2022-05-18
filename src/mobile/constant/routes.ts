const HOME = '/';
const APP = '/note';
export const CHAPTER_DETAIL = '/chapter';
export const PAGE_DETAIL = '/page';
export const TAG_DETAIL = '/tag';
export const SEARCH_DETAIL = '/search';
export const SEARCH_TALKROOM = '/search/talk';
export const SEARCH_CHAPTER = '/search/chapter';
export const SEARCH_PAGE = '/search/page';
export const SEARCH_TAG = '/search/tag';
export const MY_NOTE = '/myNote';
export const TALK_NOTE = '/talkNote';
export const BOOKMARK = '/bookmark';
export const RECENT = '/recent';
export const MENU_MYNOTE = 'myNote';
export const MENU_TALKNOTE = 'talkNote';
export const MENU_BOOKMARK = 'bookmark';
export const MENU_RECENT = 'recent';

export const PANEL_CHAPTER = 'chapter';
export const PANEL_PAGE = 'page';
export const PANEL_CONTENT = 'content';
export const PANEL_TAG = 'tag';
export const PANEL_SEARCH = 'search';
export const PANEL_SEARCH_CHAPTER = 'search_chapter';
export const PANEL_SEARCH_PAGE = 'search_page';
export const PANEL_SEARCH_TAG = 'search_tag';

export const ROUTES = {
  HOME,
  APP,
  CHAPTER_DETAIL,
  PAGE_DETAIL,
  TAG_DETAIL,
  SEARCH_DETAIL,
  SEARCH_TALKROOM,
  SEARCH_CHAPTER,
  SEARCH_PAGE,
  SEARCH_TAG,
  search_talkroomDetail: id => {
    // TODO: 중복 최적화
    if (id) return `${SEARCH_TALKROOM}/${id}`;
    return SEARCH_TALKROOM;
  },
  search_chapterDetail: id => {
    if (id) return `${SEARCH_CHAPTER}/${id}`;
    return SEARCH_CHAPTER;
  },
  search_pageDetail: id => {
    if (id) return `${SEARCH_PAGE}/${id}`;
    return SEARCH_PAGE;
  },
  search_tagDetail: id => {
    if (id) return `${SEARCH_TAG}/${id}`;
    return SEARCH_TAG;
  },
  MY_NOTE,
  TALK_NOTE,
  BOOKMARK,
  RECENT,
};
