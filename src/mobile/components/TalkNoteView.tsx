import { useState, useLayoutEffect } from 'react';
import { useNoteStore } from '@wapl/note-core';
import { TalkNoteViewWrapper } from '@mstyles/ContentStyle';
import TalkNoteItem from '@mcomponents/TalkNoteItem';

const TalkNoteView: React.FC = () => {
  const { uiStore } = useNoteStore();
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
    uiStore.setHeaderInfo({
      title: '톡 노트',
      rightSide: [{ action: 'search', onClick: () => uiStore.toggleSearchBar() }],
    });
  }, []);

  return (
    <TalkNoteViewWrapper>
      {rooms.map(room => (
        <TalkNoteItem photo={room.photo} name={room.name} userCount={room.userCount} />
      ))}
    </TalkNoteViewWrapper>
  );
};

export default TalkNoteView;
