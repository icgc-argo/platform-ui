import { storiesOf } from '@storybook/react';
import React from 'react';
import Checkbox from '.';

const CheckboxStories = storiesOf(`${__dirname}`, module).add('Basic', () => <Checkbox />);

export default CheckboxStories;
