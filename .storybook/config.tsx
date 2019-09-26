import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import ReactTable from 'react-table';
import React from 'react';
import PropTypesTable from './PropTypesTable';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  options: {
    addonPanelInRight: true,
  },
});
addDecorator(withA11y);
addDecorator(withInfo({ inline: true, header: false, TableComponent: PropTypesTable }));
addDecorator(withKnobs);

configure(loadStories, module);
