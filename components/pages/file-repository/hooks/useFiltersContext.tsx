import React from 'react';
import useUrlParamState from 'global/hooks/useUrlParamState';
import sqonBuilder from 'sqon-builder';
import stringify from 'fast-json-stable-stringify';
import { addInSQON } from '../utils';
import { FileRepoFiltersType, FieldOperator } from '../utils/types';

type FiltersContextType = {
  filters: FileRepoFiltersType;
  clearFilters: () => void;
  setFilterFromFieldAndValue: ({ field, value }: { field: string; value: string }) => void;
  replaceFilters: (filters: FileRepoFiltersType) => void;
};

export const defaultFilters: FileRepoFiltersType = {
  op: 'and',
  content: [],
};

const FiltersContext = React.createContext<FiltersContextType>({
  filters: defaultFilters,
  clearFilters: () => {},
  setFilterFromFieldAndValue: () => {},
  replaceFilters: () => {},
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

  const replaceFilters = filters => setCurrentFilters(filters);
  const setFilterFromFieldAndValue = ({ field, value }) => {
    const q = sqonBuilder.has(field, value).build();
    const ctx = addInSQON(q, currentFilters);
    setCurrentFilters(ctx);
  };

  const data = {
    filters: currentFilters,
    setFilterFromFieldAndValue,
    clearFilters,
    replaceFilters,
  };
  return <FiltersContext.Provider value={data}>{children}</FiltersContext.Provider>;
}

export default function useFiltersContext() {
  return React.useContext(FiltersContext);
}
