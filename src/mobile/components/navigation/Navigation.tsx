import { NavigationWrapper, Tabs, Tab } from '@mstyles/FooterStyle';
import { Icon } from '@wapl/ui';
import { useNavigate, useLocation } from 'react-router-dom';
// import { TLocation } from '@mcomponents/NoteAppBar';
import { ROUTES } from '@/mobile/constant/routes';
import NavigationTabs from './NavigationTabs';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  // const location = useLocation() as TLocation;

  const Navs = [
    {
      key: 'myNote',
      icon: <Icon.UserLine />,
      text: '내 노트',
      onClick: () => navigate(ROUTES.MY_NOTE, { state: { panel: 'chapter' } }),
    },
    {
      key: 'talkNote',
      icon: <Icon.ExitLine />,
      text: '톡 노트',
      onClick: () => navigate(ROUTES.TALK_NOTE, { state: { panel: 'chapter' } }), // TODO: TALKNOTE -> ROOMlIST -> CHAPTER -> PAGE
    },
    {
      key: 'bookmark',
      icon: <Icon.BookmarkLine />,
      text: '즐겨찾기',
      onClick: () => navigate(`${ROUTES.BOOKMARK}${ROUTES.CHAPTER_DETAIL}`, { state: { panel: 'chapter' } }),
    },
    {
      key: 'recent',
      icon: <Icon.TimeLine />,
      text: '최근',
      onClick: () => navigate(`${ROUTES.RECENT}${ROUTES.CHAPTER_DETAIL}`, { state: { panel: 'chapter' } }),
    },
  ];

  return (
    <NavigationWrapper isVisible>
      <Tabs>
        <NavigationTabs buttons={Navs} />
      </Tabs>
    </NavigationWrapper>
  );
};

export default Navigation;
