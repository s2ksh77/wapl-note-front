import { useState, useLayoutEffect } from 'react';
import { useNoteStore } from '@wapl/note-core';
import { TalkNoteViewWrapper } from '@mstyles/ContentStyle';
import TalkNoteItem from '@mcomponents/TalkNoteItem';
import { useCoreStore } from '@wapl/core';
import { useNavigate } from 'react-router-dom';
import useRoute from '../hooks/useRoute';
import { ROUTES } from '../constant/routes';

const TalkNoteView: React.FC = () => {
  const { uiStore } = useNoteStore();
  const { roomStore } = useCoreStore();
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const { routeTo } = useRoute();

  const fetchRoomList = async () => {
    const res = await roomStore.fetchRoomList();
    setRooms(res);
    // setRooms([
    //   {
    //     key: 'roomId1',
    //     name: 'Example_Room_01',
    //     userCount: 9,
    //     // photo: '',
    //   },
    //   {
    //     key: 'roomId2',
    //     name: 'Example_Room_02',
    //     userCount: 9,
    //     // photo: '',
    //   },
    //   {
    //     key: 'roomId3',
    //     name: 'Example_Room_03',
    //     userCount: 3,
    //     // photo: '',
    //   },
    //   {
    //     key: 'roomId4',
    //     name: 'Example_Room_04',
    //     userCount: 1,
    //     // photo: '',
    //   },
    // ]);
  };

  useLayoutEffect(() => {
    fetchRoomList();
    uiStore.setHeaderInfo({
      title: '톡 노트',
      rightSide: [{ action: 'search', onClick: () => uiStore.toggleSearchBar() }],
    });
  }, []);

  const handleItemPress = room => () => {
    const de = 'd0ebbd6a-c9b6-4c15-a718-b35165f2f5bf';
    const jw = 'abe573f5-103f-4613-80f5-d6a6691d3c8b';
    navigate(`${ROUTES.TALK_NOTE}/${de}`, { state: { id: de, name: room.name } });
  };

  return (
    <TalkNoteViewWrapper>
      {rooms?.map(room => (
        <TalkNoteItem
          room={room}
          key={room.id}
          photo={room.photo}
          name={room.name}
          userCount={room.userCount}
          handleItemPress={handleItemPress}
        />
      ))}
    </TalkNoteViewWrapper>
  );
};

export default TalkNoteView;
