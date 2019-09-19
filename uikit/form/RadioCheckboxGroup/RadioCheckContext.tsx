import React from 'react';
import Checkbox from '../Checkbox';

const RadioCheckContext = React.createContext<{
  isChecked?: boolean;
  onChange?: React.ComponentProps<typeof Checkbox>['onChange'];
}>({});

export default RadioCheckContext;
