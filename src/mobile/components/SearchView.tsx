/* eslint-disable consistent-return */
import { NoteViewBodyWrapper as SearchViewBodyWrapper, Scrollable, SearchResultWrapper } from '@mstyles/ContentStyle';
import { useNoteStore } from '@wapl/note-core';
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuType, TLocation } from '../@types/common';
import useRoute from '../hooks/useRoute';
import useSearch from '../hooks/useSearch';
import ChapterList from './ChapterList';
import FilterChipContainer from './FilterChipContainer';
import PageList from './PageList';

const SearchView: React.FC = () => {
  const { state } = useLocation() as TLocation;
  const searchResult = state?.searchResult;
  const { uiStore, noteStore } = useNoteStore();
  const { handleSearch } = useSearch();
  const { isSearch } = useRoute();
  const [selectFilter, setSelectFilter] = useState('');
  const searchResultRef = useRef();

  const SearchResultMarker = React.memo(({ children }) => {
    return <div ref={searchResultRef}>{children}</div>;
  });

  const RenderView = React.memo(() => {
    if (!selectFilter) return <RenderAll />;
    switch (selectFilter) {
      case MenuType.CHAPTER:
        return (
          <ChapterList
            chapterList={searchResult?.chapterList}
            isSelected={id => false}
            toggleSelected={() => console.log('')}
            panel="search_chapter"
          />
        );
      case MenuType.PAGE:
      case MenuType.TAG:
        return <PageList pageList={MenuType.PAGE === selectFilter ? searchResult?.pageList : searchResult?.tagList} />;
      default:
        return <RenderAll />;
    }
  });

  const RenderAll = React.memo(() => {
    return (
      <>
        <ChapterList
          chapterList={searchResult?.chapterList}
          isSelected={id => false}
          toggleSelected={() => console.log('')}
          showDivider={false}
          panel="search_chapter"
        />
        <PageList pageList={searchResult?.pageList} />
        <PageList pageList={searchResult?.tagList} />
      </>
    );
  });

  useEffect(() => {
    if (uiStore.selectFilter) {
      setSelectFilter(uiStore.selectFilter);
      uiStore.setSelectFilter('');
    }
  }, []);

  useEffect(() => {
    if (searchResult === undefined && localStorage.getItem('searchKey')) {
      const searchKey = localStorage.getItem('searchKey');
      uiStore.toggleSearchBar();
      uiStore.setSearchKey(searchKey);
      handleSearch(searchKey);
      localStorage.removeItem('searchKey');
    }
  }, []);

  useEffect(() => {
    if (!isSearch) {
      return () => {
        uiStore.toggleSearchBar();
        uiStore.setSearchKey('');
      };
    }
  }, []);

  useEffect(() => {
    if (!uiStore.isSearching) uiStore.toggleSearchBar();
  }, [uiStore.isSearching]);

  useEffect(() => {
    noteStore.setMarker(searchResultRef.current);
    noteStore.unmark({
      done: () => {
        noteStore.mark();
      },
    });
  });

  return (
    <SearchViewBodyWrapper>
      <FilterChipContainer selectFilter={selectFilter} setSelectFilter={setSelectFilter} />
      <Scrollable>
        <SearchResultWrapper>
          <SearchResultMarker>
            <RenderView />
          </SearchResultMarker>
        </SearchResultWrapper>
      </Scrollable>
    </SearchViewBodyWrapper>
  );
};

export default SearchView;
