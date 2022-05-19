import { AppBar, AppBarCloseButton, AppBarBackButton } from '@wapl/ui';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NoteAppBarButton from './NoteAppBarButton';

export interface IButton {
  action: string;
  onClick: () => void;
}

export type TLocation = {
  pathname: string;
  state?: {
    panel?: string;
    id?: string;
    isNewPage?: boolean;
    isRecycleBin?: boolean;
    searchKey?: string;
    searchResult?: {
      chapterList?: [];
      pageList?: [];
      tagList?: [];
    };
  };
};

const NoteAppBar: React.FC<{
  title?: string;
  isLongPress?: boolean;
  closeFn?: () => void | null;
  rightSide?: Array<IButton>;
}> = observer(({ title, isLongPress = false, closeFn, rightSide }) => {
  const location = useLocation() as TLocation;
  const [view, setView] = useState('chapter');

  const setPanel = () => {
    switch (location.state?.panel) {
      case 'chapter':
        setView('chapter');
        break;
      case 'page':
        setView('page');
        break;
      case 'content':
        setView('content');
        break;
      case 'tag':
        setView('tag');
        break;
      default:
        break;
    }
  };

  const LeftSide = () => {
    if (!isLongPress) return view === 'chapter' ? null : <AppBarBackButton to={-1} />;
    return <AppBarCloseButton onClick={closeFn} />;
  };

  useEffect(() => {
    setPanel();
  }, [location.pathname]);

  return (
    <AppBar
      style={{ position: 'fixed', background: '#fff' }}
      title={title}
      leftSide={LeftSide()}
      rightSide={<NoteAppBarButton panel={view} isLongPress={isLongPress} buttons={rightSide} />}
    />
  );
});

export default React.memo(NoteAppBar);
