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
} from './types';
import { defaultFilters as defaultEmptyFilters } from '../hooks/useFiltersContext';

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

export const combineValues: TCombineValues = (x, y) => {
  const xValue = [].concat(x.content.value || []);
  const yValue = [].concat(y.content.value || []);

  if (xValue.length === 0 && yValue.length === 0) return null;
  if (xValue.length === 0) return y;
  if (yValue.length === 0) return x;

  const merged = {
    op: x.op,
    content: {
      field: x.content.field,
      value: xValue
        .reduce((acc, v) => {
          if (acc.includes(v)) return acc.filter(f => f !== v);
          return [...acc, v];
        }, yValue)
        .sort(),
    },
  };

  return merged.content.value.length ? merged : null;
};

export const addInValue: TCombineValues = (operatorA, operatorB) => {
  const xValue = [].concat(operatorA.content.value || []);
  const yValue = [].concat(operatorB.content.value || []);
  console.log('B:', operatorB);
  if (xValue.length === 0 && yValue.length === 0) return null;
  if (xValue.length === 0) return operatorB;
  if (yValue.length === 0) return operatorA;

  const merged: FieldOperator = {
    op: 'in',
    content: {
      field: operatorA.content.field,
      value: xValue
        .reduce((acc, v) => {
          if (acc.includes(v)) return acc;
          return [...acc, v];
        }, yValue)
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
      .reduce((acc, filter) => {
        const foundOperator = acc.find(a => compareTerms(a, filter));
        if (!foundOperator) return [...acc, filter];
        return [
          ...acc.filter(f => !compareTerms(f, foundOperator)),
          combineValues(foundOperator, filter),
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
        const found = acc.find(a => compareTerms(a, filter));
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
        const found = acc.find(a => compareTerms(a, filter));
        if (!found) return [...acc, filter];
        return [
          ...acc.filter(y => y.content.field !== found.content.field),
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

// returns current value for a given field / operation
export const currentFieldValue = ({ filters, dotField, op }) =>
  filters.content.find(content => content.content.field === dotField && content.op === op).content
    .value;

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
    f => f.content.field === dotField && [].concat(f.content.value || []).includes(value),
  );
};

// true if field in
export const fieldInCurrentFilters = ({
  currentFilters,
  field,
}: {
  currentFilters: FieldOperator[];
  field: string;
}): boolean => currentFilters.some(f => f.content.field === field);

export const getFiltersValue = ({
  currentFilters,
  dotField,
}: {
  currentFilters: FieldOperator[];
  dotField: string;
}) => currentFilters.find(f => f.content.field === dotField);

export const removeFilter: (
  field: string,
  filters: FieldOperator | FileRepoFiltersType,
) => FileRepoFiltersType | FieldOperator | null | any = (field, filters) => {
  if (!filters) return null;
  if (!field) return filters;
  if (Object.keys(filters).length === 0) return filters;

  if (!Array.isArray(filters.content)) {
    const fieldFilter = typeof field === 'function' ? field : f => f === field;
    return fieldFilter(filters.content.field) ? null : (filters as FieldOperator);
  }

  const filteredContent = filters.content
    .map(filter => removeFilter(field, filter))
    .filter(Boolean);

  return filteredContent.length
    ? {
        ...filters,
        content: filteredContent,
      }
    : defaultEmptyFilters;
};
