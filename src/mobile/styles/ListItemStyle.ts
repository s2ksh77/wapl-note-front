import { styled } from '@wapl/ui';

export const PageListWrapper = styled.div<{ isList: boolean }>`
  display: flex;
  flex-direction: column;
  width: auto;
  height: fit-content;
  border-radius: 10px;
  border: ${({ isList }) => (isList ? '1px solid #ebebeb' : '0')};
  margin: 16px 0;
  padding: 0 10px;
  background: #fff;
  flex: 1 auto;
`;

export const PageItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  margin: 14px 0 20px 0;
  user-select: none;
`;

export const PageItemHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  align-items: center;
  margin: 0 0 7px 0;
`;

export const PageTitle = styled.span`
  display: block;
  font-size: 15px;
  font-weight: 500;
  padding: 0 12px;
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const PageItemBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 23px 0 32px;
`;

export const PageContent = styled.span`
  display: flex;
  line-height: 16px;
  height: 32px;
  font-size: 13px;
  font-weight: 300;
  text-align: justify;
  overflow: hidden;
`;

export const PageItemDivider = styled.span`
  display: flex;
  width: auto;
  margin: 0 20px 0 32px;
  :not(:last-child) {
    border-bottom: 1px solid #ebebeb;
  }
`;

export const PageBookmarkWrapper = styled.div`
  cursor: pointer;
`;

export const NoteViewChapterListWrapper = styled.div<{
  showDivider: boolean;
}>`
  display: flex;
  width: auto;
  flex-direction: column;
  border-bottom: ${({ showDivider }) => (showDivider ? '12px solid #f5f5f5;' : '0px solid #ffffff;')};
`;

export const PageMoveViewChapterListWrapper = styled.div`
  display: flex;
  width: auto;
  height: 100%;
  flex-direction: column;
`;

export const PageRestoreViewChapterListWrapper = styled.div`
  display: flex;
  width: auto;
  height: 100%;
  overflow-y: auto;
  padding-inline: 18px;
  flex-direction: column;
`;

export const NoteViewMenuListItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 48px;
  flex-shrink: 0;
`;

export const NoteViewMenuListTitle = styled.div`
  display: flex;
  margin-left: 8px;
`;

export const NoteViewSelectboxWrapper = styled.div`
  margin-right: 8px;
`;

export const NoteViewMenuListWrapper = styled.div`
  display: flex;
  width: auto;
  flex-direction: column;
`;

export const TalkNoteItemWrapper = styled.div`
  display: flex;
  width: auto;
  height: fit-content;
  align-items: center;
  padding: 10px 0;
`;

export const RoomTitle = styled.span`
  display: block;
  font-size: 13px;
  font-weight: 400;
  padding: 0 4px 0 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const RoomUserCount = styled.span`
  display: flex;
  font-size: 13px;
  font-weight: 500;
  color: #999;
`;

export const FlexMainWrapper = styled.span`
  display: flex;
  flex: 1;
`;

export const FriendItemWrapper = styled.div`
  display: flex;
  height: 56px;
  width: auto;
  margin: 0 20px;
  align-items: center;
`;
export const FriendAvatar = styled.div`
  margin-right: 12px;
`;

export const FriendName = styled.div``;
