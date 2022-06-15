import React from 'react';
import { SearchField } from '@wapl/ui';
import { SearchFieldWrapper } from '@mstyles/HeaderStyle';
import useRoute from '@/mobile/hooks/useRoute';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onEnter: () => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange, onCancel, onEnter }) => {
  const { isTag } = useRoute();
  return (
    <SearchFieldWrapper>
      <SearchField
        btnText="취소"
        placeholder={!isTag ? '페이지, 챕터 검색' : '태그 검색'}
        variant="filled"
        value={value}
        onChange={onChange}
        onSearchClick={onEnter}
        onBtnTextClick={onCancel}
      />
    </SearchFieldWrapper>
  );
};

export default React.memo(SearchBar);
