enum ArrayFieldKeys {
  In = 'in',
  Is = 'is',
}
export enum ScalarFieldKeys {
  GreaterThanEqualTo = '>=',
  LesserThanEqualTo = '<=',
  GreaterThan = '>',
  LesserThan = '<',
}

export enum CombinationKeys {
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

export interface ScalarFieldOperator {
  op: ScalarFieldKeys;
  content: ScalarField;
}

export type FieldOperator = ArrayFieldOperator | ScalarFieldOperator;

export interface CombinationOperator {
  op: CombinationKeys;
  content: Array<Operator>;
}

export type FiltersType =
  | {
      op: CombinationKeys;
      content: Operator[] | Array<undefined>;
    }
  | { op: string; content: any };

export type Operator = FieldOperator | CombinationOperator;

export type TValueSQON = {
  content: FieldOperator;
  op: ScalarFieldKeys | ArrayFieldKeys;
};

export type TCombineValues = (x: FieldOperator, y: FieldOperator) => any;

export type TMergeSQON = (q: FiltersType, c: FiltersType) => FiltersType | null;

export type TMergeEnum = boolean | 'toggle' | 'replace' | 'add';

export type TMergeFns = (v: TMergeEnum) => TMergeSQON;

export type TMergeQuery = (q: any, c: any, t: any) => any;

export type TFilterByWhitelist = (o: any, w: Array<string>) => any;

// export type TGroupContent = Array<TValueSQON>;
// export type TGroupOp = 'and' | 'or';
// export type TGroupSQON = {
//   content?: TGroupContent,
//   op?: TGroupOp,
// };

// export type TCombineValues = (x: TValueSQON, y: TValueSQON) => ?TValueSQON;

// export type TMergeSQON = (q: ?TGroupSQON, c: ?TGroupSQON) => ?TGroupSQON;

// export type TMergeFns = (v: TMergeEnum) => TMergeSQON;

// export type TMergeQuery = (
//   q: ?TUriQuery,
//   c: TRawQuery,
//   t: TMergeEnum,
// ) => TUriQuery;

export type TSortSQON = (a: FieldOperator, b: FieldOperator) => number;

// export type TFilterByWhitelist = (
//   o: ?TRawQuery,
//   w: ?Array<string>,
// ) => TRawQuery;

export type TRemoveSQON = (field: string, query: FiltersType | FieldOperator) => FiltersType;
