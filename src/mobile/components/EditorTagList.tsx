import { useState } from 'react';
import { Mui, Icon } from '@wapl/ui';
import { EditorTagListWrapper, TagListWrapper, TagChip, TagText } from '@mstyles/ContentStyle';
import { observer } from 'mobx-react';
import TagEditView from '@mcomponents/TagEditView';
import { TagModel } from '@wapl/note-core';

type Props = {
  data: Array<TagModel>;
};

const EditorTagList: React.FC<Props> = observer(({ data }) => {
  const [isTagEditViewOpen, setIsTagEditViewOpen] = useState(false);
  const [tagList, setTagList] = useState(data);

  return (
    <EditorTagListWrapper>
      <Mui.IconButton style={{ padding: 0, marginRight: '12px' }} onClick={() => setIsTagEditViewOpen(true)}>
        <Icon.TagLine width={20} height={20} />
      </Mui.IconButton>
      <TagListWrapper style={{ flexWrap: 'nowrap', whiteSpace: 'nowrap', overflowX: 'scroll', paddingRight: '6px' }}>
        {tagList?.map(tag => (
          <TagChip key={tag.id}>
            <TagText>{tag.name}</TagText>
            <Mui.IconButton style={{ padding: 0 }}>
              <Icon.DeleteFill width={14} height={14} color="#868686" />
            </Mui.IconButton>
          </TagChip>
        ))}
      </TagListWrapper>
      <TagEditView open={isTagEditViewOpen} setOpen={setIsTagEditViewOpen} tagList={tagList} setTagList={setTagList} />
    </EditorTagListWrapper>
  );
});

export default EditorTagList;
