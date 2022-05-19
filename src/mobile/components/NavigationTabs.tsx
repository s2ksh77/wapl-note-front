import { Tab } from '@mstyles/FooterStyle';

const NavigationTabs: React.FC<{ buttons: any[] }> = ({ buttons }) => {
  return (
    <>
      {buttons.map(button => (
        <Tab key={button.key} onClick={button.onClick}>
          {button.icon}
          {button.text}
        </Tab>
      ))}
    </>
  );
};

export default NavigationTabs;
