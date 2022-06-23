import { Icon } from '@wapl/ui';
import { TalkNoteItemWrapper, RoomTitle, RoomUserCount } from '@mstyles/ListItemStyle';

export interface IRoom {
  // for test
  id: string;
  name: string;
}

type Props = {
  room: IRoom;
  photo: string;
  name: string;
  userCount: number;
  handleItemPress?: (room: IRoom) => () => void;
};

const TalkNoteItem: React.FC<Props> = ({ room, photo, name, userCount, handleItemPress }) => {
  return (
    <TalkNoteItemWrapper onClick={handleItemPress(room)}>
      <Icon.UserFill width={36} height={36} color="#ebebeb" />
      <RoomTitle>{name}</RoomTitle>
      {userCount > 1 && <RoomUserCount>{userCount}</RoomUserCount>}
    </TalkNoteItemWrapper>
  );
};

export default TalkNoteItem;

TalkNoteItem.defaultProps = {
  handleItemPress: () => () => {
    return null;
  },
};
