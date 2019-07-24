import React from 'react';
import { storiesOf } from '@storybook/react';
import DeleteUserModal from '.';
import { action } from '@storybook/addon-actions';

const DeleteUserModalStory = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <DeleteUserModal
    dismissModal={action('dismiss modal')}
    onSubmit={action('submit')}
    user={{ name: 'Niels Bohr' }}
  />
));

export default DeleteUserModalStory;
