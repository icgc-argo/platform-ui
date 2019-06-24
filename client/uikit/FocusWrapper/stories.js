import { storiesOf } from '@storybook/react';
import React from 'react';
import FocusWrapper from '.';

const FocusWrapperStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <FocusWrapper>Skeleton</FocusWrapper>
));

export default FocusWrapperStories;
