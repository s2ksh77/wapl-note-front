import { useState, useLayoutEffect } from 'react';
import { AppBar, AppBarBackButton } from '@wapl/ui';
import { TalkNoteViewWrapper } from '@mstyles/ContentStyle';
import TalkNoteItem from '@mcomponents/TalkNoteItem';

const TalkNoteView: React.FC = () => {
  const [rooms, setRooms] = useState([]);

  const fetchRoomList = () => {
    setRooms([
      {
        key: 'roomId1',
        name: 'Example_Room_01',
        userCount: 9,
        // photo: '',
      },
      {
        key: 'roomId2',
        name: 'Example_Room_02',
        userCount: 9,
        // photo: '',
      },
      {
        key: 'roomId3',
        name: 'Example_Room_03',
        userCount: 3,
        // photo: '',
      },
      {
        key: 'roomId4',
        name: 'Example_Room_04',
        userCount: 1,
        // photo: '',
      },
    ]);
  };

  useLayoutEffect(() => {
    fetchRoomList();
  }, []);

  return (
    <>
      <AppBar leftSide={<AppBarBackButton />} title="톡 노트" />
      <TalkNoteViewWrapper>
        {rooms.map(room => (
          <TalkNoteItem photo={room.photo} name={room.name} userCount={room.userCount} />
        ))}
      </TalkNoteViewWrapper>
    </>
  );
};

export default TalkNoteView;
