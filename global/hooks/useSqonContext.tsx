import React from 'react';
import useUrlParamState from 'global/hooks/useUrlParamState';
import sqonBuilder from 'sqon-builder';

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
  currentSQON: SqonType;
  clearSQON: () => any;
  setSQON: (SqonType) => void;
};

const defaultSqon = { op: 'and', content: [] } as SqonType;

const FiltersContext = React.createContext<SqonContextType>({
  currentSQON: defaultSqon,
  clearSQON: () => {},
  setSQON: (sqon: SqonType) => null,
});

export function FiltersProvider({ children }) {
  const [currentSQON, setCurrentSQON] = React.useState(defaultSqon);

  const [activeFilters, setActiveFilters] = useUrlParamState(
    'filters',
    JSON.stringify(currentSQON),
    {
      serialize: v => v,
      deSerialize: v => v,
    },
  );

  const clearSQON = () => {
    console.log('clearing sqon');
    setCurrentSQON(defaultSqon);
    setActiveFilters(JSON.stringify(defaultSqon));
  };

  const setSQON = mockSqon => {
    console.log('setting sqon');
    setCurrentSQON(mockSqon);
    setActiveFilters(JSON.stringify(mockSqon));
  };

  // return React.useContext(SqonContext);
  const data = {
    currentSQON,
    setSQON,
    clearSQON,
  };
  return <FiltersContext.Provider value={data}>{children}</FiltersContext.Provider>;
}

export default function useSqonContext() {
  return React.useContext(FiltersContext);
}
// export default useSqonContext;
