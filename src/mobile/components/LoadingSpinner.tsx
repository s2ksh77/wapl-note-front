import { styled } from '@wapl/ui';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { CHAPTER_DETAIL, MY_NOTE } from '../constant/routes';
import { TLocation } from '../@types/common';

const LoadingSpinner: React.FC = () => {
  const { navTab } = useParams();
  const location = useLocation() as TLocation;

  const renderSkeleton = () => {
    // path 포함하고 있는지 여부로 분리해야 될 듯
    switch (location.pathname) {
      case MY_NOTE:
        return <Loader type="chapter" />;
      case `${MY_NOTE}${CHAPTER_DETAIL}`: // TODO: myNote navTab 설정
      case `/${navTab}${CHAPTER_DETAIL}`:
        return <Loader type="page" />;
      default:
        return <Loader type="chapter" />;
    }
  };

  const Loader: React.FC<{ size?: number; type?: string }> = React.memo(({ size = 5, type }) => {
    const arr = new Array(size).fill(null);
    return <>{arr.map(ar => loaderComponent(type, randomKey()))}</>;
  });

  const randomKey = () => {
    let result = '';
    const text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i += 1) result += text.charAt(Math.floor(Math.random() * text.length));

    return result;
  };

  const loaderComponent = (type, key) => {
    if (type === 'chapter') {
      return (
        <Wrapper key={key}>
          <CircleWrapper>
            <Circle />
          </CircleWrapper>
          <Info>
            <Name />
            <Name />
          </Info>
        </Wrapper>
      );
    }
    return (
      <PageWrapper key={key}>
        <PageCircleWrapper>
          <Circle />
        </PageCircleWrapper>
        <Info>
          <NameDiv>
            <PageName />
            <PageBookmark />
          </NameDiv>
          <PageContent />
        </Info>
      </PageWrapper>
    );
  };

  return <>{renderSkeleton()}</>;
};

export default LoadingSpinner;

const Wrapper = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  width: inherit;
  margin: 8px 0px;
  overflow: visible;
`;

const SkeletonItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
  }
`;

const Circle = styled(SkeletonItem)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f2f2f2;
  position: relative;
  overflow: hidden;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
`;
const Name = styled(SkeletonItem)`
  width: 100%;
  height: 5px;
  padding: 8px;
  background: #f2f2f2;
  position: relative;
  overflow: hidden;
  :not(:last-child) {
    margin-bottom: 10px;
  }
`;

const CircleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PageWrapper = styled(Wrapper)`
  margin: 0px 15px;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  padding: 10px;
`;
const PageCircleWrapper = styled(CircleWrapper)`
  align-items: initial;
`;

const NameDiv = styled.div`
  width: 100%;
  display: flex;
`;

const PageName = styled(Name)`
  padding: 10px;
  width: 98%;
`;
const PageBookmark = styled(Name)`
  margin-left: 10px;
  padding: 10px;
  width: 2%;
`;
const PageContent = styled(Name)`
  padding: 20px;
`;

export const PageLoadingSpinnerWrapper = styled.div`
  width: auto;
  flex: 1 auto;
  flex-direction: column;
  margin: 16px 0px;
`;
