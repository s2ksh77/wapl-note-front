/* eslint-disable consistent-return */
import { styled } from '@wapl/ui';
import { useState, useEffect, useCallback, Suspense } from 'react';

/**
 * useSuspense Hook
 * @param {delay} number 로딩이 끝나고, 전환 되기 전 딜레이 시간 (ms)
 * @returns 현재 로딩여부, 실제 로드가 끝났는지 여부, Custom Suspense
 */

const useSuspense = ({ delay }) => {
  const [isPending, setIsPending] = useState(true);
  const [isFullfilled, setIsFullfilled] = useState(false);

  const CustomFallback = () => {
    // fallback에서 state 관리만
    useEffect(() => {
      setIsPending(true);
      setIsFullfilled(false);
      return () => setIsFullfilled(true);
    }, []);

    return null;
  };

  const CustomSuspense = (isPending, children) => {
    return (
      <Suspense fallback={<CustomFallback />}>
        <Children isPending={isPending}>{children}</Children>
      </Suspense>
    );
  };

  const suspense = useCallback(({ children }) => CustomSuspense(isPending, children), [isPending]);

  useEffect(() => {
    if (!isFullfilled) return;
    const timer = setTimeout(() => setIsPending(false), delay);
    return () => clearTimeout(timer);
  }, [isFullfilled, delay]);

  return {
    isPending,
    isFullfilled,
    setIsFullfilled,
    Suspense: suspense,
  };
};

export default useSuspense;

const Children = styled.div<{ isPending: boolean }>`
  display: ${({ isPending }) => (isPending ? 'none' : 'flex')};
`;
