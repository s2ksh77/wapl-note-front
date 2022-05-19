import { Icon } from '@wapl/ui';
import { TalkNoteItemWrapper, RoomTitle, RoomUserCount } from '@mstyles/ListItemStyle';

type Props = {
  photo: string;
  name: string;
  userCount: number;
};

const TalkNoteItem: React.FC<Props> = ({ photo, name, userCount }) => {
  return (
    <TalkNoteItemWrapper>
      <Icon.UserFill width={42} height={42} color="#ebebeb" />
      <RoomTitle>{name}</RoomTitle>
      {userCount > 1 && <RoomUserCount>{userCount}</RoomUserCount>}
    </TalkNoteItemWrapper>
  );
};

export default TalkNoteItem;
