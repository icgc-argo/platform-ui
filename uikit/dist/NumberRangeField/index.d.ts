import React from 'react';
declare const NumberRangeField: React.ComponentType<{
  min: string;
  onMinChange: React.Dispatch<React.SetStateAction<string>>;
  max: string;
  onMaxChange: React.Dispatch<React.SetStateAction<string>>;
  onGoClick: () => any;
  goButtonEnabled: boolean;
  validation?: (i: number) => boolean;
}>;
export default NumberRangeField;
