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

const UserSection = ({ formData: user, updateForm }) => {
  // console.log('form data', user, 'updateForm', updateForm);
  const updateUser = updatedField => updateForm({ ...user, ...updatedField });

  return (
    <Section>
      <FormControl required>
        <InputLabel>First Name</InputLabel>
        <Input
          value={user.firstName}
          onChange={e => {
            console.log(e.target.value);
            updateUser({ firstName: e.target.value });
          }}
        />
      </FormControl>
      <FormControl required>
        <InputLabel>Email Address</InputLabel>
        <Input value={user.email} onChange={e => updateUser({ email: e.target.value })} />
      </FormControl>
      <FormControl required>
        <InputLabel required>Last Name</InputLabel>
        <Input value={user.lastName} onChange={e => updateUser({ lastName: e.target.value })} />
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
