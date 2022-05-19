import { useState, useEffect } from 'react';
import { Dialog, DialogWrapper, DialogTitle, DialogContent, DialogButtonWrapper, DialogButton } from '@wapl/ui';
import { DialogInput } from '@mstyles/ContentStyle';

interface IDialogButton {
  variant: 'alert' | 'confirm' | 'dismiss';
  text: string;
  onClick: (value?: string) => void;
}

type Props = {
  open: boolean;
  title: string;
  value?: string;
  placeholder?: string;
  buttons: Array<IDialogButton>;
};

const InputDialog: React.FC<Props> = ({ open, title, value, placeholder, buttons }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (open) setInputValue(value);
  }, [open]);

  return (
    <Dialog open={open} onClose={() => setInputValue('')}>
      <DialogWrapper>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogInput
            value={inputValue}
            placeholder={placeholder || value}
            autoFocus
            onChange={e => setInputValue(e.target.value)}
          />
        </DialogContent>
      </DialogWrapper>
      <DialogButtonWrapper>
        {buttons.map(button => (
          <DialogButton variant={button.variant} onClick={() => button.onClick(inputValue)}>
            {button.text}
          </DialogButton>
        ))}
      </DialogButtonWrapper>
    </Dialog>
  );
};

InputDialog.defaultProps = {
  value: '',
  placeholder: '',
};

export default InputDialog;
