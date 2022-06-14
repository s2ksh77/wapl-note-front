import { useState, useEffect } from 'react';
import { Mui, AppBar, AppBarCloseButton, FullScreenDialog, Icon, Button } from '@wapl/ui';
import {
  TagEditViewBody,
  TagInputWrapper,
  InputField,
  TagInput,
  TagListWrapper,
  TagChip,
  TagText,
} from '@mstyles/ContentStyle';
import { useNoteStore, TagModel } from '@wapl/note-core';

type Props = {
  open: boolean;
  tagList: Array<TagModel>;
  onClose: () => void;
};

const TagEditView: React.FC<Props> = ({ open, tagList, onClose }) => {
  const { pageStore, tagStore } = useNoteStore();
  const [inputValue, setInputValue] = useState('');

  const handleTagCreate = async () => {
    if (!inputValue) return;
    try {
      const pageId = pageStore.pageInfo.id;
      await tagStore.createTag(pageId, inputValue);
      await tagStore.fetchPageTagList(pageId);
    } catch (error) {
      console.log('tag create error', error);
    } finally {
      setInputValue('');
    }
  };

  const handleTagDelete = (id: string) => async () => {
    try {
      const pageId = pageStore.pageInfo.id;
      await tagStore.deleteTag(pageId, id);
      await tagStore.fetchPageTagList(pageId);
    } catch (error) {
      console.log('tag delete error', error);
    }
  };

  useEffect(() => {
    setInputValue('');
  }, [open]);

  return (
    <FullScreenDialog open={open} header={<AppBar leftSide={<AppBarCloseButton onClick={onClose} />} title="태그" />}>
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
          <Button onClick={handleTagCreate}>추가</Button>
        </TagInputWrapper>
        <TagListWrapper>
          {tagList?.map(tag => (
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
