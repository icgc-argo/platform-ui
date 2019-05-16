import { ThemeProvider } from "emotion-theming";
import theme from "./theme/defaultTheme";
import React from "react";

export const wrapTheme = component => (
  <ThemeProvider theme={theme}>{component}</ThemeProvider>
);

export const asyncDummyFunc = (data) =>
  new Promise(resolve => setTimeout(() => resolve(data), 2500));

export const placeholderImageURLRoot = "http://placekitten.com/";
