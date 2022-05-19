import { NoteViewMenuListWrapper, NoteViewMenuListItemWrapper, NoteViewMenuListTitle } from '@mstyles/ListItemStyle';
import { Icon } from '@wapl/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constant/routes';

const MenuList: React.FC = ({ children }) => {
  const { pathname } = useLocation();
  const navigation = useNavigate();
  const handleTagMenuPress = () => {
    navigation(`${pathname}${ROUTES.TAG_DETAIL}`, { state: { panel: 'tag' } });
  };

  return (
    <NoteViewMenuListWrapper>
      {children}
      <NoteViewMenuListItemWrapper onClick={handleTagMenuPress}>
        <Icon.TagLine />
        <NoteViewMenuListTitle>태그</NoteViewMenuListTitle>
      </NoteViewMenuListItemWrapper>
    </NoteViewMenuListWrapper>
  );
};

export default MenuList;
