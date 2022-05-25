/* eslint-disable consistent-return */
import { Chip, styled } from '@wapl/ui';
import { useEffect, useState } from 'react';
import { MenuType } from '../@types/common';
import { FilterChipWrapper } from '../styles/ContentStyle';

type Props = {
  selectFilter: string;
  setSelectFilter: (value: string) => void;
};

const FilterChipContainer: React.FC<Props> = ({ selectFilter, setSelectFilter }) => {
  const [filterChips, setFilterChips] = useState([]);

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

  useEffect(() => {
    if (selectFilter) filteredChips();
  }, [selectFilter]);

  useEffect(() => {
    setFilterChips(initialchips);
  }, []);

  return (
    <FilterChipWrapper>
      {filterChips.map(chip => {
        return <SChip {...chip} type="filter" />;
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
