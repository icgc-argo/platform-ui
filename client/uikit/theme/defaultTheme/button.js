import colors from "./colors";
export default {
  focusBorder: "#38dfba",
  fontSizes: { sm: "12px", md: "13px", lg: "24px" },
  borderWeights: {
    sm: "1px",
    md: "2px",
    lg: "3px"
  },
  paddings: {
    sm: "8px 15px",
    md: "10px 24px",
    lg: "15px 30px"
  },
  textColors: {
    primary: {
      default: colors.white,
      disabled: colors.white
    },
    secondary: {
      default: "#523785",
      disabled: colors.white
    }
  },
  borderColors: {
    primary: {
      default: "#8258d0",
      hover: "#9e78e1",
      active: "#6d41bd",
      focus: "#8258d0",
      disabled: "#cecfd3"
    },
    secondary: {
      default: colors.grey_1,
      hover: colors.grey_1,
      active: colors.grey_1,
      focus: colors.white,
      disabled: "#cecfd3"
    }
  },
  colors: {
    primary: {
      default: "#8258d0",
      hover: "#9e78e1",
      active: "#6d41bd",
      focus: "#8258d0",
      disabled: "#cecfd3"
    },
    secondary: {
      default: colors.white,
      hover: "#f2ecfd",
      active: "#e6def6",
      focus: colors.white,
      disabled: "#cecfd3"
    }
  }
};
