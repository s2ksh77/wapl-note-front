/* eslint-disable no-nested-ternary */
import { observer } from 'mobx-react-lite';
import { Icon, AppBar, AppBarButton, AppBarBackButton, AppBarCloseButton } from '@wapl/ui';
import { useNoteStore } from '@wapl/note-core';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import SearchBar from './SearchBar';
import InPageSearchBar from './InPageSearchBar';
import useSearch from '@/mobile/hooks/useSearch';
import { ROUTES, SEARCH_DETAIL, PAGE_DETAIL } from '@/mobile/constant/routes';
import useRoute from '@/mobile/hooks/useRoute';

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
  const { pathname } = useLocation();
  const { navTab } = useParams();
  const navigate = useNavigate();
  const { handleCancel, handleChange, handleSearch, getValue, setValue } = useSearch();
  const { isSearch } = useRoute();

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

  const isSearchInPage = () => {
    return pathname.includes(PAGE_DETAIL) && !pathname.includes(SEARCH_DETAIL);
  };

  const handleSearchVisible = () => {
    uiStore.toggleSearchBar();
    if (pathname.includes(SEARCH_DETAIL)) handleSearchCancel();
  };

  const handleSearchCancel = () => {
    navigate(navTab ? `${navTab}` : `${ROUTES.MY_NOTE}`);
    uiStore.setSearchKey('');
  };

  useEffect(() => {
    // navTab 이동시 초기화
    if (!isSearch && uiStore.isSearching) {
      uiStore.toggleSearchBar();
      uiStore.setSearchKey('');
      setValue('');
    }
  }, [window.location.pathname]);

  return !uiStore.isSearching ? (
    <AppBar
      style={{ padding: '0 6px 0 0' }}
      title={uiStore.headerInfo.title}
      leftSide={<Buttons buttons={uiStore.headerInfo.leftSide || []} />}
      rightSide={<Buttons buttons={uiStore.headerInfo.rightSide || []} />}
    />
  ) : isSearchInPage() ? (
    <InPageSearchBar handleSearchVisible={handleSearchVisible} />
  ) : (
    <SearchBar
      value={getValue || uiStore.searchKey}
      onChange={handleChange}
      onEnter={() => handleSearch(getValue)}
      onCancel={() => handleCancel(handleSearchVisible)}
    />
  );
});

export default NoteHeader;
