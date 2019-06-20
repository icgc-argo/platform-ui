import { storiesOf } from '@storybook/react';
import React from 'react';
import Toast from '.';

const ToastStories = storiesOf(`${__dirname}`, module).add('Basic', () => <Toast>Skeleton</Toast>);

export default ToastStories;
