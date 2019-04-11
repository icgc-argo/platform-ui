import { configure, addDecorator } from "@storybook/react";
import { addReadme } from "storybook-readme";
import { jsxDecorator } from "storybook-addon-jsx";

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(jsxDecorator); // Fix unique key warning: https://github.com/storybooks/addon-jsx/issues/65
addDecorator(addReadme);
configure(loadStories, module);
