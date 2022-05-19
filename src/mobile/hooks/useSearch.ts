import { useCallback, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useNoteStore } from '@wapl/note-core';
import { ROUTES } from '../constant/routes';
import useRoute from './useRoute';

interface Props {
  getValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (searchKey?: string) => void;
  handleClear: () => void;
  handleCancel: (fn: () => void) => void;
}

const useSearch = (): Props => {
  const [value, setValue] = useState('');
  const { navTab } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { noteStore } = useNoteStore();
  const { routeTo } = useRoute();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setValue(value);
  }, []);

  const handleSearch = useCallback(async (searchKey: string) => {
    const { chapterList, pageList, tagList } = await noteStore.getSearchList(
      searchKey,
      '79b3f1b3-85dc-4965-a8a2-0c4c56244b82',
    );

    navigate(routeTo('search'), {
      state: { searchKey, searchResult: { chapterList, pageList, tagList } },
    });
  }, []);

  const handleClear = useCallback(() => {
    console.log('clear임');
  }, []);

  const handleCancel = useCallback((fn: () => void) => {
    setValue('');
    fn();
  }, []);

  return {
    getValue: value,
    handleChange,
    handleSearch,
    handleClear,
    handleCancel,
  };
};

export default useSearch;
