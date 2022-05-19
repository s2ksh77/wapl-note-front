import { styled } from '@wapl/ui';

export const NavigationWrapper = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  width: 100%;
  height: fit-content;
  position: fixed;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #eee;
`;

export const Tabs = styled.nav`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 56px;
  justify-content: center;
`;

export const Tab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1 0 0;
`;

// export const Button = styled
