import { configure, addDecorator } from "@storybook/react";
import { addReadme } from "storybook-readme";

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(addReadme);
configure(loadStories, module);
