import React from 'react';
import useUrlParamState, { getParams } from 'global/hooks/useUrlParamState';
import sqonBuilder from 'sqon-builder';
import { useRouter } from 'next/router';
import stringify from 'fast-json-stable-stringify';

enum ArrayFieldKeys {
  In = 'in',
}
enum ScalarFieldKeys {
  GreaterThan = 'gt',
  LesserThan = 'lt',
}

enum CombinationKeys {
  And = 'and',
  Or = 'or',
  Not = 'not',
}

interface ArrayField {
  field: string;
  value: Array<string | number>;
}

interface ScalarField {
  field: string;
  value: number;
}

interface ArrayFieldOperator {
  op: ArrayFieldKeys;
  content: ArrayField;
}

interface ScalarFieldOperator {
  op: ScalarFieldKeys;
  content: ScalarField;
}

type FieldOperator = ArrayFieldOperator | ScalarFieldOperator;

interface CombinationOperator {
  op: CombinationKeys;
  content: Operator[];
}

type Operator = FieldOperator | CombinationOperator;

export type FiltersType = {
  op: CombinationKeys;
  content: Operator[];
};

type FiltersContextType = {
  filters: FiltersType;
  clearFilters: () => void;
  setFilters: (FiltersType) => void;
};

const defaultFilters = { op: 'and', content: [] } as FiltersType;

const FiltersContext = React.createContext<FiltersContextType>({
  filters: defaultFilters,
  clearFilters: () => {},
  setFilters: (filter: FiltersType) => null,
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

  const setFilters = filters => {
    setCurrentFilters(filters);
  };

  const data = {
    filters: currentFilters,
    setFilters,
    clearFilters,
  };
  return <FiltersContext.Provider value={data}>{children}</FiltersContext.Provider>;
}

export default function useFiltersContext() {
  return React.useContext(FiltersContext);
}
