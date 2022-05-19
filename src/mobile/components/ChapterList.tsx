import React, { useCallback } from 'react';
import { useNoteStore } from '@wapl/note-core';
import LongPressable from 'react-longpressable';
import ChapterItem from '@mcomponents/ChapterItem';
import { NoteViewChapterListWrapper } from '@mstyles/ListItemStyle';
import { useNavigate } from 'react-router-dom';
import useRoute from '@mhooks/useRoute';
import { SelectType } from '../@types/common';

// fixme: interface들은 나중에 core로 빼기
export interface IChapter {
  id: string;
  name: string;
  type: string;
  color: string;
  children: Array<IPage>;
}

export interface IPage {
  id: string;
  name: string;
  content?: string;
  textContent?: string;
  chapterId?: string;
  favorite?: boolean;
  read?: boolean;
  updatedUserId?: string;
}

type Props = {
  chapterList: Array<IChapter>;
  showDivider?: boolean;
  isSelected?: (value: string) => boolean;
  toggleSelected?: (value: string) => void;
  isRecycleBin?: boolean;
  panel?: string;
};

const ChapterList: React.FC<Props> = ({
  chapterList,
  isSelected,
  toggleSelected,
  showDivider,
  isRecycleBin,
  panel = 'page',
}) => {
  const navigate = useNavigate();
  const { noteViewStore } = useNoteStore();
  const { routeTo } = useRoute();

  const handleItemLongPress = useCallback(
    id => () => {
      if (noteViewStore.isLongPressed) return;
      toggleSelected(id);
      noteViewStore.toggleMultiSelectMode();
    },
    [],
  );

  const handleItemPress = id => () => {
    if (noteViewStore.isLongPressed) {
      toggleSelected(id);
    } else {
      navigate(routeTo(panel), {
        state: { panel: 'page', id, isRecycleBin },
      });
      console.log(`item ${id} pressed`);
    }
  };
  return (
    <NoteViewChapterListWrapper showDivider={showDivider}>
      {chapterList.map(chapter => (
        <React.Fragment key={chapter.id}>
          <LongPressable
            onLongPress={handleItemLongPress(chapter.id)}
            onShortPress={() => console.log('shortPressed!')}
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
};

export default ChapterList;

ChapterList.defaultProps = {
  showDivider: false,
  isSelected: () => false,
  toggleSelected: () => () => {
    return false;
  },
  isRecycleBin: false,
  panel: 'page',
};
