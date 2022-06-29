/// <reference types="react" />
declare const NumberRangeFacet: ({
  subMenuName,
  isExpanded,
  onClick,
  onSubmit,
  min,
  max,
}: {
  subMenuName: string;
  isExpanded?: boolean;
  onClick?: (e: any) => void;
  onSubmit: (min: number, max: number) => void;
  min?: string;
  max?: string;
}) => JSX.Element;
export default NumberRangeFacet;
