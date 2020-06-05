export type ArrayFieldKeys = 'in' | 'is' | 'filter';

export type ScalarFieldKeys = '>=' | '<=' | '>' | '<';

type CombinationKeys = 'and' | 'or' | 'not';

export interface ArrayField {
  field: string;
  value: Array<string | number> | string;
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

export type FileRepoFiltersType = {
  op: 'and';
  content: FieldOperator[];
};

export type TCombineValues = (x: FieldOperator, y: FieldOperator) => FieldOperator | null;

export type TMergeFilters = (
  q: FileRepoFiltersType,
  c: FileRepoFiltersType,
) => FileRepoFiltersType | null;

export type TSortFilters = (a: FieldOperator, b: FieldOperator) => number;

export type TRemoveFilter = (
  field: string,
  sqon: FieldOperator | FileRepoFiltersType,
) => FileRepoFiltersType | FieldOperator | null;
