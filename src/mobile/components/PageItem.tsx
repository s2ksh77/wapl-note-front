import React from 'react';
import { useNoteStore, PageModel } from '@wapl/note-core';
import { Icon, Checkbox, styled, Chip } from '@wapl/ui';
import {
  PageItemWrapper,
  PageItemHeaderWrapper,
  PageTitle,
  PageItemBodyWrapper,
  PageContent,
  PageBookmarkWrapper,
} from '@mstyles/ListItemStyle';
import { STagChipContainer } from '../styles/BodyStyle';

interface ITag {
  id: string;
  name: string;
}

type Props = {
  page: Partial<PageModel>;
  isSelected: (value: string) => boolean;
  handleItemPress: (id: string) => () => void;
  handleBookmarkPress: (id: string, favorite: boolean) => void;
  tagList?: Array<ITag>;
  color?: string;
};

const PageItem: React.FC<Props> = ({ page, isSelected, handleItemPress, handleBookmarkPress, tagList, color }) => {
  const { pageStore } = useNoteStore();

  const PageIcon = React.memo(() => {
    switch (color) {
      case 'SHARED_PAGE': // TODO: shared_page icon 다른건데 아직 없는건지 문의
      case 'SHARED':
        return <Icon.ShareLine width={20} height={20} />;
      case 'RECYCLE_BIN': // TODO: 휴지통 조회할 때 개별.. color..
        return null;
      default:
        return <Icon.PageFill width={20} height={20} color={color} />;
    }
  });

  return (
    <PageItemWrapper onClick={handleItemPress(page.id)}>
      <PageItemHeaderWrapper>
        {pageStore.isLongPressed ? <Checkbox checked={isSelected(page.id)} /> : <PageIcon />}
        <PageTitle>{page.name}</PageTitle>
        <PageBookmarkWrapper
          onClick={e => {
            e.stopPropagation();
            handleBookmarkPress(page.id, page.favorite);
          }}
        >
          <Icon.BookmarkFill width={18} height={18} color={page.favorite ? '#FCBB00' : '#ccc'} />
        </PageBookmarkWrapper>
      </PageItemHeaderWrapper>
      <PageItemBodyWrapper>
        <PageContent>
          {page.content
            ?.replace(/[<][^>]*[>]|&nbsp;|&zwj;/gi, '')
            .replace(/&lt;/gi, '<')
            .replace(/&gt;/gi, '>')}
        </PageContent>
      </PageItemBodyWrapper>
      {tagList.length > 0 && (
        <STagChipContainer>
          {tagList.map((tag: any) => {
            return <SChip {...tag} label={tag?.name} type="filter" />;
          })}
        </STagChipContainer>
      )}
    </PageItemWrapper>
  );
};

export default PageItem;

PageItem.defaultProps = {
  tagList: [],
  color: '',
};

const SChip = styled(Chip)`
  :not(:last-child) {
    margin-right: 6px;
  }
`;
