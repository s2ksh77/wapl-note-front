import { observer } from 'mobx-react-lite';

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

const NoteHeader = observer(() => {
  const Header = ({ view }) => {
    switch (view) {
      case 'myNote':
        return <div>MyNote Header</div>;
      default:
        return <div>Default Header</div>;
    }
  };

  return (
    <>
      {/* <></> */}
      <Header view="myNote" />
    </>
  );
});

export default NoteHeader;
