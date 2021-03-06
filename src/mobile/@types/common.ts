export enum NoteViewType {
  MyNote = 'MyNote',
  TalkNote = 'TalkNote',
  SharedNote = 'SharedNote',
}

export enum SelectType {
  Checkbox = 'Checkbox',
  Radio = 'Radio',
}

export enum MenuType {
  TALKROOM = 'talk',
  CHAPTER = 'chapter',
  PAGE = 'page',
  TAG = 'tag',
}

export enum ChapterType {
  Chapter = 'NOTEBOOK',
  SharedChapter = 'SHARED',
  SharedPage = 'SHARED_PAGE',
  RecycleBin = 'RECYCLE_BIN',
}

export enum RouteType {
  PRESS_CHAPTER = 'PRESS_CHAPTER',
  PRESS_PAGE = 'PRESS_PAGE',
  PRESS_TAG = 'PRESS_TAG',
  SEARCH = 'SEARCH',
}

export type TLocation = {
  pathname: string;
  state?: {
    panel?: string;
    id?: string;
    name?: string;
    isNewPage?: boolean;
    isRecycleBin?: boolean;
    searchKey?: string;
    searchResult?: {
      chapterList?: [];
      pageList?: [];
      tagList?: [];
    };
    tagId?: string;
  };
};
