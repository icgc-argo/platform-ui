<<<<<<< HEAD
const base = {
  black: '#000000',
  white: '#ffffff',
};
const grey = {
  grey: '#525767',
  grey_1: '#babcc2',
  grey_2: '#dcdde1',
  grey_3: '#f2f2f8',
  grey_4: '#f8f8fb',
};
const primary = {
  primary_dark: '#0c1024',
  primary: '#151c3d',
  primary_1: '#4f546d',
  primary_2: '#a1a4b1',
  primary_3: '#c4c6ce',
  primary_4: '#e8e8eb',
};
const secondary = {
  secondary_dark: '#045093',
  secondary: '#0774d3',
  secondary_1: '#4596de',
  secondary_2: '#9bc7ed',
  secondary_3: '#c0dcf3',
  secondary_4: '#e6f1fa',
};
const accent1 = {
  accent1_dark: '#15846c',
  accent1: '#24dbb4',
  accent1_1: '#70e7ce',
  accent1_2: '#a7f0e1',
  accent1_3: '#d3f7f0',
  accent1_4: '#e9fbf7',
};
const accent2 = {
  accent2_dark: '#523785',
  accent2: '#7f55cc',
  accent2_1: '#9f7fd8',
  accent2_2: '#cbbbea',
  accent2_3: '#ded4f2',
  accent2_4: '#f2eefa',
};
const accent3 = {
  accent3_dark: '#00b3d3',
  accent3: '#4bcee5',
  accent3_1: '#89dfee',
  accent3_2: '#b7ebf4',
  accent3_3: '#d1f2f8',
  accent3_4: '#edfafc',
};
const accent4 = {
  accent4_dark: '#ef4110',
  accent4: '#f95d31',
  accent4_1: '#fa8564',
  accent4_2: '#fcbeac',
  accent4_3: '#fdd6cb',
  accent4_4: '#feefea',
};
const error = {
  error_dark: '#bc0025',
  error: '#df1b42',
  error_1: '#e75471',
  error_2: '#f2a3b3',
  error_3: '#f6c5cf',
  error_4: '#fbe8ec',
};
const warning = {
  warning_dark: '#ec8f17',
  warning: '#fea430',
  warning_1: '#feba63',
  warning_2: '#fedaac',
  warning_3: '#fee8cb',
  warning_4: '#fef6ea',
};
const success = {
  success_dark: accent1.accent1_dark,
  success: accent1.accent1,
  success_1: accent1.accent1_1,
  success_2: accent1.accent1_2,
  success_3: accent1.accent1_3,
  success_4: accent1.accent1_4,
};
=======
export default {
  black: "#000000",
  white: "#ffffff",

  light_blue_grey: "#d0d1d8",

  grey: "#525767",
  grey_1: "#babcc2",
  grey_2: "#dcdde1",
  grey_3: "#f8f8fb",

  primary: "#151c3d",
  primary_1: "#a1a4b1",
  primary_2: "#e8e8eb",

  secondary: "#0774d3",
  secondary_1: "#a1c8ec",
  secondary_2: "#e8f1fa",

  accent1: "#38dfba",
  accent1_1: "#b3f1e3",
  accent1_2: "#ecfbf8",

  accent2: "#7f55cc",
  accent2_1: "#cdbdeb",
  accent2_2: "#f2effa",

  accent3: "#e8348a",
  accent3_1: "#f5afd0",
  accent3_2: "#fcebf3",

  accent4: "#ff6633",
  accent4_1: "#fdc2b1",
  accent4_2: "#fef0eb",

  error: "#e00548",
  error1: "#f19fb7",
  error2: "#fbe7ed",

  warning: "#fea430",
  warning1: "#fedaac",
  warning2: "#fef6ea",
>>>>>>> add themeing

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
