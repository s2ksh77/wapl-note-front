import { useLayoutEffect, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Editor } from '@tinymce/tinymce-react';
import { Mui, Icon, Global } from '@wapl/ui';
import {
  TalkNoteViewWrapper as EditorWrapper,
  PageViewWrapper as TitleWrapper,
  PageViewWrapper as ModifiedInfoWrapper,
  PageTitleInput,
  ModifiedInfo as ModifiedDate,
  ModifiedInfo as ModifiedUser,
} from '@mstyles/ContentStyle';
import { PageItemDivider as PageViewDivider } from '@mstyles/ListItemStyle';
import NoteAppBar, { TLocation } from '@mcomponents/NoteAppBar';
import EditorTagList from '@mcomponents/EditorTagList';
import BottomDrawer from '@mcomponents/BottomDrawer';
import RenameDialog from '@mcomponents/dialog/InputDialog';
import { useLocation } from 'react-router-dom';
import useRoute from '@mhooks/useRoute';
import { useNoteStore, PageModel, TagModel } from '@wapl/note-core';

const PageView: React.FC = observer(() => {
  const tempChannelId = '79b3f1b3-85dc-4965-a8a2-0c4c56244b82';
  // const {
  //   state: { id, isNewPage, isRecycleBin },
  // } = useLocation() as TLocation;
  const { state } = useLocation() as TLocation;
  const id = state?.id;
  const isNewPage = state?.isNewPage;
  const isRecycleBin = state?.isRecycleBin;
  const { pageStore, tagStore, uiStore } = useNoteStore();
  const { goBack } = useRoute();
  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
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
          const res = await pageStore.throwPage(tempChannelId, pageStore.pageInfo);
          console.log(`${res.name} 페이지가 휴지통으로 이동되었습니다.`);
          setIsMoreDrawerOpen(false);
          goBack();
        } catch (error) {
          console.log('throwPage Error', error);
        }
      },
    },
  ];

  const moreItemsInRecycleBin = [
    {
      action: 'restore',
      text: '복원',
      onClick: async () => {
        if (!pageStore.pageInfo.restoreChapterId) {
          // TODO: 복원될 챕터 선택 화면 띄우기
          setIsMoreDrawerOpen(false);
          return;
        }

        try {
          const res = await pageStore.restorePage(tempChannelId, pageStore.pageInfo);
          console.log(`${res.name} 페이지가 복원되었습니다.`);
          setIsMoreDrawerOpen(false);
          goBack();
        } catch (error) {
          console.log('restorePage Error', error);
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
    await pageStore.fetchPageInfoList(pageStore.currentId, tempChannelId);
    tagStore.pageTagList = pageStore.pageInfo.tagList.map((tagData: any) => new TagModel(tagData));
  };

  useLayoutEffect(() => {
    if (id) {
      localStorage.setItem('noteParam', id);
      pageStore.currentId = id;
    } else {
      pageStore.currentId = localStorage.getItem('noteParam');
    }
    setNewPage(isNewPage);
    if (!isNewPage) {
      fetchPageInfoList();
      tagStore.fetchPageTagList(id);
    }
  }, [isNewPage]);

  const handleEditorChange = editorContent => {
    pageStore.pageInfo.content = editorContent;
  };

  const savePage = () => {
    pageStore.savePage(tempChannelId, pageStore.pageInfo.chapterId, pageStore.pageInfo, isNewPage);
  };

  const handleBookmarkPress = async () => {
    try {
      const { id, favorite } = pageStore.pageInfo;
      if (favorite) await pageStore.unbookmarkPage(id);
      else await pageStore.bookmarkPage(id);
      fetchPageInfoList();
    } catch (error) {
      console.log('bookmarkPage error', error);
    }
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
            savePage();
          },
        },
        { action: 'more', onClick: () => setIsMoreDrawerOpen(true) },
      ],
    });
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
      <EditorWrapper style={{ padding: '72px 16px 32px 16px' }}>
        <TitleWrapper>
          <Mui.IconButton style={{ padding: 0 }} onClick={handleBookmarkPress}>
            <Icon.BookmarkFill width={24} height={24} color={pageStore.pageInfo.favorite ? '#FCBB00' : '#ccc'} />
          </Mui.IconButton>
          <PageTitleInput value={pageStore.pageInfo.name} onChange={() => console.log('onChange')} />
        </TitleWrapper>
        <PageViewDivider style={{ margin: '12px 0 0 0' }} />
        <ModifiedInfoWrapper style={{ padding: '8px 0 32px 0' }}>
          <ModifiedDate style={{ flex: 1 }}>{pageStore.pageInfo.modifiedDate}</ModifiedDate>
          <ModifiedUser>{pageStore.pageInfo.updatedUserId}</ModifiedUser>
        </ModifiedInfoWrapper>
        <Editor
          apiKey="90655irb9nds5o8ycj2bpivk0v2y34e2oa6qta82nclxrnx3"
          initialValue={pageStore.pageInfo.content}
          init={{
            height: '100%',
            mobile: {
              menubar: false,
            },
            toolbar: false,
            statusbar: false,
            content_style: `
              body {
                margin: 0;
                font-size: 14px;
                font-weight: 400;
                color: #222;
              }
              p { margin: 0; }
            `,
          }}
          onEditorChange={handleEditorChange}
        />
      </EditorWrapper>
      <EditorTagList data={tagStore.pageTagList} />
      <BottomDrawer
        title="더보기"
        items={isRecycleBin ? moreItemsInRecycleBin : moreItems}
        open={isMoreDrawerOpen}
        onClose={() => setIsMoreDrawerOpen(false)}
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
    </>
  );
});

export default PageView;
