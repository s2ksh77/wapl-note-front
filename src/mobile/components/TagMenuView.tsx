import { useLayoutEffect } from 'react';
import { useNoteStore } from '@wapl/note-core';
import CategoriesList from './CategoriesList';

const TagMenuView: React.FC = () => {
  const tempChannelId = '79b3f1b3-85dc-4965-a8a2-0c4c56244b82';
  const { tagStore, uiStore } = useNoteStore();

  useLayoutEffect(() => {
    tagStore.fetchSortedTagList(tempChannelId);
    uiStore.setHeaderInfo({
      title: '태그',
      leftSide: [{ action: 'back' }],
      rightSide: [{ action: 'search', onClick: () => uiStore.toggleSearchBar() }],
    });
  }, []);

  return <CategoriesList />;
};

export default TagMenuView;
