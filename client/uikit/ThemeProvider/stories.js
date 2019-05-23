import { storiesOf } from "@storybook/react";
import React from "react";
import ReactJson from "react-json-view";

import ThemeProvider, { useTheme } from ".";
import defaultTheme from "../theme/defaultTheme";

const ThemeViewer = () => {
  const myTheme = useTheme();
  return <ReactJson src={myTheme} collapsed={1} />;
};

const ThemeProviderStories = storiesOf(`${__dirname}`, module).add(
  "Basic",
  () => (
    <ThemeProvider theme={"default"}>
      <ThemeViewer />
    </ThemeProvider>
  )
);

export default ThemeProviderStories;
