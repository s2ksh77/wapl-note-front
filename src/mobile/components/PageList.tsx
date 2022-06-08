/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { SetStateAction } from 'react';
import { useNoteStore } from '@wapl/note-core';
import LongPressable from 'react-longpressable';
import PageItem from '@mcomponents/PageItem';
import { PageListWrapper, PageItemDivider } from '@mstyles/ListItemStyle';
import { useNavigate, useParams } from 'react-router-dom';
import useRoute from '@mhooks/useRoute';
import { BOOKMARK, MENU_BOOKMARK } from '../constant/routes';

interface ITag {
  id: string;
  name: string;
}
interface IPage {
  id: string;
  name: string;
  content?: string;
  textContent?: string;
  chapterId?: string;
  favorite?: boolean;
  read?: boolean;
  updatedUserId?: string;
  tagList: Array<ITag>;
}

type Props = {
  pageList: Array<IPage>;
  setPageList?: React.Dispatch<SetStateAction<Array<IPage>>>;
  isSelected?: (value: string) => boolean;
  toggleSelected?: (value: string) => void;
  isRecycleBin?: boolean;
};

const PageList: React.FC<Props> = ({ pageList, setPageList, isSelected, toggleSelected, isRecycleBin }) => {
  const navigate = useNavigate();
  const { navTab } = useParams();
  const { pageStore } = useNoteStore();
  const { routeTo } = useRoute();

  const handleItemLongPress = (id: string) => () => {
    if (pageStore.isLongPressed) return;
    toggleSelected(id);
    pageStore.changeMode();
  };

  const handleItemShortPress = (id: string) => () => {
    if (!pageStore.isLongPressed) return;
    toggleSelected(id);
  };

  const handleItemPress = id => () => {
    if (pageStore.isLongPressed) return;
    navigate(routeTo('content'), {
      state: { id, ...{ panel: 'content', isNewPage: false, isRecycleBin } },
    });
  };

  const handleBookmarkPress = async (id, favorite) => {
    const { success } = favorite ? await pageStore.unbookmarkPage(id) : await pageStore.bookmarkPage(id);
    if (navTab !== MENU_BOOKMARK) {
      pageList.map(page => (page.id === id ? (page.favorite = !!success) : page));
      setPageList([...pageList]);
    } else setPageList(pageList.filter(page => page.id !== id));
  };

  return (
    <PageListWrapper isList={!!pageList.length}>
      {pageList.map(page => (
        <React.Fragment key={page.id}>
          <LongPressable
            onLongPress={handleItemLongPress(page.id)}
            onShortPress={handleItemShortPress(page.id)}
            longPressTime={700}
          >
            <PageItem
              page={page}
              isSelected={isSelected}
              handleItemPress={handleItemPress}
              handleBookmarkPress={handleBookmarkPress}
              tagList={page.tagList ? page.tagList : []}
            />
          </LongPressable>
          <PageItemDivider />
        </React.Fragment>
      ))}
    </PageListWrapper>
  );
};

PageList.defaultProps = {
  isSelected: () => false,
  toggleSelected: () => console.log('toggle error'),
  isRecycleBin: false,
  setPageList: () => null,
};

export default PageList;
