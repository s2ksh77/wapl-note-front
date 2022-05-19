import { useState } from 'react';
import { Mui, AppBar, AppBarButton, AppBarCloseButton, FullScreenDialog, Icon, Button } from '@wapl/ui';
import {
  TagEditViewBody,
  TagInputWrapper,
  InputField,
  TagInput,
  TagListWrapper,
  TagChip,
  TagText,
} from '@mstyles/ContentStyle';
import { TagModel } from '@wapl/note-core';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  tagList: Array<TagModel>;
  setTagList: (data: Array<TagModel>) => void;
};

const TagEditView: React.FC<Props> = ({ open, setOpen, tagList, setTagList }) => {
  const [inputValue, setInputValue] = useState('');
  const [tempTagList, setTempTagList] = useState(tagList);

  const handleCloseButtonClick = () => {
    setOpen(false);
    setTempTagList(tagList);
  };

  const handleSaveButtonClick = () => {
    setOpen(false);
    setTagList(tempTagList);
  };

  const handleTagAdd = () => {
    if (!inputValue) return;
    setTempTagList([...tempTagList, new TagModel({ id: (tempTagList.length + 1).toString(), name: inputValue })]);
    setInputValue('');
  };

  const handleTagDelete = id => () => {
    setTempTagList(tempTagList.filter(tag => tag.id !== id));
  };

  return (
    <FullScreenDialog
      open={open}
      header={
        <AppBar
          leftSide={<AppBarCloseButton onClick={handleCloseButtonClick} />}
          title="태그"
          rightSide={
            <AppBarButton style={{ color: '#ff6258' }} onClick={handleSaveButtonClick}>
              저장
            </AppBarButton>
          }
        />
      }
    >
      <TagEditViewBody>
        <TagInputWrapper>
          <InputField>
            <TagInput value={inputValue} onChange={e => setInputValue(e.target.value)} />
            {inputValue && (
              <Mui.IconButton onClick={() => setInputValue('')}>
                <Icon.DeleteFill width={20} height={20} color="#868686" />
              </Mui.IconButton>
            )}
          </InputField>
          <Button onClick={handleTagAdd}>추가</Button>
        </TagInputWrapper>
        <TagListWrapper>
          {tempTagList?.map(tag => (
            <TagChip key={tag.id}>
              <TagText>{tag.name}</TagText>
              <Mui.IconButton style={{ padding: 0 }} onClick={handleTagDelete(tag.id)}>
                <Icon.DeleteFill width={14} height={14} color="#868686" />
              </Mui.IconButton>
            </TagChip>
          ))}
        </TagListWrapper>
      </TagEditViewBody>
    </FullScreenDialog>
  );
};

export default TagEditView;
