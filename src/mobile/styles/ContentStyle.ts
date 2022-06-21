import { css, styled } from '@wapl/ui';

export const RootWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

export const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 56px);
  background: #fafafa;
  // padding: 56px 0;
`;

export const NoteViewBodyWrapper = styled.div`
  display: flex;
  width: auto;
  height: calc(100% - 56px);
  flex-direction: column;
`;

export const Scrollable = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 0 16px;
`;

export const NewChapterButtonWrapper = styled.div`
  position: fixed;
  bottom: 72px;
  right: 16px;
`;

export const TalkNoteViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 0 16px;
`;

export const PageViewWrapper = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  align-items: center;
`;

export const PageTitleInput = styled.input`
  display: block;
  font-size: 28px;
  font-weight: 700;
  padding-left: 8px;
  flex: 1;
  border: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const ModifiedInfo = styled.div`
  display: flex;
  font-size: 12px;
  font-weight: 400;
  color: #8a8a8a;
`;

export const EditorTagListWrapper = styled.div<{ isReadMode: boolean }>`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: ${56}px;
  padding: 14px 0 14px 16px;
  align-items: center;
  border-top: 1px solid #eee;
  position: fixed;
  bottom: ${({ isReadMode }) => (isReadMode ? '0px' : '37px')};
  width: 100%;
`;

export const TagEditViewBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 12px 16px;
`;

export const TagInputWrapper = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  :not(:last-child) {
    margin-bottom: 12px;
  }
`;

export const InputField = styled.div`
  display: flex;
  flex: 1;
  height: 32px;
  background: #f5f5f5;
  padding: 0 4px 0 12px;
  border-radius: 8px;
  border: 1px solid transparent;
  :hover {
    border: 1px solid #222;
  }
  :not(:last-child) {
    margin-right: 12px;
  }
`;

export const TagInput = styled.input`
  display: flex;
  flex: 1;
  font-size: 16px;
  font-weight: 400;
  color: #222;
  background: transparent;
  border: none;
`;

export const TagListWrapper = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  flex-wrap: wrap;
  gap: 6px;
`;

export const TagChip = styled.div`
  display: flex;
  width: fit-content;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 16px;
`;

export const TagText = styled.span`
  display: flex;
  font-size: 13px;
  font-weight: 400;
  color: #222;
  :not(:last-child) {
    margin-right: 8px;
  }
`;

export const PageMoveViewBody = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: 100%;
`;

export const PageMoveViewButtonsWrapper = styled.div`
  display: flex;
  width: auto;
  height: 48px;
  justify-content: space-between;
  margin: 8px 16px 16px;
`;

export const ShareToTalkViewBody = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: 100%;
`;

export const ShareToTalkTabPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: 100%;
`;

export const ShareToTalkViewButtonsWrapper = styled.div`
  display: flex;
  width: auto;
  height: 48px;
  justify-content: space-between;
  margin: 0px 16px 16px 16px;
`;

export const PageRestoreViewBody = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: 100%;
`;

export const PageRestoreViewButtonsWrapper = styled.div`
  display: flex;
  width: auto;
  height: 48px;
  justify-content: space-between;
  margin: 0px 16px 16px 16px;
`;

export const FilterChipWrapper = styled.div`
  margin: 16px;
`;

export const SearchResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
`;

export const RoomListItem = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`;
export const RoomListItemWrapper = styled.div`
  display: flex;
  height: 56px;
  width: auto;
  margin: 0 20px;
`;
export const RoomListAvatar = styled.div`
  margin-right: 12px;
`;

export const RoomListName = styled.div``;

export const EmptyChapterViewBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

export const EmptyChapterText = styled.span`
  display: flex;
  font-size: 16px;
  font-weight: 400;
  color: #222;
  margin-top: 20px;
  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const EmptyChapterSubText = styled.span`
  display: flex;
  font-size: 14px;
  font-weight: 400;
  color: #9e9e9e;
`;

export const BDTitle = styled.span`
  display: flex;
  width: 100%;
  height: 65px;
  font-size: 16px;
  font-weight: 700;
  align-items: center;
  justify-content: center;
`;

export const BDGridItemListWrapper = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  padding: 16px 31px;
  :last-child {
    margin-bottom: 8px;
  }
`;

export const BDGridItemSwipeableListWrapper = styled(BDGridItemListWrapper)`
  overflow-x: scroll;
  padding: 4px 31px 16px 31px;
  :last-child {
    margin-bottom: 8px;
  }
`;

export const BDGridItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 52px;
  height: fit-content;
  :not(:last-child) {
    margin-right: 30px;
  }
`;

export const BDGridItemIconWrapper = styled.div`
  display: flex;
  width: 52px;
  height: 52px;
  background: #f5f5f5;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

export const BDGridItemText = styled.span`
  display: flex;
  font-size: 13px;
  font-weight: 400;
  white-space: nowrap;
  justify-content: center;
  margin-top: 12px;
`;

export const DialogInput = styled.input`
  display: flex;
  width: 100%;
  height: 32px;
  font-size: 16px;
  font-weight: 400;
  color: #222;
  background: #f5f5f5;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 0 12px;
`;

export const EditorWrapper = styled.div<{ isReadMode: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({ isReadMode }) => (isReadMode ? '100%' : 'calc(100% - 15px)')};
  margin-top: 15px;
  ${({ isReadMode }) =>
    isReadMode &&
    css`
      .tox-editor-header {
        display: none;
      }
      .tox .tox-edit-area__iframe {
        height: calc(100% - 54px) !important;
      }
    `};
  ${({ isReadMode }) =>
    !isReadMode &&
    css`
      .tox-editor-header {
        display: block;
      }
      .tox .tox-edit-area__iframe {
        height: calc(100% - 54px) !important;
      }
    `};
}
`;

export const ModifiedInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  align-items: center;
  padding: 8px 16px 32px 16px;
`;

export const TitleWrapper = styled(ModifiedInfoWrapper)`
  padding: 0 16px;
`;

export const TagExpandIconWrapper = styled.div`
  margin: 0px;
  padding: 0px;
`;
