import React from 'react';
import { storiesOf } from '@storybook/react';
import AddUserModal from '.';

const AddUserModalStory = storiesOf(`${__dirname}`, module).add('Basic', () => <AddUserModal />);

export default AddUserModalStory;
