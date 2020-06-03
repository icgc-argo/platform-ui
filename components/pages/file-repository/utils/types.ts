export enum ArrayFieldKeys {
  In = 'in',
  Is = 'is',
  Filter = 'filter',
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

export interface ArrayField {
  field: string;
  value: Array<string | number>;
}

export interface ScalarField {
  field: string;
  value: number;
}

export interface ArrayFieldOperator {
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

export type FiltersType = {
  op: CombinationKeys;
  content: FieldOperator[];
};

export type Operator = FieldOperator | CombinationOperator;

export type TValueSQON = {
  content: FieldOperator;
  op: ScalarFieldKeys | ArrayFieldKeys;
};

export type TCombineValues = (x: FieldOperator, y: FieldOperator) => FieldOperator | null;

export type TMergeSQON = (q: FiltersType, c: FiltersType) => FiltersType | null;

export type TMergeEnum = boolean | 'toggle' | 'replace' | 'add';

export type TSortSQON = (a: FieldOperator, b: FieldOperator) => number;

export type TRemoveSQON = (field: string, query: FiltersType | FieldOperator) => FiltersType | null;
