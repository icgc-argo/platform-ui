import {
  TMergeSQON,
  TCombineValues,
  TSortSQON,
  TRemoveSQON,
  FiltersType,
  FieldOperator,
  CombinationKeys,
  ArrayFieldKeys,
  ArrayFieldOperator,
  ScalarFieldOperator,
  ScalarFieldKeys,
  ScalarField,
  ArrayField,
} from './types';
import { defaultFilters as defaultEmptySQON } from '../hooks/useFiltersContext';

function compareTerms(a, b) {
  return (
    a.op.toLowerCase() === b.op.toLowerCase() &&
    (a.content.field ? a.content.field === b.content.field : a.content.entity === b.content.entity)
  );
}

const sortSQON: TSortSQON = (a, b) => {
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

export const addInValue: TCombineValues = (x, y) => {
  const xValue = [].concat(x.content.value || []);
  const yValue = [].concat(y.content.value || []);

  if (xValue.length === 0 && yValue.length === 0) return null;
  if (xValue.length === 0) return y;
  if (yValue.length === 0) return x;

  const merged = {
    op: ArrayFieldKeys.In,
    content: {
      field: x.content.field,
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

export const toggleSQON: TMergeSQON = (q, ctxq) => {
  if (!ctxq && !q) return null;
  if (!ctxq) return q;
  if (!q) return ctxq;

  const merged = {
    op: CombinationKeys.And,
    content: ctxq.content
      .reduce((acc, ctx) => {
        const found = acc.find(a => compareTerms(a, ctx));
        if (!found) return [...acc, ctx];
        return [...acc.filter(y => !compareTerms(y, found)), combineValues(found, ctx)].filter(
          Boolean,
        );
      }, q.content)
      .sort(sortSQON),
  };

  return merged.content.length ? merged : defaultEmptySQON;
};

export const replaceSQON: TMergeSQON = (q, ctxq) => {
  if (!ctxq && !q) return null;
  if (!ctxq) return q;
  if (!q) return ctxq;

  const merged = {
    op: CombinationKeys.And,
    content: ctxq.content
      .reduce((acc, ctx) => {
        const found = acc.find(a => compareTerms(a, ctx));
        if (!found) return [...acc, ctx];
        return acc;
      }, q.content)
      .sort(sortSQON),
  };

  return merged.content.length ? merged : defaultEmptySQON;
};

export const addInSQON: TMergeSQON = (q, ctxq) => {
  if (!ctxq && !q) return null;
  if (!ctxq) return q;
  if (!q) return ctxq;

  const merged = {
    op: CombinationKeys.And,
    content: ctxq.content
      .reduce((acc, ctx) => {
        const found = acc.find(a => compareTerms(a, ctx));
        if (!found) return [...acc, ctx];
        return [
          ...acc.filter(y => y.content.field !== found.content.field),
          addInValue(found, ctx),
        ].filter(Boolean);
      }, q.content)
      .sort(sortSQON),
  };

  return merged.content.length ? merged : defaultEmptySQON;
};

export const currentFilterValue = (sqon, entity = null) =>
  sqon.content.find(({ op, content }) => op === 'filter' && (!entity || entity === content.entity))
    .content.value || '';

export const setSQON = ({ value, field }: { value: string; field: string }) => ({
  op: CombinationKeys.And,
  content: [
    {
      op: ArrayFieldKeys.In,
      content: { field, value: [].concat(value || []) },
    },
  ],
});

// returns current value for a given field / operation
export const currentFieldValue = ({ sqon, dotField, op }) =>
  sqon.content.find(content => content.content.field === dotField && content.op === op).content
    .value;

// true if field and value in
export const inCurrentSQON = ({
  currentSQON,
  value,
  dotField,
}: {
  currentSQON: FiltersType;
  value: string;
  dotField: string;
}): boolean => {
  const content = currentSQON.content;
  return (Array.isArray(content) ? content : [].concat(currentSQON || [])).some(
    f => f.content.field === dotField && [].concat(f.content.value || []).includes(value),
  );
};

// true if field in
export const fieldInCurrentSQON = ({
  currentSQON,
  field,
}: {
  currentSQON: FieldOperator[];
  field: string;
}) => currentSQON.some(f => f.content.field === field);

export const getSQONValue = ({
  currentSQON,
  dotField,
}: {
  currentSQON: FieldOperator[];
  dotField: string;
}) => currentSQON.find(f => f.content.field === dotField);

type TMakeSQON = (fields: [{ field: string; value: string }]) => Object | string;
export const makeSQON: TMakeSQON = fields => {
  if (!fields.length) return {};
  return {
    op: CombinationKeys.And,
    content: fields.map(item => {
      return {
        op: ArrayFieldKeys.In,
        content: {
          field: item.field,
          value: [].concat(item.value || []),
        },
      };
    }),
  };
};

export const removeSQON: TRemoveSQON = (field, sqon) => {
  if (!sqon) return null;
  if (!field) return sqon;
  if (Object.keys(sqon).length === 0) return sqon;

  if (!Array.isArray(sqon.content)) {
    const fieldFilter = typeof field === 'function' ? field : f => f === field;
    return fieldFilter(sqon.content.field) ? null : (sqon as FieldOperator);
  }

  const filteredContent: Array<any> = sqon.content
    .map(q => removeSQON(field, q as FieldOperator))
    .filter(Boolean);

  return filteredContent.length
    ? {
        ...sqon,
        content: filteredContent,
      }
    : defaultEmptySQON;
};

export default makeSQON;
