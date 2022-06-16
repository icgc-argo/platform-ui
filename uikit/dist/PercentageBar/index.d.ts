/// <reference types="react" />
declare const PercentageBar: ({
  nom,
  denom,
  color,
  className,
}: {
  /**
   * the nominator
   */
  nom: number;
  /**
   * the denominator
   */
  denom: number;
  color?: string;
  className?: string;
}) => JSX.Element;
export default PercentageBar;
