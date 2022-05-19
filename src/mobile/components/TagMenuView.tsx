import { useLayoutEffect } from 'react';
import { useStore } from '@mhooks/useStore';
import CategoriesList from './CategoriesList';
import NoteAppBar from './NoteAppBar';

const TagMenuView: React.FC = () => {
  const tempChannelId = '79b3f1b3-85dc-4965-a8a2-0c4c56244b82';
  const { tagStore } = useStore();
  useLayoutEffect(() => {
    tagStore.fetchSortedTagList(tempChannelId);
  }, []);

  return (
    <>
      <NoteAppBar title="태그" rightSide={[{ action: 'search', onClick: () => console.log('search') }]} />
      <CategoriesList />
    </>
  );
};

export default TagMenuView;
