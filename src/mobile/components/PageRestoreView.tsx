import { useState, useLayoutEffect } from 'react';
import { useNoteStore } from '@wapl/note-core';
import useRoute from '@mhooks/useRoute';
import { FullScreenDialog, AppBar, AppBarCloseButton, Button } from '@wapl/ui';
import { PageRestoreViewBody, PageRestoreViewButtonsWrapper } from '@mstyles/ContentStyle';
import { PageRestoreViewChapterListWrapper } from '@mstyles/ListItemStyle';
import ChapterItem from '@mcomponents/ChapterItem';
import useMultiSelect from '../hooks/useMultiSelect';
import { SelectType } from '../@types/common';

type Props = {
  open: boolean;
  restoreChapterId?: string;
  onClose: () => void;
  onSuccess?: () => void;
};

const PageRestoreView: React.FC<Props> = ({ open, restoreChapterId, onClose: handleClose }) => {
  const tempChannelId = '79b3f1b3-85dc-4965-a8a2-0c4c56244b82';
  const { chapterStore, pageStore } = useNoteStore();
  const { goBack } = useRoute();
  const { isSelected, toggleSelected, deSelectAll, getSelectedItems } = useMultiSelect();
  const [chapterList, setChapterList] = useState([]);
  const handleRestoreButton = async () => {
    try {
      const targetRestoreChapterId = getSelectedItems()[0];
      pageStore.pageInfo.restoreChapterId = targetRestoreChapterId;
      await pageStore.restorePage(tempChannelId, [pageStore.pageInfo]);
    } catch (error) {
      console.log('restorePage Error', error);
    } finally {
      goBack();
      deSelectAll();
      handleClose();
    }
  };
  const handleItemPress = id => () => {
    if (isSelected(id)) return;
    deSelectAll();
    toggleSelected(id);
  };

  const fetchChapterList = async () => {
    const { normal } = await chapterStore.getChapterList(tempChannelId);
    setChapterList(normal);
  };

  useLayoutEffect(() => {
    if (!open) return;
    if (restoreChapterId) handleItemPress(restoreChapterId)();
    fetchChapterList();
  }, [open]);

  return (
    <FullScreenDialog
      open={open}
      header={<AppBar leftSide={<AppBarCloseButton onClick={handleClose} />} title="페이지 복원" />}
    >
      <PageRestoreViewBody>
        <PageRestoreViewChapterListWrapper>
          {chapterList.length > 0 &&
            chapterList.map(chapter => (
              <ChapterItem
                key={chapter.id}
                isSelectable
                chapter={chapter}
                selectType={SelectType.Radio}
                isSelected={isSelected}
                handleItemPress={handleItemPress}
              />
            ))}
        </PageRestoreViewChapterListWrapper>
        <PageRestoreViewButtonsWrapper>
          <Button width="100%" size="extra-large" onClick={handleRestoreButton}>
            복원
          </Button>
        </PageRestoreViewButtonsWrapper>
      </PageRestoreViewBody>
    </FullScreenDialog>
  );
};

export default PageRestoreView;
