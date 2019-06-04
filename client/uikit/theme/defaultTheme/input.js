import colors from './colors';

export const INPUT_STATES = {
  default: 'default',
  active: 'active',
  focus: 'focus',
  disabled: 'disabled',
  error: 'error',
};

export default {
  fontSizes: { sm: '12px', lg: '14px' },
  paddings: {
    sm: '8px 10px',
    lg: '7px 10px',
  },
  textColors: {
    [inputStates.default]: colors.black,
    [inputStates.active]: colors.black,
    [inputStates.focus]: colors.black,
    [inputStates.disabled]: '#d0d1d8',
    [inputStates.error]: '#d0d1d8',
  },
  borderColors: {
    [inputStates.default]: colors.grey_1,
    [inputStates.active]: colors.grey,
    [inputStates.focus]: colors.grey,
    [inputStates.disabled]: colors.grey_2,
    [inputStates.error]: colors.error,
  },
  colors: {
    [inputStates.default]: colors.white,
    [inputStates.disabled]: '#f6f6f7',
  },
};
