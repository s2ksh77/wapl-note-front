/* eslint-disable no-promise-executor-return */
import React, { useState, useLayoutEffect, useEffect, Suspense } from 'react';
import { observer } from 'mobx-react';
// import PageList from '@mcomponents/PageList';
import EmptyChapterView from '@mcomponents/EmptyChapterView';
import BottomDrawer, { IDrawerItem } from '@mcomponents/BottomDrawer';
import DeleteDialog from '@mcomponents/Dialog/ConfirmDialog';
import InputDialog from '@mcomponents/Dialog/InputDialog';
import { ContentWrapper, Scrollable, NewChapterButtonWrapper as NewPageButtonWrapper } from '@mstyles/ContentStyle';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@wapl/ui';
import { useNoteStore, ChapterModel, PageModel } from '@wapl/note-core';
import useMultiSelect from '../hooks/useMultiSelect';
import NoteAppBar, { TLocation } from './NoteAppBar';
import { MENU_BOOKMARK, MENU_MYNOTE, MENU_RECENT, MENU_TALKNOTE, ROUTES } from '../constant/routes';
import LoadingSpinner, { PageLoadingSpinnerWrapper } from './LoadingSpinner';

const ChapterView: React.FC = observer(() => {
  const tempChannelId = '79b3f1b3-85dc-4965-a8a2-0c4c56244b82';
  const { pageStore, chapterStore, tagStore } = useNoteStore();
  const {
    pathname,
    state: { id, isRecycleBin, tagId },
  } = useLocation() as TLocation;
  const navigation = useNavigate();
  const { navTab } = useParams();

  const { isSelected, toggleSelected, selectAll, deSelectAll, getSelectedCount, getSelectedItems } = useMultiSelect();
  const [pageList, setPageList] = useState([]);
  const [chapterName, setChapterName] = useState('');
  const [newPageButtonVisible, setNewPageButtonVisible] = useState(true);
  const [isShareDrawerOpen, setIsShareDrawerOpen] = useState(false);
  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // React.lazy 동작 안하려면 위에 import 부분 주석 해제, 이 부분 주석
  // EmptyChapterView 잠시 빠짐
  const PageList = React.lazy(() => {
    return new Promise(resolve => setTimeout(resolve, 300)).then(() => import('@mcomponents/PageList'));
  });

  const shareItems: Array<IDrawerItem> = [
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

  const shareSubItems: Array<IDrawerItem> = [
    { action: 'app1', text: 'App Name', onClick: () => console.log('App') },
    { action: 'app2', text: 'App Name', onClick: () => console.log('App') },
    { action: 'app3', text: 'App Name', onClick: () => console.log('App') },
    { action: 'app4', text: 'App Name', onClick: () => console.log('App') },
  ];

  const moreItems: Array<IDrawerItem> = [
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

  const moreItemsInEditMode: Array<IDrawerItem> = [
    {
      action: 'move',
      text: '페이지 이동',
      onClick: () => console.log('페이지 이동'),
    },
    { action: 'select', text: '전체 선택', onClick: handleSelectAllPress },
  ];

  const moreItemsInRecycleBin: Array<IDrawerItem> = [
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

  const fetchList = async id => {
    let res;
    if (tagId) {
      res = await tagStore.fetchTagPageList(tagId, tempChannelId);
      setPageList(res);
      setChapterName('');
      return;
    }
    switch (navTab) {
      case MENU_MYNOTE:
        res = await chapterStore.getChapterInfoList(id, tempChannelId);
        setPageList(res.pageList);
        setChapterName(res.name);
        break;
      case MENU_TALKNOTE:
        // TODO
        break;
      case MENU_BOOKMARK:
        res = await pageStore.getBookmarkInChannel(tempChannelId);
        setPageList(res);
        setChapterName('즐겨 찾기');
        break;
      case MENU_RECENT:
        res = await pageStore.getRecentList(tempChannelId, 10);
        setPageList(res);
        setChapterName('최근');
        break;
      default:
    }
  };

  const handleCreatePage = () => {
    navigation(`/${pathname.split('/')[1]}${ROUTES.PAGE_DETAIL}`, {
      state: { panel: 'content', isNewPage: true },
    });
  };

  const handleDeletePage = async () => {
    const targetArray = getSelectedItems();
    const model = targetArray.map(id => new PageModel({ id }).response);
    // const res = await pageStore.deletePage(tempChannelId, model);
    // console.log(res);
  };

  useEffect(() => {
    fetchList(id);
  }, [navTab]);

  return (
    <>
      {pageStore.isLongPressed ? (
        <NoteAppBar
          title={`${getSelectedCount()}개 선택됨`}
          isLongPress
          closeFn={handleCloseButtonPress}
          rightSide={[
            { action: 'delete', onClick: () => handleDeletePage() },
            { action: 'share', onClick: () => setIsShareDrawerOpen(true) },
            { action: 'more', onClick: () => setIsMoreDrawerOpen(true) },
          ]}
        />
      ) : (
        <NoteAppBar
          title={chapterName}
          isLongPress={false}
          rightSide={[
            { action: 'search', onClick: () => console.log('search') },
            { action: 'more', onClick: () => setIsMoreDrawerOpen(true) },
          ]}
        />
      )}
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
              value={chapterName}
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
                      setChapterName(res.name);
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
                  onClick: () => setIsDeleteDialogOpen(false),
                },
              ]}
            />
          </>
        )}
        {newPageButtonVisible && ( // TODO: 전달 받은 챕터, 휴지통 때 unvisible
          <NewPageButtonWrapper onClick={() => handleCreatePage()}>
            <Icon.Add2Fill width={48} height={48} color="#FF6258" />
          </NewPageButtonWrapper>
        )}
      </ContentWrapper>
    </>
  );
});

export default ChapterView;
