import { Checkbox, Radio } from '@wapl/ui';
import {
  FriendAvatar,
  FriendItemWrapper,
  FriendName,
  NoteViewSelectboxWrapper,
  FlexMainWrapper,
} from '@mstyles/ListItemStyle';
import { IFriend } from './FriendList';
import { SelectType } from '../@types/common';

type Props = {
  friend: IFriend;
  isSelectable: boolean;
  selectType: SelectType;
  isSelected: (value: string) => boolean;
  handleItemPress: (id: string) => () => void;
};

const FriendItem: React.FC<Props> = ({ friend, isSelectable, selectType, isSelected, handleItemPress }) => {
  // 임시 컴포넌트..? 외부에서 만들어주려나

  return (
    <FriendItemWrapper>
      <FlexMainWrapper>
        <FriendAvatar id="avatar">{friend.avatar}</FriendAvatar>
        <FriendName id="name">{friend.name}</FriendName>
      </FlexMainWrapper>
      {isSelectable &&
        (selectType === SelectType.Checkbox ? (
          <NoteViewSelectboxWrapper onClick={handleItemPress(friend.id)}>
            <Checkbox checked={isSelected(friend.id)} />
          </NoteViewSelectboxWrapper>
        ) : (
          <NoteViewSelectboxWrapper onClick={handleItemPress(friend.id)}>
            <Radio checked={isSelected(friend.id)} />
          </NoteViewSelectboxWrapper>
        ))}
    </FriendItemWrapper>
  );
};

export default FriendItem;

FriendItem.defaultProps = {
  isSelectable: false,
  selectType: SelectType.Checkbox,
  isSelected: () => false,
  handleItemPress: () => () => {
    return null;
  },
};
