import React from 'react';
import { useNoteStore } from '@wapl/note-core';
import LongPressable from 'react-longpressable';
import PageItem from '@mcomponents/PageItem';
import { PageListWrapper, PageItemDivider } from '@mstyles/ListItemStyle';
import { useNavigate } from 'react-router-dom';
import useRoute from '@mhooks/useRoute';

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
  isSelected?: (value: string) => boolean;
  toggleSelected?: (value: string) => void;
  isRecycleBin?: boolean;
};

const PageList: React.FC<Props> = ({ pageList, isSelected, toggleSelected, isRecycleBin }) => {
  const navigate = useNavigate();
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
};

export default PageList;
