import { ReactNode } from 'react';
import RoomItem from './RoomItem';
import { SelectType } from '../@types/common';
import useMultiSelect from '../hooks/useMultiSelect';

export interface IRoom {
  id: string;
  name: string;
  userCount: number;
  avatar: ReactNode;
}

type Props = {
  roomList?: Array<IRoom>;
  isSelectable?: boolean;
};

const RoomList: React.FC<Props> = ({ roomList, isSelectable }) => {
  const { isSelected, toggleSelected } = useMultiSelect();
  const handleItemPress = id => () => {
    toggleSelected(id);
  };
  // 임시 컴포넌트..? 외부에서 만들어주려나

  return (
    <>
      {roomList.map(room => (
        <RoomItem
          room={room}
          isSelectable={isSelectable}
          selectType={SelectType.Checkbox}
          isSelected={isSelected}
          handleItemPress={handleItemPress}
        />
      ))}
    </>
  );
};

export default RoomList;

RoomList.defaultProps = {
  isSelectable: false,
};
