import {
  ThemeProvider as EmotionThemeProvider,
  withTheme as withEmotionTheme
} from "emotion-theming";
import PropTypes from "prop-types";
import defaultTheme from "../theme/defaultTheme";

const themes = {
  default: defaultTheme
};

const ThemeProvider = ({ theme = "default", children }) => {
  return (
    <EmotionThemeProvider theme={themes[theme]}>
      <link
        href={"https://fonts.googleapis.com/css?family=Work+Sans&display=swap"}
        rel="stylesheet"
      />
      {children}
    </EmotionThemeProvider>
  );
};
ThemeProvider.propTypes = {
  theme: PropTypes.oneOf(Object.keys(themes))
};

export default ThemeProvider;
export const withTheme = withEmotionTheme;
