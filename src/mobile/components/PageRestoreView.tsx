import { useState } from 'react';
import { FullScreenDialog, AppBar, AppBarCloseButton, Button } from '@wapl/ui';
import { PageRestoreViewBody, PageRestoreViewButtonsWrapper } from '@mstyles/ContentStyle';
import { PageRestoreViewChapterListWrapper } from '@mstyles/ListItemStyle';
import { IChapter } from '@mcomponents/ChapterList';
import ChapterItem from '@mcomponents/ChapterItem';
import useMultiSelect from '../hooks/useMultiSelect';
import { SelectType } from '../@types/common';

type Props = {
  chapterList?: Array<IChapter>;
};

const PageRestoreView: React.FC<Props> = ({ chapterList }) => {
  const { isSelected, toggleSelected, deSelectAll } = useMultiSelect();
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    console.log('hi');
  };
  const handleItemPress = id => () => {
    if (isSelected(id)) return;
    deSelectAll();
    toggleSelected(id);
  };

  return (
    <FullScreenDialog
      open={open}
      header={<AppBar leftSide={<AppBarCloseButton onClick={() => setOpen(false)} />} title="페이지 복원" />}
    >
      <PageRestoreViewBody>
        <PageRestoreViewChapterListWrapper>
          {chapterList.length > 0 &&
            chapterList.map(chapter => (
              <ChapterItem
                isSelectable
                chapter={chapter}
                selectType={SelectType.Radio}
                isSelected={isSelected}
                handleItemPress={handleItemPress}
              />
            ))}
        </PageRestoreViewChapterListWrapper>
        <PageRestoreViewButtonsWrapper>
          <Button width="100%" size="extra-large" onClick={handleClick}>
            복원
          </Button>
        </PageRestoreViewButtonsWrapper>
      </PageRestoreViewBody>
    </FullScreenDialog>
  );
};

export default PageRestoreView;
