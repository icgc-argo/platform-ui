import React from 'react';
import { storiesOf } from '@storybook/react';
import UserSection from './userSection';
import AddUserModal from '.';

const UserSectionStory = storiesOf(`${__dirname}`, module).add('Basic', () => <AddUserModal />);

export default UserSectionStory;
