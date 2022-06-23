/* eslint-disable no-promise-executor-return */
import React, { useState, useLayoutEffect, useEffect, Suspense } from 'react';
import { observer } from 'mobx-react';
// import PageList from '@mcomponents/PageList';
import EmptyChapterView from '@mcomponents/EmptyChapterView';
import BottomDrawer, { IDrawerItem } from '@mcomponents/BottomDrawer';
import DeleteDialog from '@mcomponents/dialog/ConfirmDialog';
import InputDialog from '@mcomponents/dialog/InputDialog';
import PageMoveView from '@mcomponents/PageMoveView';
import { ContentWrapper, Scrollable, NewChapterButtonWrapper as NewPageButtonWrapper } from '@mstyles/ContentStyle';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@wapl/ui';
import { useNoteStore, ChapterModel, PageModel, ChapterType } from '@wapl/note-core';
import useMultiSelect from '../hooks/useMultiSelect';
import { RouteType, TLocation } from '../@types/common';
import { MENU_BOOKMARK, MENU_MYNOTE, MENU_RECENT, MENU_TALKNOTE, ROUTES } from '../constant/routes';
import LoadingSpinner, { PageLoadingSpinnerWrapper } from './LoadingSpinner';
import useRoute from '../hooks/useRoute';

// React.lazy 동작 안하려면 위에 import 부분 주석 해제, 이 부분 주석
// EmptyChapterView 잠시 빠짐
const PageList = React.lazy(() => {
  return new Promise(resolve => setTimeout(resolve, 1000)).then(() => import('@mcomponents/PageList'));
});

const ChapterView: React.FC = observer(() => {
  const tempChannelId = '79b3f1b3-85dc-4965-a8a2-0c4c56244b82';
  const { pageStore, chapterStore, tagStore, uiStore } = useNoteStore();
  // const {
  //   pathname,
  //   state: { id, isRecycleBin, tagId },
  // } = useLocation() as TLocation;
  const { pathname, state } = useLocation() as TLocation;
  const id = state?.id;
  const isRecycleBin = state?.isRecycleBin;
  const tagId = state?.tagId;
  const navigation = useNavigate();
  const { navTab } = useParams();
  const { goBack, isSearch, isTagChapter, routeTo } = useRoute();

  const { isSelected, toggleSelected, selectAll, deSelectAll, getSelectedCount, getSelectedItems } = useMultiSelect();
  const [pageList, setPageList] = useState([]);
  const [type, setType] = useState('');
  const [isShareDrawerOpen, setIsShareDrawerOpen] = useState(false);
  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPageMoveViewOpen, setIsPageMoveViewOpen] = useState(false);

  const shareItems: IDrawerItem[] = [
    {
      action: 'talk',
      text: '톡으로 전달',
      onClick: () => console.log('톡으로 전달'),
    },
    {
      action: 'mail',
      text: '메일로 전달',
      onClick: () => console.log('메일로 전달'),
    },
  ];

  const shareSubItems: IDrawerItem[] = [
    { action: 'app1', text: 'App Name', onClick: () => console.log('App') },
    { action: 'app2', text: 'App Name', onClick: () => console.log('App') },
    { action: 'app3', text: 'App Name', onClick: () => console.log('App') },
    { action: 'app4', text: 'App Name', onClick: () => console.log('App') },
  ];

  const moreItems: IDrawerItem[] = [
    {
      action: 'rename',
      text: '이름 변경',
      onClick: () => {
        setIsMoreDrawerOpen(false);
        setIsRenameDialogOpen(true);
      },
    },
    {
      action: 'copy',
      text: '사본 전달',
      onClick: () => console.log('사본 전달'),
    },
    {
      action: 'export',
      text: '내보내기',
      onClick: () => console.log('내보내기'),
    },
    {
      action: 'delete',
      text: '삭제',
      onClick: () => {
        setIsMoreDrawerOpen(false);
        setIsDeleteDialogOpen(true);
      },
    },
  ];

  const handleSelectAllPress = () => {
    selectAll(pageList.map(page => page.id));
    setIsMoreDrawerOpen(false);
  };

  const moreItemsInEditMode: IDrawerItem[] = [
    {
      action: 'move',
      text: '페이지 이동',
      onClick: () => {
        setIsPageMoveViewOpen(true);
        setIsMoreDrawerOpen(false);
      },
    },
    { action: 'select', text: '전체 선택', onClick: handleSelectAllPress },
  ];

  const moreItemsInRecycleBin: IDrawerItem[] = [
    {
      action: 'empty',
      text: '휴지통 비우기',
      onClick: () => console.log('휴지통 비우기'),
    },
  ];

  const handleCloseButtonPress = () => {
    pageStore.changeMode();
    deSelectAll();
  };

  const handlePageCreate = async () => {
    await pageStore.createPage(
      tempChannelId,
      id,
      new PageModel({
        chapterId: id,
        createdUserId: 'caf1a998-c39e-49d4-81c7-719f6cc624d9',
      }),
    );
    navigation(routeTo(RouteType.PRESS_PAGE), {
      state: { panel: 'content', isNewPage: true },
    });
  };

  const handlePageDelete = async () => {
    try {
      const pageIds = getSelectedItems();
      const editingUserIds = await pageStore.getEditingUserIds(pageIds, tempChannelId);
      if (editingUserIds.length > 0) {
        // TODO: 삭제 불가 팝업
      } else {
        await pageStore.throwPage(
          tempChannelId,
          pageIds.map(pageId => new PageModel({ id: pageId, chapterId: id })),
        );
      }
      handleCloseButtonPress();
    } catch (error) {
      console.log('page throw error', error);
    }
  };

  const handleChapterDelete = async () => {
    try {
      const editingUserIds = await chapterStore.getEditingUserIds([id], tempChannelId);
      if (editingUserIds.length > 0) {
        setIsDeleteDialogOpen(false);
        // TODO: 삭제 불가 팝업
      } else {
        await chapterStore.deleteChapter([new ChapterModel({ id })], tempChannelId);
        setIsDeleteDialogOpen(false);
        goBack();
      }
    } catch (error) {
      console.log('chapter delete error', error);
    }
  };

  const fetchTagPageList = async tagId => {
    const res = await tagStore.fetchTagPageList(tagId, tempChannelId);
    setPageList(res);
    uiStore.setHeaderTitle('');
  };

  const fetchList = async id => {
    const searchButtonInfo = { action: 'search', onClick: () => uiStore.toggleSearchBar() };
    const moreButtonInfo = { action: 'more', onClick: () => setIsMoreDrawerOpen(true) };
    let res;
    if (tagId) {
      fetchTagPageList(tagId);
      return;
    }
    switch (navTab) {
      case MENU_MYNOTE:
        res = await chapterStore.getChapterInfoList(id, tempChannelId);
        setPageList(res.pageList);
        setType(res.type);
        uiStore.setHeaderInfo({
          title: res.name,
          leftSide: [{ action: 'back' }],
          rightSide: [searchButtonInfo, moreButtonInfo],
        });
        break;
      case MENU_TALKNOTE:
        // TODO
        break;
      case MENU_BOOKMARK:
        res = await pageStore.getBookmarkInChannel(tempChannelId);
        setPageList(res);
        uiStore.setHeaderInfo({
          title: '즐겨 찾기',
          rightSide: [searchButtonInfo],
        });
        break;
      case MENU_RECENT:
        res = await pageStore.getRecentList(tempChannelId, 10);
        setPageList(res);
        uiStore.setHeaderInfo({
          title: '최근',
          rightSide: [searchButtonInfo],
        });
        break;
      default:
    }
  };

  // 편집 모드에서 선택된 페이지 수 업데이트
  useEffect(() => {
    if (!pageStore.isLongPressed) return;
    uiStore.setHeaderTitle(`${getSelectedCount()}개 선택됨`);
  }, [getSelectedCount]);

  // 첫 렌더를 제외한 편집 모드 설정/해제 이후
  useEffect(() => {
    if (!isTagChapter) {
      if (!pageList.length) return;
      if (!pageStore.isLongPressed) {
        fetchList(chapterStore.currentId);
        return;
      }
      uiStore.setHeaderInfo({
        title: `${getSelectedCount()}개 선택됨`,
        leftSide: [{ action: 'close', onClick: handleCloseButtonPress }],
        rightSide: [
          { action: 'delete', onClick: handlePageDelete },
          { action: 'share', onClick: () => setIsShareDrawerOpen(true) },
          { action: 'more', onClick: () => setIsMoreDrawerOpen(true) },
        ],
      });
    } else {
      uiStore.setHeaderInfo({
        title: '',
        leftSide: [{ action: 'back' }],
        rightSide: [{ action: 'search', onClick: () => uiStore.toggleSearchBar() }],
      });
    }
  }, [pageStore.isLongPressed]);

  useLayoutEffect(() => {
    if (id || tagId) {
      localStorage.setItem('noteParam', id || tagId);
      chapterStore.currentId = id || tagId;
    } else {
      // 새로고침 처음 했을 때
      if (!chapterStore.currentId) chapterStore.currentId = localStorage.getItem('noteParam');
      // 페이지에 들어갔다가 뒤로가기 수행하고 또 새로고침 했을 때
      if (chapterStore.currentId !== localStorage.getItem('noteParam'))
        localStorage.setItem('noteParam', chapterStore.currentId);
      if (isSearch) searchKeep();
      if (isTagChapter) {
        fetchTagPageList(chapterStore.currentId);
        return;
      }
    }
    fetchList(chapterStore.currentId);
  }, [navTab]);

  const searchKeep = () => {
    uiStore.setSearchKey(localStorage.getItem('searchKey'));
    localStorage.removeItem('searchKey');
  };

  const isNormalChapter = type => {
    return type === ChapterType.DEFAULT || type === ChapterType.NOTEBOOK;
  };

  return (
    <ContentWrapper>
      <Suspense
        fallback={
          <PageLoadingSpinnerWrapper>
            <LoadingSpinner />
          </PageLoadingSpinnerWrapper>
        }
      >
        <Scrollable>
          <PageList
            pageList={pageList}
            setPageList={setPageList}
            isSelected={isSelected}
            toggleSelected={toggleSelected}
            isRecycleBin={isRecycleBin}
          />
        </Scrollable>
      </Suspense>
      {isRecycleBin ? (
        <BottomDrawer
          title="더보기"
          items={moreItemsInRecycleBin}
          open={isMoreDrawerOpen}
          onClose={() => setIsMoreDrawerOpen(false)}
        />
      ) : (
        <>
          <BottomDrawer
            title="사본 전달"
            items={shareItems}
            subItems={shareSubItems}
            open={isShareDrawerOpen}
            onClose={() => setIsShareDrawerOpen(false)}
            layout="grid"
          />
          <BottomDrawer
            title="더보기"
            items={pageStore.isLongPressed ? moreItemsInEditMode : moreItems}
            open={isMoreDrawerOpen}
            onClose={() => setIsMoreDrawerOpen(false)}
          />
          <InputDialog
            open={isRenameDialogOpen}
            title="챕터 이름 변경"
            value={uiStore.headerInfo.title}
            buttons={[
              {
                variant: 'dismiss',
                text: '취소',
                onClick: () => setIsRenameDialogOpen(false),
              },
              {
                variant: 'confirm',
                text: '변경',
                onClick: async name => {
                  setIsRenameDialogOpen(false);
                  try {
                    const res = await chapterStore.renameChapter(new ChapterModel({ id, name }), tempChannelId);
                    uiStore.setHeaderTitle(res.name);
                  } catch (error) {
                    console.log('renameChapter error', error);
                  }
                },
              },
            ]}
          />
          <DeleteDialog
            open={isDeleteDialogOpen}
            title="챕터 삭제"
            content="챕터에 속한 페이지는 휴지통으로 이동됩니다."
            buttons={[
              {
                variant: 'dismiss',
                text: '취소',
                onClick: () => setIsDeleteDialogOpen(false),
              },
              {
                variant: 'confirm',
                text: '삭제',
                onClick: handleChapterDelete,
              },
            ]}
          />
          <PageMoveView
            open={isPageMoveViewOpen}
            chapterId={chapterStore.currentId}
            pageList={getSelectedItems()}
            onClose={() => setIsPageMoveViewOpen(false)}
            onSuccess={handleCloseButtonPress}
          />
        </>
      )}
      {navTab === MENU_MYNOTE &&
        isNormalChapter(type) && ( // TODO: 전달 받은 챕터, 휴지통 때 unvisible
          <NewPageButtonWrapper onClick={handlePageCreate}>
            <Icon.Add2Fill width={48} height={48} color="#FF6258" />
          </NewPageButtonWrapper>
        )}
    </ContentWrapper>
  );
});

export default ChapterView;
