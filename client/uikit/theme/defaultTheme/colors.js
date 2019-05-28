const base = {
  black: '#000000',
  white: '#ffffff',
};
const grey = {
  grey: '#525767',
  grey_1: '#babcc2',
  grey_2: '#dcdde1',
  grey_3: '#f8f8fb',
};
const primary = {
  primary_dark: '#0c1024',
  primary: '#151c3d',
  primary_1: '#4f546d',
  primary_2: '#a1a4b1',
  primary_3: '#e8e8eb',
};
const secondary = {
  secondary_dark: '#045093',
  secondary: '#0774d3',
  secondary_1: '#4596de',
  secondary_2: '#9bc7ed',
  secondary_3: '#e6f1fa',
};
const accent1 = {
  accent1_dark: '#15846c',
  accent1: '#24dbb4',
  accent1_1: '#70e7ce',
  accent1_2: '#a7f0e1',
  accent1_3: '#e9fbf7',
};
const accent2 = {
  accent2_dark: '#523785',
  accent2: '#7f55cc',
  accent2_1: '#9f7fd8',
  accent2_2: '#cbbbea',
  accent2_3: '#f2eefa',
};
const accent3 = {
  accent3_dark: '#00b3d3',
  accent3: '#4bcee5',
  accent3_1: '#89dfee',
  accent3_2: '#b7ebf4',
  accent3_3: '#edfafc',
};
const accent4 = {
  accent4_dark: '#ef4110',
  accent4: '#f95d31',
  accent4_1: '#fa8564',
  accent4_2: '#fcbeac',
  accent4_3: '#feefea',
};
const error = {
  error_dark: '#bc0025',
  error: '#df1b42',
  error_1: '#e75471',
  error_2: '#f2a3b3',
  error_3: '#fbe8ec',
};
const warning = {
  warning_dark: '#ec8f17',
  warning: '#fea430',
  warning_1: '#feba63',
  warning_2: '#fedaac',
  warning_3: '#fef6ea',
};
const success = {
  success_dark: accent1.accent1_dark,
  success: accent1.accent1,
  success_1: accent1.accent1_1,
  success_2: accent1.accent1_2,
  success_3: accent1.accent1_3,
};

export default {
  ...base,
  ...grey,
  ...primary,
  ...secondary,
  ...accent1,
  ...accent2,
  ...accent3,
  ...accent4,
  ...error,
  ...warning,
  ...success,
};
