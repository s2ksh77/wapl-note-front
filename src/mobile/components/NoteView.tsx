/* eslint-disable no-nested-ternary */
/* eslint-disable no-promise-executor-return */
import React, { useState, useLayoutEffect, useCallback, useEffect } from 'react';
import { Observer } from 'mobx-react';
import { Icon } from '@wapl/ui';
import { NoteViewBodyWrapper, Scrollable, NewChapterButtonWrapper } from '@mstyles/ContentStyle';
import MenuList from '@mcomponents/MenuList';
import NewChapterDialog from '@mcomponents/dialog/InputDialog';
import { useNoteStore, ChapterModel } from '@wapl/note-core';
import useSuspense from '@/mobile/hooks/useSuspense';
import useMultiSelect from '../hooks/useMultiSelect';
import LoadingSpinner from './LoadingSpinner';
import FilterChipContainer from './FilterChipContainer';

const ChapterList = React.lazy(() => import('@mcomponents/ChapterList'));

const NoteView: React.FC = () => {
  const tempChannelId = '79b3f1b3-85dc-4965-a8a2-0c4c56244b82';
  const { noteViewStore, chapterStore, uiStore } = useNoteStore();
  const [newChapterButtonVisible, setNewChapterButtonVisible] = useState(true);
  const [isNewChapterDialogOpen, setIsNewChapterDialogOpen] = useState(false);
  const [chapterList, setChapterList] = useState([]);
  const [sharedChapterList, setSharedChapterList] = useState([]);
  const [recycleBin, setRecycleBin] = useState([]);
  const { isSelected, toggleSelected, selectAll, deSelectAll, getSelectedItems, getSelectedCount } = useMultiSelect();
  const [selectFilter, setSelectFilter] = useState('');
  const { isPending, isFullfilled, Suspense, setIsFullfilled } = useSuspense({ delay: 1000 });

  const handleChapterCreate = useCallback(async name => {
    // TODO: response 데이터 동기화
    const res = await chapterStore.createChapter(
      new ChapterModel({
        color: chapterStore.RandomColor,
        name,
      }),
      'ko',
      tempChannelId,
    );

    setIsNewChapterDialogOpen(false);
  }, []);

  const handleClosePress = useCallback(() => {
    noteViewStore.toggleMultiSelectMode();
    deSelectAll();
  }, []);

  const handleDeletePress = async () => {
    try {
      const chapterIds = getSelectedItems();
      const editingUserIds = await chapterStore.getEditingUserIds(chapterIds, tempChannelId);
      if (editingUserIds.length > 0) {
        // TODO: 삭제 불가 팝업
      } else {
        await chapterStore.deleteChapter(
          chapterIds.map(id => new ChapterModel({ id })),
          tempChannelId,
        );
        await fetchChapterList();
      }
      noteViewStore.toggleMultiSelectMode();
      deSelectAll();
    } catch (error) {
      console.log('chapter delete error', error);
    }
  };

  const handleSelectAllPress = () => {
    selectAll(chapterList.map(chapter => chapter.id).concat(sharedChapterList.map(chapter => chapter.id)));
  };

  const handleDeselectAllPress = () => {
    deSelectAll();
  };

  useEffect(() => {
    if (!noteViewStore.isLongPressed) {
      uiStore.setHeaderInfo({
        title: '내 노트',
        rightSide: [{ action: 'search', onClick: () => uiStore.toggleSearchBar() }],
      });
      return;
    }

    const isAllSelected = getSelectedCount() === chapterList.length + sharedChapterList.length;
    uiStore.setHeaderInfo({
      title: `${getSelectedCount()}개 선택됨`,
      leftSide: [{ action: 'close', onClick: handleClosePress }],
      rightSide: [
        { action: 'delete', onClick: handleDeletePress },
        { action: 'share', onClick: () => console.log('share') },
        isAllSelected
          ? { action: 'deselect', onClick: handleDeselectAllPress }
          : { action: 'select', onClick: handleSelectAllPress },
      ],
    });
  }, [noteViewStore.isLongPressed, getSelectedCount]);

  const fetchChapterList = async () => {
    const { normal, shared, recycle } = await chapterStore.getChapterList(tempChannelId); // chId 관리 필요
    setChapterList(normal);
    setSharedChapterList(shared);
    setRecycleBin(recycle);

    // fetch 완료 후 펜딩 변경
    if (isPending && !isFullfilled) setIsFullfilled(true);
  };

  useLayoutEffect(() => {
    fetchChapterList();
  }, []);

  return (
    <NoteViewBodyWrapper>
      <Observer>
        {() =>
          !uiStore.isSearching ? (
            <>
              {isPending && <LoadingSpinner />}
              <Suspense>
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
                      onClick: (name: string) => handleChapterCreate(name),
                    },
                  ]}
                />
              </Suspense>
            </>
          ) : (
            <FilterChipContainer selectFilter={selectFilter} setSelectFilter={setSelectFilter} isSearchView={false} />
          )
        }
      </Observer>
    </NoteViewBodyWrapper>
  );
};

export default NoteView;
