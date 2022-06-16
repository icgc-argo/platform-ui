import React from 'react';
import Checkbox from '../Checkbox';
declare const RadioCheckContext: React.Context<{
  isChecked?: boolean | ((e: any) => boolean);
  onChange?: React.ComponentProps<typeof Checkbox>['onChange'];
  disabled?: boolean;
}>;
export default RadioCheckContext;
