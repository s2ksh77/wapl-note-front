import React from 'react';
import { IChapter } from '@mcomponents/ChapterList';
import { Icon, Checkbox, Radio } from '@wapl/ui';
import { NoteViewMenuListItemWrapper, NoteViewMenuListTitle, NoteViewSelectboxWrapper } from '@mstyles/ListItemStyle';
import { ChapterType, SelectType } from '../@types/common';

type Props = {
  chapter: IChapter;
  isSelectable?: boolean;
  selectType?: SelectType;
  isSelected?: (value: string) => boolean;
  handleItemPress?: (id: string) => () => void;
};

const ChapterItem: React.FC<Props> = ({ chapter, isSelectable, selectType, isSelected, handleItemPress }) => {
  const ChapterIcon = React.memo(() => {
    switch (chapter.type) {
      case ChapterType.SharedPage:
        return <Icon.ShareFill />;
      case ChapterType.SharedChapter:
        return <Icon.ShareFill />;
      case ChapterType.RecycleBin:
        return <Icon.DeleteLine />;
      default:
        return <Icon.ChapterFill color={chapter.color} />;
    }
  });

  return (
    <NoteViewMenuListItemWrapper onClick={handleItemPress(chapter.id)}>
      {isSelectable &&
        (selectType === SelectType.Checkbox ? (
          <NoteViewSelectboxWrapper>
            <Checkbox checked={isSelected(chapter.id)} />
          </NoteViewSelectboxWrapper>
        ) : (
          <NoteViewSelectboxWrapper>
            <Radio checked={isSelected(chapter.id)} />
          </NoteViewSelectboxWrapper>
        ))}
      <ChapterIcon />
      <NoteViewMenuListTitle>{chapter.name}</NoteViewMenuListTitle>
    </NoteViewMenuListItemWrapper>
  );
};

export default ChapterItem;

ChapterItem.defaultProps = {
  isSelectable: false,
  selectType: SelectType.Checkbox,
  isSelected: () => false,
  handleItemPress: () => () => {
    return null;
  },
};
