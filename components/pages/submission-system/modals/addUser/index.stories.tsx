import React from 'react';
import { storiesOf } from '@storybook/react';
import AddUserModal from '.';
import { action } from '@storybook/addon-actions';

const AddUserModalStory = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <AddUserModal
    onSubmit={data => action('Submit data')(data)}
    dismissModal={action('dismissModal')}
  />
));

export default AddUserModalStory;
