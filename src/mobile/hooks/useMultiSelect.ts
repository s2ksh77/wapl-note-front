import { useState, useCallback } from 'react';

interface UseMultiSelect {
  isSelected: (id: string) => boolean;
  toggleSelected: (id: string) => void;
  selectAll: (items: Array<string>) => void;
  deSelectAll: () => void;
  getSelectedItems: () => Array<string>;
  getSelectedCount: () => number;
}

const useMultiSelect = (): UseMultiSelect => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const isSelected = id => {
    return selectedItems.has(id);
  };

  const toggleSelected = id => {
    if (selectedItems.has(id))
      setSelectedItems(prev => {
        const newSelectedItems = new Set(prev);
        newSelectedItems.delete(id);
        return newSelectedItems;
      });
    else setSelectedItems(prev => new Set(prev).add(id));
  };

  const selectAll = items => {
    setSelectedItems(new Set(items));
  };

  const deSelectAll = () => {
    setSelectedItems(new Set());
  };

  const getSelectedItems = () => {
    return Array.from(selectedItems);
  };

  const getSelectedCount = useCallback(() => {
    return selectedItems.size;
  }, [selectedItems]);

  return {
    isSelected,
    toggleSelected,
    selectAll,
    deSelectAll,
    getSelectedItems,
    getSelectedCount,
  };
};

export default useMultiSelect;
