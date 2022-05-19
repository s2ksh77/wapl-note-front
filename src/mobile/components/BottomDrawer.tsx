import React from 'react';
import { Mui, Icon, ContextMenu, ContentMenuHeader, ContentMenuList, ContentMenuItem } from '@wapl/ui';
import {
  BDTitle,
  BDGridItemListWrapper,
  BDGridItemSwipeableListWrapper,
  BDGridItemWrapper,
  BDGridItemIconWrapper,
  BDGridItemText,
} from '@mstyles/ContentStyle';

export interface IDrawerItem {
  action: string;
  text: string;
  onClick: () => void;
}

type Props = {
  title: string;
  items: Array<IDrawerItem>;
  subItems?: Array<IDrawerItem>;
  open: boolean;
  onClose: () => void;
  layout?: string;
};

const BottomDrawer: React.FC<Props> = ({ title, items, subItems, open, onClose, layout }) => {
  const ItemIcon: React.FC<{ action: string; size: number }> = React.memo(({ action, size }) => {
    switch (action) {
      case 'talk':
        return <Icon.ChatLine width={size} height={size} />;
      case 'mail':
        return <Icon.MailLine width={size} height={size} />;
      case 'restore':
        return <Icon.RestoreLine width={size} height={size} />;
      case 'delete':
      case 'empty':
        return <Icon.DeleteLine width={size} height={size} />;
      case 'rename':
        return <Icon.EditLine width={size} height={size} />;
      case 'copy':
        return <Icon.CopyRelayLine width={size} height={size} />;
      case 'bookmark':
        return <Icon.BookmarkLine width={size} height={size} />;
      case 'export':
        return <Icon.ExportLine width={size} height={size} />;
      case 'move':
        return <Icon.MoveFolderLine width={size} height={size} />;
      case 'select':
        return <Icon.SelectLine width={size} height={size} />;
      default:
        return null;
    }
  });

  return layout === 'list' ? (
    <ContextMenu open={open} onClose={onClose}>
      <ContentMenuHeader>{title}</ContentMenuHeader>
      <ContentMenuList>
        {items.map(item => (
          <ContentMenuItem key={item.action} icon={<ItemIcon action={item.action} size={20} />} onClick={item.onClick}>
            {item.text}
          </ContentMenuItem>
        ))}
      </ContentMenuList>
    </ContextMenu>
  ) : (
    <Mui.Drawer
      sx={{ '.MuiDrawer-paper': { borderTopLeftRadius: '15px', borderTopRightRadius: '15px', overflowX: 'hidden' } }}
      anchor="bottom"
      open={open}
      onClose={onClose}
    >
      <BDTitle>{title}</BDTitle>
      <BDGridItemListWrapper>
        {items.map(item => (
          <BDGridItemWrapper key={item.action} onClick={item.onClick}>
            <BDGridItemIconWrapper>
              <ItemIcon action={item.action} size={24} />
            </BDGridItemIconWrapper>
            <BDGridItemText>{item.text}</BDGridItemText>
          </BDGridItemWrapper>
        ))}
      </BDGridItemListWrapper>
      <BDGridItemSwipeableListWrapper>
        {subItems.map(item => (
          <BDGridItemWrapper key={item.action} onClick={item.onClick}>
            <BDGridItemIconWrapper>
              <ItemIcon action={item.action} size={24} />
            </BDGridItemIconWrapper>
            <BDGridItemText>{item.text}</BDGridItemText>
          </BDGridItemWrapper>
        ))}
      </BDGridItemSwipeableListWrapper>
    </Mui.Drawer>
  );
};

BottomDrawer.defaultProps = {
  subItems: [],
  layout: 'list',
};

export default BottomDrawer;
