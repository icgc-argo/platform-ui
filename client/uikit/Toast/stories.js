import { storiesOf } from '@storybook/react';
import React from 'react';
import Toast from '.';
import { action } from '@storybook/addon-actions';

const ToastStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <Toast onInteraction={action('RECEIVED EVENT')} />
));

export default ToastStories;
