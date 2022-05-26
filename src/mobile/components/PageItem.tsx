import { useNoteStore } from '@wapl/note-core';
import { Icon, Checkbox, styled, Chip } from '@wapl/ui';
import {
  PageItemWrapper,
  PageItemHeaderWrapper,
  PageTitle,
  PageItemBodyWrapper,
  PageContent,
} from '@mstyles/ListItemStyle';

interface IPage {
  id: string;
  name: string;
  noteContet?: string;
  textContent?: string;
  chapterId?: string;
  favorite?: boolean;
  read?: boolean;
  updatedUserId?: string;
}

interface ITag {
  id: string;
  name: string;
}

type Props = {
  page: IPage;
  isSelected: (value: string) => boolean;
  handleItemPress: (id: string) => () => void;
  tagList?: Array<ITag>;
};

const PageItem: React.FC<Props> = ({ page, isSelected, handleItemPress, tagList }) => {
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
        <Icon.BookmarkFill width={18} height={18} color={page.favorite ? '#FCBB00' : '#ccc'} />
      </PageItemHeaderWrapper>
      <PageItemBodyWrapper>
        <PageContent>{page.textContent}</PageContent>
      </PageItemBodyWrapper>
      {tagList?.map((tag: any) => {
        return <SChip {...tag} label={tag?.name} type="filter" />;
      })}
    </PageItemWrapper>
  );
};

export default PageItem;

const SChip = styled(Chip)`
  :not(:last-child) {
    margin-right: 6px;
  }
`;
