// import { dummyTagList } from '@mdummies/tagList';
import { useNoteStore } from '@wapl/note-core';
import { observer } from 'mobx-react';
import { Icon, Mui } from '@wapl/ui';
import { ContentWrapper as CategoriesWrapper } from '@mstyles/ContentStyle';
import { useNavigate } from 'react-router-dom';
import { CategoryIndex } from '@mstyles/BodyStyle';
import TagChipContainer from './TagChipContainer';
import useRoute from '../hooks/useRoute';
import { TAG_CHAPTER } from '../constant/routes';

const CategoriesList: React.FC = observer(() => {
  const navigate = useNavigate();
  const { routeTo } = useRoute();
  const { tagStore } = useNoteStore();

  // 데이터 -> [KOR : [tagList], ENG : [tagList], NUM : [tagList], ETC : [tagList]
  const categoryinfo = {
    KOR: 'ㄱ ~ ㅎ', // i18n 적용시 변경
    ENG: 'A ~ Z',
    NUM: '0 ~ 9',
    ETC: '기타',
  };

  const handlePressTag = (tagId: string) => async () => {
    navigate(routeTo(TAG_CHAPTER), {
      state: { tagId },
    });
    localStorage.setItem('noteParam', tagId);
  };

  return (
    <CategoriesWrapper style={{ flexDirection: 'column' }}>
      <div style={{ overflowY: 'auto' }}>
        {Object.entries(tagStore.sortedTagList).map(([category, values]) => {
          return (
            <Mui.Accordion style={{ margin: 0, minHeight: 64 }} key={category} expanded={!!values}>
              <Mui.AccordionSummary
                expandIcon={<Icon.ArrowBottomLine />}
                aria-controls="panel1a-content"
                style={{ minHeight: 64 }}
              >
                <Mui.Typography>{categoryinfo[category]}</Mui.Typography>
              </Mui.AccordionSummary>
              {values
                ? Object.entries(values)?.map(([tagKey, tagList]: [string, any]) => {
                    return (
                      <>
                        <CategoryIndex key={tagKey}>{tagKey}</CategoryIndex>
                        {/* {<Chips chipList={tag} />} */}
                        <TagChipContainer tagList={tagList} handlePressTag={handlePressTag} />
                      </>
                    );
                  })
                : ''}
            </Mui.Accordion>
          );
        })}
      </div>
    </CategoriesWrapper>
  );
});

export default CategoriesList;
