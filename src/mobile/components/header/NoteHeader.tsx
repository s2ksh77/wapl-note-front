import { observer } from 'mobx-react-lite';
import { Icon, AppBar, AppBarButton, AppBarBackButton, AppBarCloseButton } from '@wapl/ui';
import { useNoteStore } from '@wapl/note-core';

export type TLocation = {
  pathname: string;
  state?: {
    panel?: string;
    id?: string;
    isNewPage?: boolean;
    isRecycleBin?: boolean;
    searchKey?: string;
    searchResult?: {
      chapterList?: [];
      pageList?: [];
      tagList?: [];
    };
  };
};

const NoteHeader = observer(() => {
  const { uiStore } = useNoteStore();

  const ButtonIcon = {
    search: <Icon.SearchLine width={24} height={24} />,
    character: <Icon.CharacterFill width={24} height={24} />,
    more: <Icon.MoreLine width={24} height={24} />,
    delete: <Icon.DeleteLine width={24} height={24} />,
    share: <Icon.ShareLine width={24} height={24} />,
    select: <Icon.SelectLine width={24} height={24} />,
    deselect: <Icon.UnselectLine width={24} height={24} />,
  };

  const Buttons = ({ buttons }) => {
    return buttons.map(button => {
      switch (button.action) {
        case 'back':
          return <AppBarBackButton to={-1} />;
        case 'close':
          return <AppBarCloseButton onClick={button.onClick} />;
        default:
          return (
            <AppBarButton key={button.action} onClick={button.onClick}>
              {ButtonIcon[button.action]}
            </AppBarButton>
          );
      }
    });
  };

  return (
    <AppBar
      style={{ padding: '0 6px 0 0' }}
      title={uiStore.headerInfo.title}
      leftSide={<Buttons buttons={uiStore.headerInfo.leftSide || []} />}
      rightSide={<Buttons buttons={uiStore.headerInfo.rightSide || []} />}
    />
  );
});

export default NoteHeader;
