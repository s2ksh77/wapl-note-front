import { useState } from 'react';

interface UseExpand {
  isExpanded: boolean;
  toggleExpanded: () => void;
}

const useExpand = (initialState: boolean): UseExpand => {
  const [isExpanded, setIsExpanded] = useState(initialState);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return {
    isExpanded,
    toggleExpanded,
  };
};

export default useExpand;
