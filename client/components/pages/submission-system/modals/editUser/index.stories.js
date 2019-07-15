import React from 'react';
import { storiesOf } from '@storybook/react';
import EditUserModal from '.';

const EditUserModalStory = storiesOf(`${__dirname}`, module).add('Basic', () => <EditUserModal />);

export default EditUserModalStory;
