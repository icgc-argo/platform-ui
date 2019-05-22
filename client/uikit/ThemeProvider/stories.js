import { storiesOf } from "@storybook/react";
import React from "react";
import ReactJson from "react-json-view";

import ThemeProvider, { withTheme } from ".";

const ThemeViewer = withTheme(({ theme }) => (
  <ReactJson src={theme} collapsed={1} />
));

const ThemeProviderStories = storiesOf(`${__dirname}`, module).add(
  "Basic",
  () => (
    <ThemeProvider>
      <ThemeViewer />
    </ThemeProvider>
  )
);

export default ThemeProviderStories;
