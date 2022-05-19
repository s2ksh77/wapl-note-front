import { RoomListAvatar, RoomListItem, RoomListItemWrapper, RoomListName } from '@mstyles/ContentStyle';
import { Checkbox, Radio } from '@wapl/ui';
import { NoteViewSelectboxWrapper, FlexMainWrapper } from '@mstyles/ListItemStyle';
import { IRoom } from './RoomList';
import { SelectType } from '../@types/common';

type Props = {
  room: IRoom;
  isSelectable: boolean;
  selectType: SelectType;
  isSelected: (value: string) => boolean;
  handleItemPress: (id: string) => () => void;
};

const RoomItem: React.FC<Props> = ({ room, isSelectable, selectType, isSelected, handleItemPress }) => {
  // 임시 컴포넌트..? 외부에서 만들어주려나

  return (
    <RoomListItemWrapper id="roomListItem">
      <RoomListItem id="roomListItemWrapper">
        <FlexMainWrapper>
          <RoomListAvatar id="avatar">{room.avatar}</RoomListAvatar>
          <RoomListName id="name">{room.name}</RoomListName>
        </FlexMainWrapper>
        {isSelectable &&
          (selectType === SelectType.Checkbox ? (
            <NoteViewSelectboxWrapper onClick={handleItemPress(room.id)}>
              <Checkbox checked={isSelected(room.id)} />
            </NoteViewSelectboxWrapper>
          ) : (
            <NoteViewSelectboxWrapper onClick={handleItemPress(room.id)}>
              <Radio checked={isSelected(room.id)} />
            </NoteViewSelectboxWrapper>
          ))}
      </RoomListItem>
    </RoomListItemWrapper>
  );
};

export default RoomItem;

RoomItem.defaultProps = {
  isSelectable: false,
  selectType: SelectType.Checkbox,
  isSelected: () => false,
  handleItemPress: () => () => {
    return null;
  },
};
