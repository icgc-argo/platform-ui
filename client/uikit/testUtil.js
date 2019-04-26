import { ThemeProvider } from "emotion-theming";
import theme from "./defaultTheme";
import React from "react";

export const wrapTheme = component => (
  <ThemeProvider theme={theme}>{component}</ThemeProvider>
);

export const asyncDummyFunc = () =>
  new Promise(resolve => setTimeout(resolve, 2500));

export const placeholderImageURLRoot = "http://placekitten.com/";
