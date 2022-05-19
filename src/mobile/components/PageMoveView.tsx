import { useState } from 'react';
import { FullScreenDialog, AppBar, AppBarCloseButton, Button } from '@wapl/ui';
import { PageMoveViewBody, PageMoveViewButtonsWrapper } from '@mstyles/ContentStyle';
import { PageMoveViewChapterListWrapper } from '@mstyles/ListItemStyle';
import { IChapter } from '@mcomponents/ChapterList';
import ChapterItem from '@mcomponents/ChapterItem';
import useMultiSelect from '../hooks/useMultiSelect';
import { SelectType } from '../@types/common';

type Props = {
  chapterList?: Array<IChapter>;
};

const PageMoveView: React.FC<Props> = ({ chapterList }) => {
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
      header={<AppBar leftSide={<AppBarCloseButton onClick={() => setOpen(false)} />} title="페이지 이동" />}
    >
      <PageMoveViewBody>
        <PageMoveViewChapterListWrapper>
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
        </PageMoveViewChapterListWrapper>
        <PageMoveViewButtonsWrapper>
          <Button variant="secondary" width="49%" size="extra-large" onClick={handleClick}>
            사본 만들기
          </Button>
          <Button width="49%" size="extra-large" onClick={handleClick}>
            이동
          </Button>
        </PageMoveViewButtonsWrapper>
      </PageMoveViewBody>
    </FullScreenDialog>
  );
};

export default PageMoveView;
