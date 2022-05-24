/* eslint-disable consistent-return */
import {
  FilterChipContainer,
  NoteViewBodyWrapper as SearchViewBodyWrapper,
  Scrollable,
  SearchResultWrapper,
} from '@mstyles/ContentStyle';
import { Chip, Icon, styled } from '@wapl/ui';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuType } from '../@types/common';
import ChapterList from './ChapterList';
import { TLocation } from './NoteAppBar';
import PageList from './PageList';
import RoomList from './RoomList';

const SearchView: React.FC = () => {
  const {
    state: { searchResult },
  } = useLocation() as TLocation;
  const [selectFilter, setSelectFilter] = useState('');
  const [filterChips, setFilterChips] = useState([]);

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

  const getLabel = () => {
    switch (selectFilter) {
      case MenuType.TALKROOM:
        return '톡 룸';
      case MenuType.CHAPTER:
        return '챕터';
      case MenuType.PAGE:
        return '페이지';
      case MenuType.TAG:
        return '태그';
      default:
    }
  };

  const initialchips = [
    {
      id: 'talk',
      label: '톡 룸',
      onDelete: null,
      onClick: () => setSelectFilter(MenuType.TALKROOM),
    },
    {
      id: 'chapter',
      label: '챕터',
      onDelete: null,
      onClick: () => setSelectFilter(MenuType.CHAPTER),
    },
    {
      id: 'page',
      label: '페이지',
      onDelete: null,
      onClick: () => setSelectFilter(MenuType.PAGE),
    },
    {
      id: 'tag',
      label: '태그',
      onDelete: null,
      onClick: () => setSelectFilter(MenuType.TAG),
    },
  ];

  const filteredChips = () => {
    const chip = [
      {
        id: selectFilter,
        label: getLabel(),
        onDelete: () => {
          setSelectFilter('');
          setFilterChips(initialchips);
        },
      },
    ];
    setFilterChips(chip);
  };

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
        return (
          <PageList
            pageList={MenuType.PAGE === selectFilter ? searchResult?.pageList : searchResult?.tagList}
            isSelected={id => false}
            toggleSelected={() => console.log('')}
          />
        );
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
        <PageList pageList={searchResult?.pageList} isSelected={id => false} toggleSelected={() => console.log('')} />
        <PageList pageList={searchResult?.tagList} isSelected={id => false} toggleSelected={() => console.log('')} />
      </>
    );
  });

  useEffect(() => {
    if (selectFilter) filteredChips();
  }, [selectFilter]);

  useEffect(() => {
    setFilterChips(initialchips);
  }, []);

  return (
    <SearchViewBodyWrapper>
      <FilterChipContainer>
        {filterChips.map(chip => {
          return <SChip {...chip} type="filter" />;
        })}
      </FilterChipContainer>
      <Scrollable>
        <SearchResultWrapper>
          <RenderView />
        </SearchResultWrapper>
      </Scrollable>
    </SearchViewBodyWrapper>
  );
};

export default SearchView;

const SChip = styled(Chip)`
  :not(:last-child) {
    margin-right: 6px;
  }
`;
