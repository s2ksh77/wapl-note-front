import { IButton } from '@mcomponents/NoteAppBar';
import { AppBarButton, AppBarMoreButton, Icon } from '@wapl/ui';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

/**
 *  Fn을 넘겨줄지 이곳에서 활용할지, context에 넣어둘지, uiStore에 로직 넣어둘지 고민 해봐야 될 듯
    panel: string;
    isLongPress: boolean;
    searchFn?: () => void | null;
    moreFn?: () => void | null;
    selectAllFn?: () => void | null;
    deSelectAllFn?: () => void | null;
    throwFn?: () => void | null;
    moveFn?: () => void | null;
 */

const NoteAppBarButton: React.FC<{
  panel?: string;
  isLongPress?: boolean;
  buttons?: Array<IButton>;
}> = observer(({ panel, isLongPress, buttons }) => {
  // const [isSelectedAll, setIsSeledtedAll] = useState(false);

  // const selectAllFn = () => {
  //   setIsSeledtedAll(!isSelectedAll);
  // };
  // const deSelectAllFn = () => {
  //   console.log('deSelectAllFn');
  // };
  // const searchFn = () => {
  //   console.log('searchFn');
  // };
  // const moreFn = () => {
  //   console.log('moreFn');
  // };
  // const throwFn = () => {
  //   console.log('throwFn');
  // };
  // const moveFn = () => {
  //   console.log('moveFn');
  // };

  // const LongPressedButton = () => {
  //   return panel === 'chapter' ? (
  //     <AppBarButton onClick={selectAllFn}>{isSelectedAll ? <>deselected</> : <Icon.CheckLine />}</AppBarButton>
  //   ) : (
  //     <AppBarButton onClick={moreFn}>
  //       <AppBarMoreButton />
  //     </AppBarButton>
  //   );
  // };

  // const RightSide = () => {
  //   return !isLongPress ? (
  //     <>
  //       <AppBarButton onClick={searchFn}>
  //         <Icon.SearchLine width={22} height={22} />
  //       </AppBarButton>
  //       <AppBarButton onClick={moreFn}>
  //         {panel === 'chapter' ? <Icon.MenuLine width={22} height={22} /> : <AppBarMoreButton />}
  //       </AppBarButton>
  //     </>
  //   ) : (
  //     <>
  //       <AppBarButton onClick={throwFn}>
  //         <Icon.DeleteLine />
  //       </AppBarButton>
  //       <AppBarButton onClick={moveFn}>
  //         <Icon.ShareLine />
  //       </AppBarButton>
  //       {LongPressedButton()}
  //     </>
  //   );
  // };

  // return RightSide();

  const ButtonIcon = {
    search: <Icon.SearchLine width={24} height={24} />,
    character: <Icon.CharacterFill width={24} height={24} />,
    more: <Icon.MoreLine width={24} height={24} />,
    delete: <Icon.DeleteLine width={24} height={24} />,
    share: <Icon.ShareLine width={24} height={24} />,
    select: <Icon.SelectLine width={24} height={24} />,
    deselect: <Icon.UnselectLine width={24} height={24} />,
  };

  return (
    <>
      {buttons.map(button => (
        <AppBarButton key={button.action} onClick={button.onClick}>
          {ButtonIcon[button.action]}
        </AppBarButton>
      ))}
    </>
  );
});

NoteAppBarButton.defaultProps = {
  panel: 'chapter',
  isLongPress: false,
  buttons: [],
};

export default React.memo(NoteAppBarButton);
