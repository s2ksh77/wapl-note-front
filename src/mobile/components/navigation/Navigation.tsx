import { NavigationWrapper, Tabs } from '@mstyles/FooterStyle';
import { Icon } from '@wapl/ui';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MENU_BOOKMARK, MENU_MYNOTE, MENU_RECENT, MENU_TALKNOTE, ROUTES } from '@/mobile/constant/routes';
import NavigationTabs from './NavigationTabs';
import useRoute from '@/mobile/hooks/useRoute';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const { isContent } = useRoute();
  const [navTab, setNavTab] = useState('');

  const Selected = menu => {
    return navTab === menu ? '#222222' : '#BDBDBD';
  };

  const Navs = [
    {
      key: 'myNote',
      icon: <Icon.UserFill color={Selected(MENU_MYNOTE)} />,
      text: '내 노트',
      onClick: () => navigate(ROUTES.MY_NOTE, { state: { panel: 'chapter' } }),
    },
    {
      key: 'talkNote',
      icon: <Icon.DriveTalkFill color={Selected(MENU_TALKNOTE)} />,
      text: '톡 노트',
      onClick: () => navigate(ROUTES.TALK_NOTE, { state: { panel: 'chapter' } }), // TODO: TALKNOTE -> ROOMlIST -> CHAPTER -> PAGE
    },
    {
      key: 'bookmark',
      icon: <Icon.BookmarkFill color={Selected(MENU_BOOKMARK)} />,
      text: '즐겨찾기',
      onClick: () => navigate(`${ROUTES.BOOKMARK}${ROUTES.CHAPTER_DETAIL}`, { state: { panel: 'chapter' } }),
    },
    {
      key: 'recent',
      icon: <Icon.TimeFill color={Selected(MENU_RECENT)} />,
      text: '최근',
      onClick: () => navigate(`${ROUTES.RECENT}${ROUTES.CHAPTER_DETAIL}`, { state: { panel: 'chapter' } }),
    },
  ];

  useEffect(() => {
    const match = window.location.pathname.match(/(?<=note\/)[a-zA-Z0-9_.-]*/i);
    if (match) setNavTab(match[0]);
  }, []);

  return (
    <NavigationWrapper isVisible={!isContent}>
      <Tabs>
        <NavigationTabs buttons={Navs} />
      </Tabs>
    </NavigationWrapper>
  );
};

export default Navigation;
