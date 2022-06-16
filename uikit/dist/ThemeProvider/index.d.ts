import * as React from 'react';
declare const themes: {
  default: {
    colors: {
      success_dark: string;
      success: string;
      success_1: string;
      success_2: string;
      success_3: string;
      success_4: string;
      warning_dark: string;
      warning: string;
      warning_1: string;
      warning_2: string;
      warning_3: string;
      warning_4: string;
      error_dark: string;
      error: string;
      error_1: string;
      error_2: string;
      error_3: string;
      error_4: string;
      accent4_dark: string;
      accent4: string;
      accent4_1: string;
      accent4_2: string;
      accent4_3: string;
      accent4_4: string;
      accent3_dark: string;
      accent3: string;
      accent3_1: string;
      accent3_2: string;
      accent3_3: string;
      accent3_4: string;
      accent2_dark: string;
      accent2: string;
      accent2_1: string;
      accent2_2: string;
      accent2_3: string;
      accent2_4: string;
      accent1_dark: string;
      accent1_dimmed: string;
      accent1: string;
      accent1_1: string;
      accent1_2: string;
      accent1_3: string;
      accent1_4: string;
      secondary_dark: string;
      secondary: string;
      secondary_1: string;
      secondary_2: string;
      secondary_3: string;
      secondary_4: string;
      primary_dark: string;
      primary: string;
      primary_1: string;
      primary_2: string;
      primary_3: string;
      primary_4: string;
      grey: string;
      grey_1: string;
      grey_2: string;
      grey_3: string;
      grey_4: string;
      grey_disabled: string;
      black: string;
      white: string;
    };
    typography: {
      default: React.CSSProperties;
      hero: React.CSSProperties;
      title: React.CSSProperties;
      subtitle: React.CSSProperties;
      subtitle2: React.CSSProperties;
      sectionHeader: React.CSSProperties;
      navigation: React.CSSProperties;
      paragraph: React.CSSProperties;
      paragraph2: React.CSSProperties;
      label: React.CSSProperties;
      data: React.CSSProperties;
      caption: React.CSSProperties;
    };
    shadows: {
      pageElement: string;
    };
    button: {
      fontSizes: {
        sm: string;
        md: string;
      };
      borderWeights: {
        sm: string;
        md: string;
      };
      paddings: {
        sm: string;
        md: string;
      };
      textColors: {
        primary: {
          default: string;
          disabled: string;
        };
        secondary: {
          default: string;
          disabled: string;
        };
        text: {
          default: string;
          disabled: string;
        };
      };
      borderColors: {
        primary: {
          default: string;
          hover: string;
          active: string;
          focus: string;
          disabled: string;
        };
        secondary: {
          default: string;
          hover: string;
          active: string;
          focus: string;
          disabled: string;
        };
        text: {
          default: string;
          hover: string;
          active: string;
          focus: string;
          disabled: string;
        };
      };
      colors: {
        primary: {
          default: string;
          hover: string;
          active: string;
          focus: string;
          disabled: string;
        };
        secondary: {
          default: string;
          hover: string;
          active: string;
          focus: string;
          disabled: string;
        };
        text: {
          default: string;
          hover: string;
          active: string;
          focus: string;
          disabled: string;
        };
      };
    };
    appBar: {
      menuItem: {
        background: {
          hover: string;
        };
      };
    };
    titleBar: {
      separatorColor: string;
      linkColor: string;
    };
    input: {
      fontSizes: {
        sm: string;
        lg: string;
      };
      paddings: {
        sm: string;
        lg: string;
      };
      textColors: {
        [x: string]: string;
      };
      borderColors: {
        [x: string]: string;
      };
      colors: {
        [x: string]: string;
      };
    };
    multiSelect: {
      option: {
        hoverColor: string;
      };
      listBorderColor: string;
      placeHolderColor: string;
      disabledTextColor: string;
      disabledBackgroundColor: string;
    };
    radiocheckbox: {
      fontSizes: {
        default: string;
      };
      textColors: {
        default: string;
        disabled: string;
      };
      backgroundColors: {
        default: string;
        disabled: string;
        checked: string;
      };
      borderColors: {
        default: string;
        disabled: string;
        error: string;
      };
      radio: {
        default: string;
        checked: string;
        disabled: string;
      };
      colors: {
        disabled: string;
        default: string;
      };
    };
    progress: {
      color: {
        disabled: string;
        error: string;
        success: string;
        pending: string;
        locked: string;
        closed: string;
      };
    };
    checkbox: {
      boxWidths: {
        sm: string;
        md: string;
      };
      boxHeights: {
        sm: string;
        md: string;
      };
      checkWidths: {
        sm: string;
        md: string;
      };
      checkHeights: {
        sm: string;
        md: string;
      };
      checkTopPositions: {
        sm: string;
        md: string;
      };
      checkLeftPositions: {
        sm: string;
        md: string;
      };
    };
  };
};
declare const ThemeProvider: React.ComponentType<{
  theme?: keyof typeof themes;
}>;
export default ThemeProvider;
export declare const useTheme: () => {
  colors: {
    success_dark: string;
    success: string;
    success_1: string;
    success_2: string;
    success_3: string;
    success_4: string;
    warning_dark: string;
    warning: string;
    warning_1: string;
    warning_2: string;
    warning_3: string;
    warning_4: string;
    error_dark: string;
    error: string;
    error_1: string;
    error_2: string;
    error_3: string;
    error_4: string;
    accent4_dark: string;
    accent4: string;
    accent4_1: string;
    accent4_2: string;
    accent4_3: string;
    accent4_4: string;
    accent3_dark: string;
    accent3: string;
    accent3_1: string;
    accent3_2: string;
    accent3_3: string;
    accent3_4: string;
    accent2_dark: string;
    accent2: string;
    accent2_1: string;
    accent2_2: string;
    accent2_3: string;
    accent2_4: string;
    accent1_dark: string;
    accent1_dimmed: string;
    accent1: string;
    accent1_1: string;
    accent1_2: string;
    accent1_3: string;
    accent1_4: string;
    secondary_dark: string;
    secondary: string;
    secondary_1: string;
    secondary_2: string;
    secondary_3: string;
    secondary_4: string;
    primary_dark: string;
    primary: string;
    primary_1: string;
    primary_2: string;
    primary_3: string;
    primary_4: string;
    grey: string;
    grey_1: string;
    grey_2: string;
    grey_3: string;
    grey_4: string;
    grey_disabled: string;
    black: string;
    white: string;
  };
  typography: {
    default: React.CSSProperties;
    hero: React.CSSProperties;
    title: React.CSSProperties;
    subtitle: React.CSSProperties;
    subtitle2: React.CSSProperties;
    sectionHeader: React.CSSProperties;
    navigation: React.CSSProperties;
    paragraph: React.CSSProperties;
    paragraph2: React.CSSProperties;
    label: React.CSSProperties;
    data: React.CSSProperties;
    caption: React.CSSProperties;
  };
  shadows: {
    pageElement: string;
  };
  button: {
    fontSizes: {
      sm: string;
      md: string;
    };
    borderWeights: {
      sm: string;
      md: string;
    };
    paddings: {
      sm: string;
      md: string;
    };
    textColors: {
      primary: {
        default: string;
        disabled: string;
      };
      secondary: {
        default: string;
        disabled: string;
      };
      text: {
        default: string;
        disabled: string;
      };
    };
    borderColors: {
      primary: {
        default: string;
        hover: string;
        active: string;
        focus: string;
        disabled: string;
      };
      secondary: {
        default: string;
        hover: string;
        active: string;
        focus: string;
        disabled: string;
      };
      text: {
        default: string;
        hover: string;
        active: string;
        focus: string;
        disabled: string;
      };
    };
    colors: {
      primary: {
        default: string;
        hover: string;
        active: string;
        focus: string;
        disabled: string;
      };
      secondary: {
        default: string;
        hover: string;
        active: string;
        focus: string;
        disabled: string;
      };
      text: {
        default: string;
        hover: string;
        active: string;
        focus: string;
        disabled: string;
      };
    };
  };
  appBar: {
    menuItem: {
      background: {
        hover: string;
      };
    };
  };
  titleBar: {
    separatorColor: string;
    linkColor: string;
  };
  input: {
    fontSizes: {
      sm: string;
      lg: string;
    };
    paddings: {
      sm: string;
      lg: string;
    };
    textColors: {
      [x: string]: string;
    };
    borderColors: {
      [x: string]: string;
    };
    colors: {
      [x: string]: string;
    };
  };
  multiSelect: {
    option: {
      hoverColor: string;
    };
    listBorderColor: string;
    placeHolderColor: string;
    disabledTextColor: string;
    disabledBackgroundColor: string;
  };
  radiocheckbox: {
    fontSizes: {
      default: string;
    };
    textColors: {
      default: string;
      disabled: string;
    };
    backgroundColors: {
      default: string;
      disabled: string;
      checked: string;
    };
    borderColors: {
      default: string;
      disabled: string;
      error: string;
    };
    radio: {
      default: string;
      checked: string;
      disabled: string;
    };
    colors: {
      disabled: string;
      default: string;
    };
  };
  progress: {
    color: {
      disabled: string;
      error: string;
      success: string;
      pending: string;
      locked: string;
      closed: string;
    };
  };
  checkbox: {
    boxWidths: {
      sm: string;
      md: string;
    };
    boxHeights: {
      sm: string;
      md: string;
    };
    checkWidths: {
      sm: string;
      md: string;
    };
    checkHeights: {
      sm: string;
      md: string;
    };
    checkTopPositions: {
      sm: string;
      md: string;
    };
    checkLeftPositions: {
      sm: string;
      md: string;
    };
  };
};
