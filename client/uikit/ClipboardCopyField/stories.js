import { storiesOf } from '@storybook/react';
import React from 'react';
import ClipboardCopyField from '.';

const ClipboardCopyFieldStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <ClipboardCopyField>Skeleton</ClipboardCopyField>
));

export default ClipboardCopyFieldStories;
