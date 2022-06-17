/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { SetStateAction } from 'react';
import { useNoteStore, PageModel } from '@wapl/note-core';
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

type Props = {
  pageList: Array<Partial<PageModel>>;
  setPageList?: React.Dispatch<SetStateAction<Array<Partial<PageModel>>>>;
  isSelected?: (value: string) => boolean;
  toggleSelected?: (value: string) => void;
  isRecycleBin?: boolean;
};

const PageList: React.FC<Props> = ({ pageList, setPageList, isSelected, toggleSelected, isRecycleBin }) => {
  const navigate = useNavigate();
  const { navTab } = useParams();
  const { pageStore, uiStore } = useNoteStore();
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
    // search에서 클릭시 뒤로가기 토글
    if (uiStore.isSearching) uiStore.toggleSearchBar();
  };

  const handleBookmarkPress = async (id, favorite) => {
    const { success } = favorite ? await pageStore.unbookmarkPage(id) : await pageStore.bookmarkPage(id);
    if (navTab !== MENU_BOOKMARK) {
      pageList.map(page => (page.id === id ? (page.favorite = !!success) : page));
      setPageList([...pageList]);
    } else setPageList(pageList.filter(page => page.id !== id));
  };

  const getColor = page => {
    if (page.color) return page.color;
    if (page.shared) return 'SHARED';
    return 'RECYCLE_BIN';
  };

  return (
    <PageListWrapper isList={!!pageList?.length}>
      {pageList?.map(page => (
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
              tagList={page.tagList}
              color={getColor(page)}
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
