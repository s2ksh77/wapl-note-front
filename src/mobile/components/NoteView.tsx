/* eslint-disable no-nested-ternary */
/* eslint-disable no-promise-executor-return */
import React, { useState, useLayoutEffect, useCallback, useEffect, Suspense } from 'react';
import { Observer } from 'mobx-react';
import { Icon } from '@wapl/ui';
import { NoteViewBodyWrapper, Scrollable, NewChapterButtonWrapper } from '@mstyles/ContentStyle';
import MenuList from '@mcomponents/MenuList';
import NewChapterDialog from '@mcomponents/dialog/InputDialog';
import { useNoteStore, ChapterModel } from '@wapl/note-core';
import useSearch from '@mhooks/useSearch';
import SearchBar from '@mcomponents/header/SearchBar';
import useMultiSelect from '../hooks/useMultiSelect';
import { NoteViewType } from '../@types/common';
import NoteAppBar from './NoteAppBar';
import LoadingSpinner from './LoadingSpinner';
// import ChapterList from '@mcomponents/ChapterList';

// React.lazy 동작 안하려면 위에 import 부분 주석 해제, 이 부분 주석
const ChapterList = React.lazy(() => {
  return new Promise(resolve => setTimeout(resolve, 300)).then(() => import('@mcomponents/ChapterList'));
});

const NoteView: React.FC = () => {
  const { noteViewStore, chapterStore, uiStore } = useNoteStore();
  const [title, setTitle] = useState('');
  const [newChapterButtonVisible, setNewChapterButtonVisible] = useState(true);
  const [isNewChapterDialogOpen, setIsNewChapterDialogOpen] = useState(false);
  const [chapterList, setChapterList] = useState([]);
  const [sharedChapterList, setSharedChapterList] = useState([]);
  const [recycleBin, setRecycleBin] = useState([]);
  const { isSelected, toggleSelected, selectAll, deSelectAll, getSelectedCount } = useMultiSelect();

  useLayoutEffect(() => {
    switch (noteViewStore.type) {
      case NoteViewType.TalkNote:
        setTitle('톡 노트');
        setNewChapterButtonVisible(true);
        break;
      case NoteViewType.SharedNote:
        setTitle('공유 노트');
        setNewChapterButtonVisible(false);
        break;
      default:
        setTitle('내 노트');
        setNewChapterButtonVisible(true);
        break;
    }
  }, [noteViewStore.type]);

  const handleCloseButtonPress = useCallback(() => {
    noteViewStore.toggleMultiSelectMode();
    deSelectAll();
  }, []);

  const handleSelectAllPress = () => {
    selectAll(chapterList.map(chapter => chapter.id).concat(sharedChapterList.map(chapter => chapter.id)));
  };

  const handleDeselectAllPress = () => {
    deSelectAll();
  };

  const handleCreateChapter = useCallback(async name => {
    // TODO: response 데이터 동기화
    const res = await chapterStore.createChapter(
      new ChapterModel({
        color: chapterStore.RandomColor,
        name,
      }),
      'ko',
      '79b3f1b3-85dc-4965-a8a2-0c4c56244b82',
    );

    setIsNewChapterDialogOpen(false);
  }, []);

  const fetchChapterList = async () => {
    const { normal, shared, recycle } = await chapterStore.getChapterList('79b3f1b3-85dc-4965-a8a2-0c4c56244b82'); // chId 관리 필요
    setChapterList(normal);
    setSharedChapterList(shared);
    setRecycleBin(recycle);
  };

  useLayoutEffect(() => {
    fetchChapterList();
    uiStore.setHeaderInfo({
      title: '내 노트',
      rightSide: [{ action: 'search', onClick: () => uiStore.toggleSearchBar() }],
    });
  }, []);

  return (
    <>
      {/* <Observer>
        {() =>
          noteViewStore.isLongPressed ? (
            <NoteAppBar
              title={`${getSelectedCount()}개 선택됨`}
              isLongPress
              closeFn={handleCloseButtonPress}
              rightSide={[
                { action: 'delete', onClick: () => console.log('delete') },
                { action: 'share', onClick: () => console.log('share') },
                {
                  action: getSelectedCount() === chapterList.length + sharedChapterList.length ? 'deselect' : 'select',
                  onClick:
                    getSelectedCount() === chapterList.length + sharedChapterList.length
                      ? handleDeselectAllPress
                      : handleSelectAllPress,
                },
              ]}
            />
          ) : !searchBarVisible ? (
            <NoteAppBar
              title={title}
              isLongPress={false}
              rightSide={[
                { action: 'search', onClick: () => handleSearchVisible() },
                { action: 'character', onClick: () => console.log('character') },
              ]}
            />
          ) : (
            <SearchBar
              value={getValue}
              onChange={handleChange}
              onEnter={() => handleSearch(getValue)}
              onCancel={() => handleCancel(handleSearchVisible)}
            />
          )
        }
      </Observer> */}
      <NoteViewBodyWrapper>
        <Suspense fallback={<LoadingSpinner />}>
          <Scrollable>
            <ChapterList
              chapterList={chapterList}
              isSelected={isSelected}
              toggleSelected={toggleSelected}
              showDivider
            />
            <ChapterList
              chapterList={sharedChapterList}
              isSelected={isSelected}
              toggleSelected={toggleSelected}
              showDivider
            />
            <MenuList>
              <ChapterList chapterList={recycleBin} showDivider={false} isRecycleBin />
            </MenuList>
          </Scrollable>

          {newChapterButtonVisible && (
            <NewChapterButtonWrapper onClick={() => setIsNewChapterDialogOpen(true)}>
              <Icon.Add2Fill width={48} height={48} color="#FF6258" />
            </NewChapterButtonWrapper>
          )}
          <NewChapterDialog
            open={isNewChapterDialogOpen}
            title="새 챕터"
            placeholder="새 챕터"
            buttons={[
              {
                variant: 'dismiss',
                text: '취소',
                onClick: () => setIsNewChapterDialogOpen(false),
              },
              {
                variant: 'confirm',
                text: '생성',
                onClick: (name: string) => handleCreateChapter(name),
              },
            ]}
          />
        </Suspense>
      </NoteViewBodyWrapper>
    </>
  );
};

export default NoteView;
