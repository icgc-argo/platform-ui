import React from 'react';
import useUrlParamState from 'global/hooks/useUrlParamState';
import sqonBuilder from 'sqon-builder';
import stringify from 'fast-json-stable-stringify';
import { addInSQON } from '../utils';
import { FiltersType, CombinationKeys, FieldOperator } from '../utils/types';

type FiltersContextType = {
  filters: FiltersType;
  clearFilters: () => void;
  setFilters: ({ field, value }: { field: string; value: string }) => void;
  setFiltersFromSqon: (filters: FiltersType) => void;
};

export const defaultFilters: FiltersType = {
  op: CombinationKeys.And,
  content: [],
};

const FiltersContext = React.createContext<FiltersContextType>({
  filters: defaultFilters,
  clearFilters: () => {},
  setFilters: () => {},
  setFiltersFromSqon: () => {},
});

const useFilterState = () => {
  const [currentFilters, setCurrentFilters] = useUrlParamState('filters', defaultFilters, {
    serialize: v => stringify(v),
    deSerialize: v => JSON.parse(v),
  });

  return { currentFilters, setCurrentFilters };
};

export function FiltersProvider({ children }) {
  const { currentFilters, setCurrentFilters } = useFilterState();

  const clearFilters = () => {
    setCurrentFilters(defaultFilters);
  };

  const setFiltersFromSqon = filters => setCurrentFilters(filters);
  const setFilters = ({ field, value }) => {
    const q = sqonBuilder.has(field, value).build();
    const ctx = addInSQON(q, currentFilters);
    setCurrentFilters(ctx);
  };

  const data = {
    filters: currentFilters,
    setFilters,
    clearFilters,
    setFiltersFromSqon,
  };
  return <FiltersContext.Provider value={data}>{children}</FiltersContext.Provider>;
}

export default function useFiltersContext() {
  return React.useContext(FiltersContext);
}
