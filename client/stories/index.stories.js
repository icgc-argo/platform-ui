import { configure, addDecorator } from "@storybook/react";
import { ThemeProvider } from "emotion-theming";
import React from "react";
import theme from "../uikit/theme/defaultTheme";

const req = require.context("../uikit", true, /.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
  <ThemeProvider theme={theme}>
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Work+Sans&display=swap"
        rel="stylesheet"
      />
      {story()}
    </>
  </ThemeProvider>
));

configure(loadStories, module);
