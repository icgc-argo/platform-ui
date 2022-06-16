/// <reference types="react" />
import { FilterOption } from 'uikit/OptionsList';
declare const Facet: ({
  subMenuName,
  options,
  isExpanded,
  onClick,
  countUnit,
  onOptionToggle,
  onSelectAllOptions,
  parseDisplayValue,
}: {
  subMenuName: string;
  options: Array<FilterOption>;
  isExpanded?: boolean;
  onClick?: (e: any) => void;
  countUnit?: string;
  onOptionToggle: (facetValue: string | string[]) => void;
  onSelectAllOptions: (allOptionsSelected: boolean) => void;
  parseDisplayValue?: (inputValue: string) => string;
}) => JSX.Element;
export default Facet;
