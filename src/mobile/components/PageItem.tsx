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
};

const PageItem: React.FC<Props> = ({ page, isSelected, handleItemPress, handleBookmarkPress, tagList }) => {
  const { pageStore } = useNoteStore();

  return (
    <PageItemWrapper onClick={handleItemPress(page.id)}>
      <PageItemHeaderWrapper>
        {pageStore.isLongPressed ? (
          <Checkbox checked={isSelected(page.id)} />
        ) : (
          <Icon.PageFill width={20} height={20} color="#fcbb00" />
        )}
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
};

const SChip = styled(Chip)`
  :not(:last-child) {
    margin-right: 6px;
  }
`;
