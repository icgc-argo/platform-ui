import React from 'react';
import { storiesOf } from '@storybook/react';
import DeleteUserModal from '.';
import { action } from '@storybook/addon-actions';

const DeleteUserModalStory = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <DeleteUserModal
    dismissModal={action('dismiss modal')}
    onSubmit={action('submit')}
    user={{ firstName: 'Niels', lastName: 'Bohr', email: 'Niels@Bohr', role: 'ADMIN' }}
  />
));

export default DeleteUserModalStory;
