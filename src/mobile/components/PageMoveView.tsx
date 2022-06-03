import { useState, useLayoutEffect } from 'react';
import { useNoteStore, PageModel } from '@wapl/note-core';
import { FullScreenDialog, AppBar, AppBarCloseButton, Button } from '@wapl/ui';
import { PageMoveViewBody, PageMoveViewButtonsWrapper, Scrollable } from '@mstyles/ContentStyle';
import { PageMoveViewChapterListWrapper } from '@mstyles/ListItemStyle';
import ChapterItem from '@mcomponents/ChapterItem';
import useMultiSelect from '../hooks/useMultiSelect';
import { SelectType } from '../@types/common';

type Props = {
  open: boolean;
  chapterId: string;
  pageList: string[];
  onClose: () => void;
  onSuccess: () => void;
};

const PageMoveView: React.FC<Props> = ({
  open,
  chapterId,
  pageList,
  onClose: handleClose,
  onSuccess: handleModeChange,
}) => {
  const tempChannelId = '79b3f1b3-85dc-4965-a8a2-0c4c56244b82';
  const { chapterStore, pageStore } = useNoteStore();
  const { isSelected, toggleSelected, deSelectAll, getSelectedItems } = useMultiSelect();
  const [chapterList, setChapterList] = useState([]);
  const handleClick = () => {
    console.log('hi');
  };
  const handleItemPress = id => () => {
    if (isSelected(id)) return;
    deSelectAll();
    toggleSelected(id);
  };

  const handlePageMove = async () => {
    // TODO: 이동 가능 여부 확인 / Toast 팝업
    const targetChapterId = getSelectedItems()[0];
    if (targetChapterId !== chapterId) {
      await Promise.all(
        pageList.map(id =>
          pageStore.movePage(tempChannelId, targetChapterId, new PageModel({ id, chapterId: targetChapterId })),
        ),
      );
    }
    handleModeChange();
    handleClose();
  };

  const fetchChapterList = async () => {
    const { normal } = await chapterStore.getChapterList(tempChannelId);
    setChapterList(normal);
  };

  useLayoutEffect(() => {
    if (!open) return;
    handleItemPress(chapterId)();
    fetchChapterList();
  }, [open]);

  return (
    <FullScreenDialog
      open={open}
      header={<AppBar leftSide={<AppBarCloseButton onClick={handleClose} />} title="페이지 이동" />}
    >
      <PageMoveViewBody>
        <Scrollable>
          <PageMoveViewChapterListWrapper>
            {chapterList.map(chapter => (
              <ChapterItem
                isSelectable
                chapter={chapter}
                selectType={SelectType.Radio}
                isSelected={isSelected}
                handleItemPress={handleItemPress}
              />
            ))}
          </PageMoveViewChapterListWrapper>
        </Scrollable>
        <PageMoveViewButtonsWrapper>
          <Button variant="secondary" width="49%" size="extra-large" onClick={handleClick}>
            사본 만들기
          </Button>
          <Button width="49%" size="extra-large" onClick={handlePageMove}>
            이동
          </Button>
        </PageMoveViewButtonsWrapper>
      </PageMoveViewBody>
    </FullScreenDialog>
  );
};

export default PageMoveView;
