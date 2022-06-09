import React, { useCallback } from 'react';
import { SearchField } from '@wapl/ui';
import { useNoteStore } from '@wapl/note-core';
import { SearchFieldWrapper } from '@mstyles/HeaderStyle';

interface Props {
  handleSearchVisible: () => void;
}

const InPageSearchBar: React.FC<Props> = ({ handleSearchVisible }) => {
  const { editorStore } = useNoteStore();
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    editorStore.setSearchInputValue(value);
  }, []);

  const handleCancel = useCallback(() => {
    editorStore.endSearching();
    handleSearchVisible();
  }, []);

  const handleSearch = () => {
    editorStore.handleSearchEditor();
  };
  return (
    <SearchFieldWrapper>
      <SearchField
        btnText="취소"
        placeholder=""
        variant="filled"
        value={editorStore.searchInputValue}
        onChange={handleChange}
        onSearchClick={handleSearch}
        onBtnTextClick={handleCancel}
      />
    </SearchFieldWrapper>
  );
};

export default React.memo(InPageSearchBar);
