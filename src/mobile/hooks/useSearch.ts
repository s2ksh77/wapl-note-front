/* eslint-disable no-param-reassign */
import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNoteStore } from '@wapl/note-core';
import { toJS } from 'mobx';
import useRoute from './useRoute';
import { PANEL_TAG } from '../constant/routes';
import { RouteType } from '../@types/common';

interface Props {
  getValue: string;
  setValue: (text?: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (searchKey?: string) => void;
  handleClear: () => void;
  handleCancel: (fn: () => void) => void;
}

const useSearch = (): Props => {
  const tempChannelId = '79b3f1b3-85dc-4965-a8a2-0c4c56244b82';
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const { noteStore, tagStore } = useNoteStore();
  const { routeTo } = useRoute();
  const { pathname } = useLocation();

  const setValue = useCallback((text: string) => {
    setSearchValue(text);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setSearchValue(value);
  }, []);

  const handleSearch = useCallback(async (searchKey: string) => {
    // hook이기 때문에 상태가 새로 불리면서 useRoute 관련 state가 초기화가 됨.
    // 그래서 window.location 사용
    const { pathname } = window.location;
    if (!pathname.includes(PANEL_TAG)) {
      const { chapterList, pageList, tagList } = await noteStore.getSearchList(searchKey, tempChannelId);

      navigate(routeTo(RouteType.SEARCH), {
        state: { searchKey, searchResult: { chapterList, pageList, tagList } },
      });
      localStorage.setItem('searchKey', searchKey);
    } else handleTagSearch(searchKey);
  }, []);

  const handleTagSearch = useCallback(async (searchKey: string) => {
    await tagStore.fetchSearchTagList(tempChannelId, searchKey);
  }, []);

  const handleClear = useCallback(() => {
    console.log('clear임');
  }, []);

  const handleCancel = useCallback(async (fn: () => void) => {
    const { pathname } = window.location;
    setSearchValue('');
    fn();
    if (localStorage.getItem('searchKey')) localStorage.removeItem('searchKey');
    if (pathname.includes(PANEL_TAG)) await tagStore.fetchSortedTagList(tempChannelId);
  }, []);

  return {
    getValue: searchValue,
    setValue,
    handleChange,
    handleSearch,
    handleClear,
    handleCancel,
  };
};

export default useSearch;
