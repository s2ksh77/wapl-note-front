// import { dummyTagList } from '@mdummies/tagList';
import React, { useEffect, useRef } from 'react';
import { useNoteStore } from '@wapl/note-core';
import { observer } from 'mobx-react';
import { Icon, Mui } from '@wapl/ui';
import { ContentWrapper as CategoriesWrapper, TagExpandIconWrapper } from '@mstyles/ContentStyle';
import { useNavigate } from 'react-router-dom';
import { CategoryIndex } from '@mstyles/BodyStyle';
import TagChipContainer from './TagChipContainer';
import useRoute from '../hooks/useRoute';
import useExpand from '../hooks/useExpand';
import { TAG_CHAPTER } from '../constant/routes';
import { RouteType } from '../@types/common';

const CategoriesList: React.FC = observer(() => {
  const navigate = useNavigate();
  const { routeTo } = useRoute();
  const { tagStore, noteStore } = useNoteStore();
  const searchResultRef = useRef();

  // 데이터 -> [KOR : [tagList], ENG : [tagList], NUM : [tagList], ETC : [tagList]
  const categoryinfo = {
    KOR: 'ㄱ ~ ㅎ', // i18n 적용시 변경
    ENG: 'A ~ Z',
    NUM: '0 ~ 9',
    ETC: '기타',
  };

  const handlePressTag = (tagId: string) => async () => {
    navigate(routeTo(RouteType.PRESS_CHAPTER), {
      state: { tagId },
    });
    localStorage.setItem('noteParam', tagId);
  };

  useEffect(() => {
    noteStore.setMarker(searchResultRef.current);
    noteStore.unmark({
      done: () => {
        noteStore.mark();
      },
    });
  });

  type CategoryProps = {
    category;
    values;
  };

  const Category: React.FC<CategoryProps> = React.memo(({ category, values }) => {
    const { isExpanded, toggleExpanded } = useExpand(!!values);
    return (
      <Mui.Accordion style={{ margin: 0 }} key={category} expanded={isExpanded}>
        <Mui.AccordionSummary
          expandIcon={
            <TagExpandIconWrapper onClick={toggleExpanded}>
              <Icon.ArrowBottomLine />
            </TagExpandIconWrapper>
          }
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
  });

  return (
    <CategoriesWrapper ref={searchResultRef} style={{ flexDirection: 'column', overflowY: 'auto' }}>
      {Object.entries(tagStore.sortedTagList).map(([category, values]) => (
        <Category category={category} values={values} />
      ))}
    </CategoriesWrapper>
  );
});

export default CategoriesList;
