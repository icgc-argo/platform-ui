import React from 'react';
import { storiesOf } from '@storybook/react';
import DeleteUserModal from '.';

const DeleteUserModalStory = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <DeleteUserModal />
));

export default DeleteUserModalStory;
