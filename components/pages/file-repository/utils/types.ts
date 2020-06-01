export type TValueContent = {
  field: string;
  value: Array<any> | any;
};
export type TValueOp = 'in' | 'is' | '>=' | '<=';
export type TValueSQON = {
  content: TValueContent;
  op: TValueOp;
};

export type TGroupContent = Array<TValueSQON>;
export type TGroupOp = 'and' | 'or';
export type TGroupSQON = {
  content: TGroupContent;
  op: TGroupOp;
};

export type TCombineValues = (x: TValueSQON, y: TValueSQON) => any;

export type TMergeSQON = (q: any, c: any) => any;

export type TMergeEnum = boolean | 'toggle' | 'replace' | 'add';

export type TMergeFns = (v: TMergeEnum) => TMergeSQON;

export type TMergeQuery = (q: any, c: any, t: any) => any;

export type TSortSQON = (a: TValueSQON, b: TValueSQON) => number;

export type TFilterByWhitelist = (o: any, w: Array<string>) => any;

export type TRemoveSQON = (field: string, query: TGroupSQON | any) => any; // need to fix return value

// export type TValueContent = {
//   field: string,
//   value: Array<mixed> | mixed,
// };
// export type TValueOp = 'in' | 'is' | '>=' | '<=';
// export type TValueSQON = {
//   content: TValueContent,
//   op: TValueOp,
// };

// export type TGroupContent = Array<TValueSQON>;
// export type TGroupOp = 'and' | 'or';
// export type TGroupSQON = {
//   content?: TGroupContent,
//   op?: TGroupOp,
// };

// export type TCombineValues = (x: TValueSQON, y: TValueSQON) => ?TValueSQON;

// export type TMergeSQON = (q: ?TGroupSQON, c: ?TGroupSQON) => ?TGroupSQON;

// export type TMergeEnum = boolean | 'toggle' | 'replace';

// export type TMergeFns = (v: TMergeEnum) => TMergeSQON;

// export type TMergeQuery = (
//   q: ?TUriQuery,
//   c: TRawQuery,
//   t: TMergeEnum,
// ) => TUriQuery;

// export type TSortSQON = (a: TValueSQON, b: TValueSQON) => number;

// export type TFilterByWhitelist = (
//   o: ?TRawQuery,
//   w: ?Array<string>,
// ) => TRawQuery;

// export type TRemoveSQON = (field: string, query: TGroupSQON) => ?TGroupSQON;
