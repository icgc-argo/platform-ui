import { storiesOf } from '@storybook/react';
import React from 'react';
import Icon from '.';

const IconStories = storiesOf(`${__dirname}`, module).add('Icons', () => (
  <div>
    <Icon name="spinner" />
  </div>
));

export default IconStories;
