import { storiesOf } from '@storybook/react';
import React from 'react';
import Icon from '.';
import icons from './icons';
import { select } from '@storybook/addon-knobs';

const IconStories = storiesOf(`${__dirname}`, module).add('Icons', () => {
  const name = select('name', Object.keys(icons), 'spinner');
  return (
    <div>
      <Icon name={name} />
    </div>
  );
});

export default IconStories;
