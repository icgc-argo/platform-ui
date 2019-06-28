import React from 'react';
import InputLabel from 'uikit/form/InputLabel';
import MultiSelect from 'uikit/form/MultiSelect';
import Input from 'uikit/form/Input';
import FormControl from 'uikit/form/FormControl';
import styled from '@emotion/styled';

const userKeys = Object.freeze({
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  role: 'role',
});

const Section = styled('div')`
  padding: 12px 11px;
  border: solid 1px ${({ theme }) => theme.colors.grey_2};
  margin-top: 15px;
`;

const UserSection = ({ index, user, onChange }) => {
  //  console.log('index', index, 'user', user, 'onchagnge', onChange);
  const updateUser = (value, key) => onChange({ index, value, key });

  return (
    <Section>
      <FormControl required>
        <InputLabel>First Name</InputLabel>
        <Input
          value={user[userKeys.firstName]}
          onChange={e => updateUser(e.target.value, userKeys.firstName)}
        />
      </FormControl>
      <FormControl required>
        <InputLabel>Email Address</InputLabel>
        <Input
          value={user[userKeys.email]}
          onChange={e => updateUser(e.target.value, userKeys.email)}
        />
      </FormControl>
      <FormControl required>
        <InputLabel required>Last Name</InputLabel>
        <Input
          value={user[userKeys.lastName]}
          onChange={e => updateUser(e.target.value, userKeys.lastName)}
        />
      </FormControl>
      <FormControl required>
        <InputLabel required>Role</InputLabel>
        <MultiSelect />
      </FormControl>
      <div>Delete</div>
    </Section>
  );
};

export default UserSection;
