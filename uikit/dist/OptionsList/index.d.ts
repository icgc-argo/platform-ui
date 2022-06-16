import React from 'react';
export declare type FilterOption = {
  key: string;
  doc_count: number;
  isChecked: boolean;
};
declare const OptionsList: React.ComponentType<{
  options: Array<FilterOption>;
  searchQuery?: string;
  defaultRenderLimit?: number;
  countUnit?: string;
  onOptionToggle: (facetValue: string[] | string) => void;
  onSelectAllOptions: (allOptionsSelected: boolean) => void;
  parseDisplayValue: (inputValue: string) => string;
  selectAllVisible?: boolean;
  className?: string;
  sortOptions?: boolean;
}>;
export default OptionsList;
