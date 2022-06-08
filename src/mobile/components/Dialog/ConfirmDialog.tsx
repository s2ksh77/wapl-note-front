import { Dialog, DialogWrapper, DialogTitle, DialogContent, DialogButtonWrapper, DialogButton } from '@wapl/ui';

interface IDialogButton {
  variant: 'alert' | 'confirm' | 'dismiss';
  text: string;
  onClick: () => void;
}

type Props = {
  open: boolean;
  title: string;
  content: string;
  buttons: Array<IDialogButton>;
};

const ConfirmDialog: React.FC<Props> = ({ open, title, content, buttons }) => {
  return (
    <Dialog open={open} onClose={() => console.log('close')}>
      <DialogWrapper>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
      </DialogWrapper>
      <DialogButtonWrapper>
        {buttons.map(button => (
          <DialogButton key={button.text} variant={button.variant} onClick={button.onClick}>
            {button.text}
          </DialogButton>
        ))}
      </DialogButtonWrapper>
    </Dialog>
  );
};

export default ConfirmDialog;
