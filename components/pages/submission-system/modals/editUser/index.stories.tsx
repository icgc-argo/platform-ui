
import React from 'react';
import { storiesOf } from '@storybook/react';
import EditUserModal from '.';
import { action } from '@storybook/addon-actions';

const EditUserModalStory = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <EditUserModal
    user={{ firstName: 'Joe', lastName: 'Blogs', email: 'jblogs@example.com', role: 'Full' }}
    dismissModal={action('dismiss modal')}
    onSubmit={data => action('submit')(data)}
  />
));

export default EditUserModalStory;
