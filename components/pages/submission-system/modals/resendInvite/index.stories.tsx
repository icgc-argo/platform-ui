import React from 'react';
import { storiesOf } from '@storybook/react';
import ResendInviteModal from '.';
import { action } from '@storybook/addon-actions';

const ResendInviteModalStory = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <ResendInviteModal
    dismissModal={action('dismissModal')}
    onSubmit={action('onSubmit')}
    user={{
      email: 'someone@example.com',
      firstName: 'someone',
      lastName: 'example',
      role: 'COLLABORATOR',
    }}
  />
));

export default ResendInviteModalStory;
