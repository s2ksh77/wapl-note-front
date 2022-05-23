import React from 'react';
import { SearchField, styled } from '@wapl/ui';
import useSearch from '@mhooks/useSearch';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onEnter: () => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange, onCancel, onEnter }) => {
  return (
    <SearchFieldWrapper>
      <SearchField
        btnText="취소"
        placeholder="페이지, 챕터 검색"
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

const SearchFieldWrapper = styled.div`
  display: flex;
  padding: 12px 16px;
  position: absolute;
  width: 100%;
`;
