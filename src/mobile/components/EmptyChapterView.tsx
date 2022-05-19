import { EmptyChapterViewBody, EmptyChapterText, EmptyChapterSubText } from '@mstyles/ContentStyle';
// import EmptyChapter from '../assets/EmptyChapter.svg';

const EmptyChapterView: React.FC = () => {
  return (
    <EmptyChapterViewBody>
      {/* <img src={EmptyChapter} alt="" /> */}
      <EmptyChapterText>페이지가 없습니다.</EmptyChapterText>
      <EmptyChapterSubText>{`시작하려면 '+'버튼을 클릭하세요.`}</EmptyChapterSubText>
    </EmptyChapterViewBody>
  );
};

export default EmptyChapterView;
