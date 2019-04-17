import { ThemeProvider } from "emotion-theming";
import theme from "./defaultTheme";
import React from "react";

export const wrapTheme = component => (
  <ThemeProvider theme={theme}>{component}</ThemeProvider>
);
