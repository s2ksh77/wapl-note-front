/* eslint-disable consistent-return */
import { useNoteStore } from '@wapl/note-core';
import { Chip, styled } from '@wapl/ui';
import { useEffect, useState } from 'react';
import { MenuType } from '../@types/common';
import { FilterChipWrapper } from '../styles/ContentStyle';

type Props = {
  selectFilter: string;
  setSelectFilter: (value: string) => void;
  isSearchView?: boolean;
};

const FilterChipContainer: React.FC<Props> = ({ selectFilter, setSelectFilter, isSearchView = true }) => {
  const { uiStore } = useNoteStore();
  const [filterChips, setFilterChips] = useState([]);

  const getLabel = () => {
    switch (selectFilter) {
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
    if (!isSearchView) uiStore.setSelectFilter(selectFilter);
  };

  useEffect(() => {
    if (selectFilter) filteredChips();
  }, [selectFilter]);

  useEffect(() => {
    setFilterChips(initialchips);
  }, []);

  return (
    <FilterChipWrapper>
      {filterChips.map(chip => {
        return <SChip key={chip.id} {...chip} type="filter" />;
      })}
    </FilterChipWrapper>
  );
};

export default FilterChipContainer;

const SChip = styled(Chip)`
  :not(:last-child) {
    margin-right: 6px;
  }
`;
