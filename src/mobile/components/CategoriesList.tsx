// import { dummyTagList } from '@mdummies/tagList';
import { useStore } from '@mhooks/useStore';
import { observer } from 'mobx-react';
import { Icon, Mui } from '@wapl/ui';
import { ContentWrapper as CategoriesWrapper } from '@mstyles/ContentStyle';
import { CategoryIndex } from '@mstyles/BodyStyle';
import TagChipContainer from './TagChipContainer';

const CategoriesList: React.FC = observer(() => {
  const { tagStore } = useStore();

  // 데이터 -> [KOR : [tagList], ENG : [tagList], NUM : [tagList], ETC : [tagList]
  const categoryinfo = {
    KOR: 'ㄱ ~ ㅎ', // i18n 적용시 변경
    ENG: 'A ~ Z',
    NUM: '0 ~ 9',
    ETC: '기타',
  };

  const handlePressTag = (id: string) => () => {
    console.log(id);
  };

  return (
    <CategoriesWrapper style={{ flexDirection: 'column' }}>
      {Object.entries(tagStore.sortedTagList).map(([category, values]) => {
        return (
          <Mui.Accordion style={{ margin: 0, minHeight: 64 }} key={category}>
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
    </CategoriesWrapper>
  );
});

export default CategoriesList;
