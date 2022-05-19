import React from 'react';
import { useStore } from '@mhooks/useStore';
import LongPressable from 'react-longpressable';
import PageItem from '@mcomponents/PageItem';
import { PageListWrapper, PageItemDivider } from '@mstyles/ListItemStyle';
import { useNavigate } from 'react-router-dom';
import useRoute from '@mhooks/useRoute';

interface ITag {
  id: string;
  name: string;
}
interface IPage {
  id: string;
  name: string;
  content?: string;
  textContent?: string;
  chapterId?: string;
  favorite?: boolean;
  read?: boolean;
  updatedUserId?: string;
  tagList: Array<ITag>;
}

type Props = {
  pageList: Array<IPage>;
  isSelected: (value: string) => boolean;
  toggleSelected: (value: string) => void;
  isRecycleBin?: boolean;
};

const PageList: React.FC<Props> = ({ pageList, isSelected, toggleSelected, isRecycleBin }) => {
  const navigate = useNavigate();
  const { pageStore } = useStore();
  const { routeTo } = useRoute();

  const handleItemLongPress = id => () => {
    if (pageStore.isLongPressed) return;
    toggleSelected(id);
    pageStore.changeMode();
  };

  const handleItemShortPress = page => () => {
    toggleSelected(page.id);
  };

  const handleItemPress =
    ({ id }) =>
    () => {
      console.log(routeTo('content'));
      navigate(routeTo('content'), {
        state: { id, ...{ panel: 'content', isNewPage: false, isRecycleBin } },
      });
    };

  return (
    <PageListWrapper>
      {pageList.map(page => (
        <React.Fragment key={page.id}>
          <LongPressable
            onLongPress={handleItemLongPress(page.id)}
            onShortPress={() => console.log('short pressd')}
            longPressTime={700}
          >
            <PageItem
              page={page}
              isSelected={isSelected}
              handleItemPress={pageStore.isLongPressed ? handleItemShortPress : handleItemPress}
              tagList={page.tagList ? page.tagList : []}
            />
          </LongPressable>
          <PageItemDivider />
        </React.Fragment>
      ))}
    </PageListWrapper>
  );
};

PageList.defaultProps = {
  isRecycleBin: false,
};

export default PageList;
