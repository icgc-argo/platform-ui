import { storiesOf } from '@storybook/react';
import React from 'react';
import Component from '.';

const ComponentStories = storiesOf(`${__dirname}`, module).add('Basic', () => <Component />);

export default ComponentStories;
