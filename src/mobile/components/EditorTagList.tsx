import { useState } from 'react';
import { Mui, Icon } from '@wapl/ui';
import { EditorTagListWrapper, TagListWrapper, TagChip, TagText } from '@mstyles/ContentStyle';
import TagEditView from '@mcomponents/TagEditView';
import { useNoteStore, TagModel } from '@wapl/note-core';

type Props = {
  data: Array<TagModel>;
  isReadMode: boolean;
};

const EditorTagList: React.FC<Props> = ({ data, isReadMode }) => {
  const tempChannelId = '79b3f1b3-85dc-4965-a8a2-0c4c56244b82';
  const { pageStore } = useNoteStore();
  const [isTagEditViewOpen, setIsTagEditViewOpen] = useState(false);

  const handleTagPress = async () => {
    if (pageStore.pageInfo.editingUserId) {
      // TODO: 다른 멤버가 수정 중인 경우 에러 팝업 호출
      return;
    }
    try {
      const { editingUserId } = await pageStore.editPage(
        tempChannelId,
        pageStore.pageInfo.chapterId,
        pageStore.pageInfo,
      );
      pageStore.pageInfo.editingUserId = editingUserId;
      setIsTagEditViewOpen(true);
    } catch (error) {
      console.log('edit start error', error);
    }
  };

  return (
    <EditorTagListWrapper isReadMode={isReadMode}>
      {isReadMode ? (
        <Mui.IconButton style={{ padding: 0, marginRight: '12px' }} onClick={handleTagPress}>
          <Icon.TagLine width={20} height={20} />
        </Mui.IconButton>
      ) : (
        <Mui.IconButton style={{ padding: 0, marginRight: '12px' }} onClick={() => setIsTagEditViewOpen(true)}>
          <Icon.AddTagLine width={20} height={20} />
        </Mui.IconButton>
      )}
      <TagListWrapper style={{ flexWrap: 'nowrap', whiteSpace: 'nowrap', overflowX: 'auto', paddingRight: '6px' }}>
        {data?.map(tag => (
          <TagChip key={tag.id}>
            <TagText>{tag.name}</TagText>
          </TagChip>
        ))}
      </TagListWrapper>
      <TagEditView open={isTagEditViewOpen} tagList={data} onClose={() => setIsTagEditViewOpen(false)} />
    </EditorTagListWrapper>
  );
};

export default EditorTagList;
