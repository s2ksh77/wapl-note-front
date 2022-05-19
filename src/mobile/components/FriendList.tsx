import { ReactNode } from 'react';
import FriendItem from './FriendItem';
import { SelectType } from '../@types/common';
import useMultiSelect from '../hooks/useMultiSelect';

export interface IFriend {
  id: string;
  name: string;
  avatar: ReactNode;
}

type Props = {
  friendList?: Array<IFriend>;
};

const FriendList: React.FC<Props> = ({ friendList }) => {
  const { isSelected, toggleSelected } = useMultiSelect();
  const handleItemPress = id => () => {
    toggleSelected(id);
  };
  // 임시 컴포넌트..? 외부에서 만들어주려나

  return (
    <>
      {friendList.map(friend => (
        <FriendItem
          friend={friend}
          isSelectable
          selectType={SelectType.Checkbox}
          isSelected={isSelected}
          handleItemPress={handleItemPress}
        />
      ))}
    </>
  );
};

export default FriendList;
