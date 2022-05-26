/* eslint-disable consistent-return */
import { NoteViewBodyWrapper as SearchViewBodyWrapper, Scrollable, SearchResultWrapper } from '@mstyles/ContentStyle';
import { Chip, Icon, styled } from '@wapl/ui';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuType } from '../@types/common';
import ChapterList from './ChapterList';
import FilterChipContainer from './FilterChipContainer';
import { TLocation } from './NoteAppBar';
import PageList from './PageList';
import RoomList from './RoomList';

const SearchView: React.FC = () => {
  const {
    state: { searchResult },
  } = useLocation() as TLocation;
  const [selectFilter, setSelectFilter] = useState('');

  const roomList = [
    {
      id: 'roomId1',
      name: 'Example_Room_01',
      userCount: 9,
      avatar: <Icon.Emoji6Color />,
    },
    {
      id: 'roomId2',
      name: 'Example_Room_02',
      userCount: 9,
      avatar: <Icon.Emoji6Color />,
    },
    {
      id: 'roomId3',
      name: 'Example_Room_03',
      userCount: 3,
      avatar: <Icon.Emoji6Color />,
    },
    {
      id: 'roomId4',
      name: 'Example_Room_04',
      userCount: 1,
      avatar: <Icon.Emoji6Color />,
    },
  ];

  const RenderView = React.memo(() => {
    if (!selectFilter) return <RenderAll />;
    switch (selectFilter) {
      case MenuType.TALKROOM:
        return <RoomList roomList={roomList} />;
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
        <RoomList roomList={roomList} />
        <ChapterList
          chapterList={searchResult?.chapterList}
          isSelected={id => false}
          toggleSelected={() => console.log('')}
          showDivider
          panel="search_chapter"
        />
        <PageList pageList={searchResult?.pageList} />
        <PageList pageList={searchResult?.tagList} />
      </>
    );
  });

  return (
    <SearchViewBodyWrapper>
      <FilterChipContainer selectFilter={selectFilter} setSelectFilter={setSelectFilter} />
      <Scrollable>
        <SearchResultWrapper>
          <RenderView />
        </SearchResultWrapper>
      </Scrollable>
    </SearchViewBodyWrapper>
  );
};

export default SearchView;
