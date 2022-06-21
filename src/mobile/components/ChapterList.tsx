import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { useNoteStore, PageModel } from '@wapl/note-core';
import LongPressable from 'react-longpressable';
import ChapterItem from '@mcomponents/ChapterItem';
import { NoteViewChapterListWrapper } from '@mstyles/ListItemStyle';
import { useNavigate } from 'react-router-dom';
import useRoute from '@mhooks/useRoute';
import { RouteType, SelectType } from '../@types/common';

// fixme: interface들은 나중에 core로 빼기
export interface IChapter {
  id: string;
  name: string;
  type: string;
  color: string;
  children: Array<Partial<PageModel>>;
}

type Props = {
  chapterList: Array<IChapter>;
  showDivider?: boolean;
  isSelected?: (value: string) => boolean;
  toggleSelected?: (value: string) => void;
  isRecycleBin?: boolean;
};

const ChapterList: React.FC<Props> = observer(
  ({ chapterList, isSelected, toggleSelected, showDivider, isRecycleBin }) => {
    const navigate = useNavigate();
    const { noteViewStore, uiStore } = useNoteStore();
    const { routeTo } = useRoute();

    const handleItemLongPress = useCallback(
      id => () => {
        if (noteViewStore.isLongPressed) return;
        toggleSelected(id);
        noteViewStore.toggleMultiSelectMode();
      },
      [],
    );

    const handleItemShortPress = id => () => {
      if (!noteViewStore.isLongPressed) return;
      toggleSelected(id);
    };

    const handleItemPress = id => () => {
      if (noteViewStore.isLongPressed) return;
      navigate(routeTo(RouteType.PRESS_CHAPTER), {
        state: { panel: 'page', id, isRecycleBin },
      });
      // search에서 클릭시 뒤로가기 토글
      if (uiStore.isSearching) uiStore.toggleSearchBar();
      console.log(`item ${id} pressed`);
    };

    return (
      <NoteViewChapterListWrapper showDivider={showDivider}>
        {chapterList?.map(chapter => (
          <React.Fragment key={chapter.id}>
            <LongPressable
              onLongPress={handleItemLongPress(chapter.id)}
              onShortPress={handleItemShortPress(chapter.id)}
              longPressTime={700}
            >
              <ChapterItem
                isSelectable={noteViewStore.isLongPressed}
                selectType={SelectType.Checkbox}
                chapter={chapter}
                isSelected={isSelected}
                handleItemPress={handleItemPress}
              />
            </LongPressable>
          </React.Fragment>
        ))}
      </NoteViewChapterListWrapper>
    );
  },
);

export default ChapterList;

ChapterList.defaultProps = {
  showDivider: false,
  isSelected: () => false,
  toggleSelected: () => () => {
    return false;
  },
  isRecycleBin: false,
};
