import { SChip, STagChipContainer } from '@mstyles/BodyStyle';
import React from 'react';

interface ITag {
  id: string;
  name: string;
}

type Props = {
  tagList: Array<ITag>;
  handlePressTag: (id: string) => (event: any) => void;
};

const TagChipContainer: React.FC<Props> = ({ tagList, handlePressTag }) => {
  return (
    <STagChipContainer>
      {tagList.map(tag => (
        <SChip
          key={tag.id}
          label={tag.name}
          // onDelete={() => console.log('지워져요')}
          onClick={handlePressTag(tag.id)}
          type="filter"
          maxWidth={150}
        />
      ))}
    </STagChipContainer>
  );
};

export default TagChipContainer;
