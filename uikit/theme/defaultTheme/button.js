//@flow
import colors from './colors';
export default {
  fontSizes: {
    sm: '12px',
    md: '13px',
  },
  borderWeights: {
    sm: '1px',
    md: '2px',
  },
  paddings: {
    sm: '5px 10px',
    md: '6px 20px',
  },
  textColors: {
    primary: {
      default: colors.white,
      disabled: colors.white,
    },
    secondary: {
      default: '#523785',
      disabled: colors.white,
    },
    text: {
      default: '#523785',
      disabled: '#d0d1d8',
    },
  },
  borderColors: {
    primary: {
      default: '#8258d0',
      hover: '#9e78e1',
      active: '#6d41bd',
      focus: '#523785',
      disabled: '#cecfd3',
    },
    secondary: {
      default: colors.grey_1,
      hover: colors.grey_1,
      active: colors.grey_1,
      focus: '#8a8d9f',
      disabled: '#cecfd3',
    },
    text: {
      default: 'transparent',
      hover: '#f2ecfd',
      active: '#e6def6',
      focus: colors.white,
      disabled: 'none',
    },
  },
  colors: {
    primary: {
      default: '#8258d0',
      hover: '#9e78e1',
      active: '#6d41bd',
      focus: '#8258d0',
      disabled: '#cecfd3',
    },
    secondary: {
      default: colors.white,
      hover: '#f2ecfd',
      active: '#e6def6',
      focus: colors.white,
      disabled: '#cecfd3',
    },
    text: {
      default: 'transparent',
      hover: '#f2ecfd',
      active: '#e6def6',
      focus: colors.white,
      disabled: 'none',
    },
  },
};
