import React from 'react';
import { storiesOf } from '@storybook/react';
import AddUserModal from '.';

const AddUserStory = storiesOf(`${__dirname}`, module).add('Basic', () => <AddUserModal />);

export default AddUserStory;
