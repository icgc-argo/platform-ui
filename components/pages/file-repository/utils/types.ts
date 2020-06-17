export type ArrayFieldKeys = 'in' | 'is' | 'filter';

export type ScalarFieldKeys = '>=' | '<=' | '>' | '<';

export type CombinationKeys = 'and' | 'or' | 'not';

export type ArrayFieldValue = Array<string | number> | string;
export type ScalarFieldValue = number;

export interface FilterField {
  fields: string[];
  value: ArrayFieldValue;
}

export interface FilterFieldOperator {
  op: ArrayFieldKeys;
  content: FilterField;
}

export interface ArrayField {
  field: string;
  value: ArrayFieldValue;
}

export interface ScalarField {
  field: string;
  value: ScalarFieldValue;
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

export type RecursiveFilter = {
  op: CombinationKeys;
  content: Array<RecursiveFilter | FieldOperator | FilterFieldOperator>;
};

export type TCombineValues = (
  operatorA: FieldOperator,
  operatorB: FieldOperator,
) => FieldOperator | null;

export type TMergeFilters = (
  newFilter: FileRepoFiltersType,
  currentFilters: FileRepoFiltersType,
) => FileRepoFiltersType | null;

export type TSortFilters = (operatorA: FieldOperator, operatorB: FieldOperator) => number;

export type TRemoveFilter = (
  field: string,
  sqon: FieldOperator | FileRepoFiltersType,
) => FileRepoFiltersType | FieldOperator | null;
