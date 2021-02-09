import {
  TMergeFilters,
  TCombineValues,
  TSortFilters,
  TRemoveFilter,
  FileRepoFiltersType,
  FieldOperator,
  ArrayFieldOperator,
  ScalarField,
  ArrayFieldKeys,
  ArrayField,
  ScalarFieldOperator,
  ArrayFieldValue,
  ScalarFieldValue,
  FilterField,
} from './types';
import { defaultFilters as defaultEmptyFilters } from '../hooks/useFiltersContext';
import { facetDisplayNames, tooltipContent } from './constants';

const IS_MISSING = '__missing__';

function compareTerms(a, b) {
  return (
    a.op.toLowerCase() === b.op.toLowerCase() &&
    (a.content.field ? a.content.field === b.content.field : a.content.entity === b.content.entity)
  );
}

const sortFilters: TSortFilters = (a, b) => {
  if (a.content.field && b.content.field) {
    return a.content.field.localeCompare(b.content.field);
  } else if (a.content.field || b.content.field) {
    return a.content.field ? -1 : 1;
  } else {
    return 0;
  }
};

export const combineValues: TCombineValues = (operatorA, operatorB) => {
  const operatorAValue = [].concat(operatorA.content.value || []);
  const operatorBValue = [].concat(operatorB.content.value || []);

  if (operatorAValue.length === 0 && operatorBValue.length === 0) return null;
  if (operatorAValue.length === 0) return operatorB;
  if (operatorBValue.length === 0) return operatorA;

  const merged = {
    op: operatorA.op,
    content: {
      field: operatorA.content.field,
      value: operatorAValue
        .reduce((acc, v) => {
          if (acc.includes(v)) return acc.filter((f) => f !== v);
          return [...acc, v];
        }, operatorBValue)
        .sort(),
    },
  };

  return merged.content.value.length ? merged : null;
};

export const addInValue: TCombineValues = (operatorA, operatorB) => {
  const operatorAValue = [].concat(operatorA.content.value || []);
  const operatorBValue = [].concat(operatorB.content.value || []);

  if (operatorAValue.length === 0 && operatorBValue.length === 0) return null;
  if (operatorAValue.length === 0) return operatorB;
  if (operatorBValue.length === 0) return operatorA;

  const merged: FieldOperator = {
    op: 'in',
    content: {
      field: operatorA.content.field,
      value: operatorAValue
        .reduce((acc, v) => {
          if (acc.includes(v)) return acc;
          return [...acc, v];
        }, operatorBValue)
        .sort(),
    },
  };

  return merged.content.value.length ? merged : null;
};

export const toggleFilter: TMergeFilters = (newFilter, currentFilters) => {
  if (!currentFilters && !newFilter) return null;
  if (!currentFilters) return newFilter;
  if (!newFilter) return currentFilters;
  const merged: FileRepoFiltersType = {
    op: 'and',
    content: currentFilters.content
      .reduce((acc, operator) => {
        const foundOperator = acc.find((a) => compareTerms(a, operator));
        if (!foundOperator) return [...acc, operator];
        return [
          ...acc.filter((f) => !compareTerms(f, foundOperator)),
          combineValues(foundOperator, operator),
        ].filter(Boolean);
      }, newFilter.content)
      .sort(sortFilters),
  };

  return merged.content.length ? merged : defaultEmptyFilters;
};

export const replaceFilter: TMergeFilters = (newFilter, currentFilters) => {
  if (!currentFilters && !newFilter) return null;
  if (!currentFilters) return newFilter;
  if (!newFilter) return currentFilters;

  const merged: FileRepoFiltersType = {
    op: 'and',
    content: currentFilters.content
      .reduce((acc, filter) => {
        const found = acc.find((a) => compareTerms(a, filter));
        if (!found) return [...acc, filter];
        return acc;
      }, newFilter.content)
      .sort(sortFilters),
  };

  return merged.content.length ? merged : defaultEmptyFilters;
};

export const addInFilters: TMergeFilters = (newFilter, currentFilter) => {
  if (!currentFilter && !newFilter) return null;
  if (!currentFilter) return newFilter;
  if (!newFilter) return currentFilter;

  const merged: FileRepoFiltersType = {
    op: 'and',
    content: currentFilter.content
      .reduce((acc, filter) => {
        const found = acc.find((a) => compareTerms(a, filter));
        if (!found) return [...acc, filter];
        return [
          ...acc.filter((y) => y.content.field !== found.content.field),
          addInValue(found, filter),
        ].filter(Boolean);
      }, newFilter.content)
      .sort(sortFilters),
  };

  return merged.content.length ? merged : defaultEmptyFilters;
};

export const currentFilterValue = (filters, entity = null) =>
  filters.content.find(
    ({ op, content }) => op === 'filter' && (!entity || entity === content.entity),
  ).content.value || '';

// returns current value as Array for a given field / operation
export const currentFieldValue = ({
  filters,
  dotField,
  op,
}: {
  filters: FileRepoFiltersType;
  dotField: string;
  op: string;
}): ArrayFieldValue | ScalarFieldValue | undefined => {
  const foundField = filters.content.find(
    (content) => content.content.field === dotField && content.op === op,
  );
  return foundField
    ? Array.isArray(foundField.content.value)
      ? foundField.content.value
      : [foundField.content.value]
    : undefined;
};

// true if field and value in
export const inCurrentFilters = ({
  currentFilters,
  value,
  dotField,
}: {
  currentFilters: FileRepoFiltersType;
  value: string;
  dotField: string;
}): boolean => {
  const content = currentFilters.content;
  return (Array.isArray(content) ? content : [].concat(currentFilters || [])).some(
    (f) => f.content.field === dotField && [].concat(f.content.value || []).includes(value),
  );
};

// true if field in
export const fieldInCurrentFilters = ({
  currentFilters,
  field,
}: {
  currentFilters: FieldOperator[];
  field: string;
}): boolean => currentFilters.some((f) => f.content.field === field);

export const getFiltersValue = ({
  currentFilters,
  dotField,
}: {
  currentFilters: FieldOperator[];
  dotField: string;
}) => currentFilters.find((f) => f.content.field === dotField);

export const removeFilter: TRemoveFilter = (field, filters) => {
  if (!filters) return null;
  if (!field) return filters;
  if (Object.keys(filters).length === 0) return filters;

  if (!Array.isArray(filters.content)) {
    const fieldFilter = typeof field === 'function' ? field : (f) => f === field;
    return fieldFilter(filters.content.field) ? null : filters;
  }

  const filteredContent = filters.content
    .map((filter) => removeFilter(field, filter))
    .filter(Boolean);

  return filteredContent.length
    ? ({
        ...filters,
        content: filteredContent,
      } as FileRepoFiltersType)
    : defaultEmptyFilters;
};

export const toDisplayValue: (value: string, field?: string) => string = (value, field) => {
  if (value === IS_MISSING) {
    return 'No Data';
  }

  if (!!field && !!value) {
    const displayName = getDisplayName(field, value);
    return displayName ? displayName : value;
  } else {
    return value;
  }
};

export const getTooltipContent = (name: string): React.ReactNode => tooltipContent[name];

export const getDisplayName = (facetName: string, fieldName: string): string =>
  facetDisplayNames[facetName]?.[fieldName];
