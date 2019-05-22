import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";
import defaultTheme from "./theme/defaultTheme";

const themes = {
  default: defaultTheme
};

export const ThemeProvider = ({ theme = "default", children }) => {
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
