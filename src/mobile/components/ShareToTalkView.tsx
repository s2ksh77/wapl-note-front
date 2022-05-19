import React, { useState } from 'react';
import { FullScreenDialog, AppBar, AppBarCloseButton, Button, Tabs, Tab, TabPanel, Icon } from '@wapl/ui';
import { ShareToTalkViewBody, ShareToTalkViewButtonsWrapper, ShareToTalkTabPanelWrapper } from '@mstyles/ContentStyle';
import RoomList from '@mcomponents/RoomList';
import FriendList from '@mcomponents/FriendList';

// import useMultiSelect from '../hooks/useMultiSelect';
// import { SelectType } from '../@types/common';

const ShareToTalkView: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState(1);
  // const { isSelected, toggleSelected, deSelectAll } = useMultiSelect();
  // const handleItemPress = id => () => {
  //   if (isSelected(id)) return;
  //   deSelectAll();
  //   toggleSelected(id);
  // };
  const roomList = [
    {
      id: 'roomId1',
      name: 'Example_Room_01',
      userCount: 9,
      avatar: <Icon.Emoji6Color />,
    },
    {
      id: 'roomId2',
      name: 'Example_Room_02',
      userCount: 9,
      avatar: <Icon.Emoji6Color />,
    },
    {
      id: 'roomId3',
      name: 'Example_Room_03',
      userCount: 3,
      avatar: <Icon.Emoji6Color />,
    },
    {
      id: 'roomId4',
      name: 'Example_Room_04',
      userCount: 1,
      avatar: <Icon.Emoji6Color />,
    },
  ];

  const friendList = [
    {
      id: 'friendId1',
      name: 'Example_Friend_01',
      avatar: <Icon.Emoji1Color />,
    },
    {
      id: 'friendId2',
      name: 'Example_Friend_02',
      avatar: <Icon.Emoji2Color />,
    },
    {
      id: 'friendId3',
      name: 'Example_Friend_03',
      avatar: <Icon.Emoji3Color />,
    },
    {
      id: 'friendId4',
      name: 'Example_Friend_04',
      avatar: <Icon.Emoji4Color />,
    },
    {
      id: 'friendId5',
      name: 'Example_Friend_05',
      avatar: <Icon.Emoji5Color />,
    },
  ];

  const handleChange = (event, val) => {
    console.log('hi', val);
    setValue(val);
  };

  const handleClick = () => {
    console.log('handle click');
  };

  return (
    <FullScreenDialog
      open={open}
      header={<AppBar leftSide={<AppBarCloseButton onClick={() => setOpen(false)} />} title="톡으로 전달" />}
    >
      <ShareToTalkViewBody>
        <Tabs name="share-to-talk-tabs" centered onChange={handleChange} sticky={0} toggleTab value={value}>
          <Tab label={<div>프렌즈</div>} />
          <Tab label={<div>룸</div>} />
        </Tabs>
        <ShareToTalkTabPanelWrapper>
          <TabPanel index={0} value={value}>
            <FriendList friendList={friendList} />
          </TabPanel>
          <TabPanel index={1} value={value}>
            <RoomList roomList={roomList} />
          </TabPanel>
        </ShareToTalkTabPanelWrapper>

        <ShareToTalkViewButtonsWrapper>
          <Button width="100%" size="extra-large" onClick={handleClick}>
            공유
          </Button>
        </ShareToTalkViewButtonsWrapper>
      </ShareToTalkViewBody>
    </FullScreenDialog>
  );
};

export default ShareToTalkView;
