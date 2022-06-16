import { useLayoutEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Editor from '@mcomponents/Editor';
import { Mui, Icon, Global } from '@wapl/ui';
import {
  EditorWrapper,
  TitleWrapper,
  ModifiedInfoWrapper,
  PageTitleInput,
  ModifiedInfo as ModifiedDate,
  ModifiedInfo as ModifiedUser,
} from '@mstyles/ContentStyle';
import { PageItemDivider as PageViewDivider } from '@mstyles/ListItemStyle';
import EditorTagList from '@mcomponents/EditorTagList';
import BottomDrawer from '@mcomponents/BottomDrawer';
import PageRestoreView from '@mcomponents/PageRestoreView';
import RenameDialog from '@mcomponents/dialog/InputDialog';
import RestoreDialog from '@mcomponents/dialog/ConfirmDialog';
import { useLocation } from 'react-router-dom';
import useRoute from '@mhooks/useRoute';
import { useNoteStore, PageModel, TagModel, ChapterModel } from '@wapl/note-core';
import { TagDTO } from '@wapl/note-core/dist/dts/models/dto/TagDTO';
import { TLocation } from '../@types/common';

const editingIcon = require('../assets/wapl-editing.gif');

const PageView: React.FC = observer(() => {
  const tempChannelId = '79b3f1b3-85dc-4965-a8a2-0c4c56244b82';
  const tempUserId = 'caf1a998-c39e-49d4-81c7-719f6cc624d9';
  // const {
  //   state: { id, isNewPage, isRecycleBin },
  // } = useLocation() as TLocation;
  const { state } = useLocation() as TLocation;
  const id = state?.id;
  const isNewPage = state?.isNewPage;
  const isRecycleBin = state?.isRecycleBin;
  const { chapterStore, pageStore, tagStore, editorStore, uiStore } = useNoteStore();
  const { goBack, isSearch } = useRoute();
  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);
  const [isUploadImageOpen, setUploadImageDrawerOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isRestoreViewOpen, setIsRestoreViewOpen] = useState(false);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [newPage, setNewPage] = useState(false);

  const moreItems = [
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
      action: 'bookmark',
      text: '즐겨찾기',
      onClick: () => console.log('즐겨찾기'),
    },
    {
      action: 'export',
      text: '내보내기',
      onClick: () => console.log('내보내기'),
    },
    {
      action: 'delete',
      text: '삭제',
      onClick: async () => {
        try {
          await pageStore.fetchPageInfoList(id, tempChannelId);
          if (pageStore.pageInfo.editingUserId) {
            setIsMoreDrawerOpen(false);
            // TODO: 삭제 불가 팝업
          } else {
            await pageStore.throwPage(tempChannelId, [pageStore.pageInfo]);
            setIsMoreDrawerOpen(false);
            goBack();
          }
        } catch (error) {
          console.log('throwPage Error', error);
        }
      },
    },
  ];

  const uploadItems = [
    {
      action: 'drive',
      text: '드라이브',
      onClick: () => {
        setUploadImageDrawerOpen(false);
        console.log('드라이브 첨부');
      },
    },
    {
      action: 'device',
      text: '내 기기',
      onClick: () => {
        setUploadImageDrawerOpen(false);
        console.log('내 기기 첨부');
      },
    },
  ];

  const moreItemsInRecycleBin = [
    {
      action: 'restore',
      text: '복원',
      onClick: async () => {
        const { normal } = await chapterStore.getChapterList('79b3f1b3-85dc-4965-a8a2-0c4c56244b82'); // chId 관리 필요
        setIsMoreDrawerOpen(false);
        if (normal.length === 0) {
          setIsRestoreDialogOpen(true);
        } else {
          setIsRestoreViewOpen(true);
        }
      },
    },
    {
      action: 'delete',
      text: '삭제',
      onClick: () => console.log('삭제'),
    },
  ];

  const fetchPageInfoList = async () => {
    await pageStore.fetchPageInfoList(id || pageStore.currentId, tempChannelId);
    tagStore.pageTagList = pageStore.pageInfo.tagList.map((tagData: TagDTO) => new TagModel(tagData));
  };

  useLayoutEffect(() => {
    if (id) {
      localStorage.setItem('noteParam', id);
      pageStore.currentId = id;
    } else {
      pageStore.currentId = localStorage.getItem('noteParam');
      if (isSearch) searchKeep();
    }
    setNewPage(isNewPage === undefined ? false : isNewPage);
    if (!newPage) {
      fetchPageInfoList();
    }
  }, [isNewPage]);

  const searchKeep = () => {
    uiStore.setSearchKey(localStorage.getItem('searchKey'));
    localStorage.removeItem('searchKey');
  };

  const handleBookmarkPress = async () => {
    try {
      const { id, favorite } = pageStore.pageInfo;
      if (favorite) await pageStore.unbookmarkPage(id);
      else await pageStore.bookmarkPage(id);
      pageStore.pageInfo.favorite = !favorite;
    } catch (error) {
      console.log('bookmarkPage error', error);
    }
  };

  const handleTitleChange = e => {
    pageStore.pageInfo.name = e.target.value;
  };

  const handleTitlePress = async () => {
    if (pageStore.pageInfo.editingUserId) return;
    const { editingUserId } = await pageStore.editPage(tempChannelId, pageStore.pageInfo.chapterId, pageStore.pageInfo);
    pageStore.pageInfo.editingUserId = editingUserId;
  };

  const getTitleFromContent = () => {
    const content = editorStore.tinymce?.getBody().children;
    if (!content) return '(제목 없음)';
    const targetNode = [...content].find(node => !!node.textContent);
    return targetNode?.textContent ?? '(제목 없음)';
  };

  const handleSave = () => {
    if (pageStore.pageInfo.editingUserId !== tempUserId) return;
    if (!pageStore.pageInfo.name) pageStore.pageInfo.name = getTitleFromContent();
    pageStore.savePage(tempChannelId, pageStore.pageInfo.chapterId, pageStore.pageInfo, isNewPage);
  };

  useLayoutEffect(() => {
    uiStore.setHeaderInfo({
      leftSide: [{ action: 'back' }],
      rightSide: [
        {
          action: 'search',
          onClick: () => {
            uiStore.toggleSearchBar();
            // 임시. 화면을 벗어나는 동작을 감지해서 저장하도록 수정 필요
            handleSave();
          },
        },
        { action: 'more', onClick: () => setIsMoreDrawerOpen(true) },
      ],
    });

    return () => handleSave();
  }, []);

  return (
    <>
      <Global
        styles={{
          '.tox-tinymce': {
            border: 'none !important',
          },
        }}
      />
      <EditorWrapper isReadMode={pageStore.pageInfo.editingUserId !== tempUserId}>
        <TitleWrapper>
          <Mui.IconButton style={{ padding: 0 }} onClick={handleBookmarkPress}>
            <Icon.BookmarkFill width={24} height={24} color={pageStore.pageInfo.favorite ? '#FCBB00' : '#ccc'} />
          </Mui.IconButton>
          <PageTitleInput
            placeholder="(제목 없음)"
            value={pageStore.pageInfo.name ?? ''}
            maxLength={200}
            onChange={handleTitleChange}
            onClick={handleTitlePress}
            readOnly={pageStore.pageInfo.editingUserId !== tempUserId}
          />
        </TitleWrapper>
        <PageViewDivider style={{ margin: '12px 0 0 0' }} />
        <ModifiedInfoWrapper>
          <ModifiedDate style={{ flex: 1 }}>{pageStore.pageInfo.modifiedDate}</ModifiedDate>
          {pageStore.pageInfo.editingUserId ? (
            <img src={editingIcon} alt="" />
          ) : (
            <ModifiedUser>{pageStore.pageInfo.updatedUserId}</ModifiedUser>
          )}
        </ModifiedInfoWrapper>
        <Editor setUploadDrawer={setUploadImageDrawerOpen} />
      </EditorWrapper>
      <EditorTagList data={tagStore.pageTagList} isReadMode={pageStore.pageInfo.editingUserId !== tempUserId} />
      <BottomDrawer
        title="더보기"
        items={isRecycleBin ? moreItemsInRecycleBin : moreItems}
        open={isMoreDrawerOpen}
        onClose={() => setIsMoreDrawerOpen(false)}
      />
      <BottomDrawer
        title="파일 첨부"
        items={uploadItems}
        open={isUploadImageOpen}
        onClose={() => setUploadImageDrawerOpen(false)}
        layout="grid"
      />
      <RenameDialog
        open={isRenameDialogOpen}
        title="페이지 이름 변경"
        value={pageStore.pageInfo.name}
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
                await pageStore.renamePage(tempChannelId, pageStore.pageInfo.chapterId, new PageModel({ id, name }));
                await fetchPageInfoList();
              } catch (error) {
                console.log('renamePage Error', error);
              }
            },
          },
        ]}
      />
      <PageRestoreView
        open={isRestoreViewOpen}
        restoreChapterId={pageStore.pageInfo.restoreChapterId}
        onClose={() => {
          setIsRestoreViewOpen(false);
        }}
      />
      <RestoreDialog
        open={isRestoreDialogOpen}
        title="페이지 복원"
        content="새 챕터에 해당 페이지가 복원됩니다."
        buttons={[
          {
            variant: 'dismiss',
            text: '취소',
            onClick: () => setIsRestoreDialogOpen(false),
          },
          {
            variant: 'confirm',
            text: '복원',
            onClick: async () => {
              const res = await chapterStore.createChapter(
                new ChapterModel({
                  color: chapterStore.RandomColor,
                  name: '새 챕터',
                }),
                'ko',
                '79b3f1b3-85dc-4965-a8a2-0c4c56244b82',
              );
              pageStore.pageInfo.restoreChapterId = res.id;
              await pageStore.restorePage(tempChannelId, [pageStore.pageInfo]);
              goBack();
              setIsRestoreDialogOpen(false);
            },
          },
        ]}
      />
    </>
  );
});

export default PageView;
