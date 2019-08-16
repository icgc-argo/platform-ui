import React from 'react';
import { storiesOf } from '@storybook/react';
import ResendInviteModal from '.';

const ResendInviteModalStory = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <ResendInviteModal />
));

export default ResendInviteModalStory;
