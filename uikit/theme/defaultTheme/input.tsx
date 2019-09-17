
import colors from './colors';

export const INPUT_STATES = {
  default: 'default',
  active: 'active',
  focus: 'focus',
  disabled: 'disabled',
  error: 'error',
  hover: 'hover',
};

export default {
  fontSizes: { sm: '12px', lg: '14px' },
  paddings: {
    sm: '8px 10px',
    lg: '7px 10px',
  },
  textColors: {
    [INPUT_STATES.default]: colors.black,
    [INPUT_STATES.active]: colors.black,
    [INPUT_STATES.focus]: colors.black,
    [INPUT_STATES.disabled]: '#d0d1d8',
    [INPUT_STATES.error]: '#d0d1d8',
  },
  borderColors: {
    [INPUT_STATES.default]: colors.grey_1,
    [INPUT_STATES.active]: colors.grey,
    [INPUT_STATES.focus]: colors.grey,
    [INPUT_STATES.disabled]: colors.grey_2,
    [INPUT_STATES.error]: colors.error,
    [INPUT_STATES.hover]: colors.secondary_1,
  },
  colors: {
    [INPUT_STATES.default]: colors.white,
    [INPUT_STATES.disabled]: '#f6f6f7',
  },
};
