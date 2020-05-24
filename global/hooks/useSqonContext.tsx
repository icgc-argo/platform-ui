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

type SqonType = {
  op: CombinationKeys;
  content: Operator[];
};

type SqonContextType = {
  filters: SqonType;
  clearSQON: () => any;
  setSQON: (SqonType) => void;
};

const defaultSqon = { op: 'and', content: [] } as SqonType;

const FiltersContext = React.createContext<SqonContextType>({
  filters: defaultSqon,
  clearSQON: () => {},
  setSQON: (sqon: SqonType) => null,
});

export function FiltersProvider({ children }) {
  const router = useRouter();
  const currentQuery = getParams(router);

  const [filters, setCurrentSQON] = React.useState(
    JSON.parse(currentQuery.filters || null) || defaultSqon,
  );

  const [activeFilters, setActiveFilters] = useUrlParamState('filters', filters, {
    serialize: v => stringify(v),
    deSerialize: v => JSON.parse(v),
  });

  const clearSQON = () => {
    setCurrentSQON(defaultSqon);
    setActiveFilters(defaultSqon);
  };

  const setSQON = sqon => {
    setCurrentSQON(sqon);
    setActiveFilters(sqon);
  };

  const data = {
    filters,
    setSQON,
    clearSQON,
  };
  return <FiltersContext.Provider value={data}>{children}</FiltersContext.Provider>;
}

export default function useSqonContext() {
  return React.useContext(FiltersContext);
}
