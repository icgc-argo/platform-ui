import { configure, addDecorator, addParameters } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({ options: { 
  addonPanelInRight: true,
} })
addDecorator(withInfo({inline: true, header: false}));
addDecorator(withKnobs);

configure(loadStories, module);
