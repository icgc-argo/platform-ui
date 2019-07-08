import React from 'react';
import InputLabel from 'uikit/form/InputLabel';
import MultiSelect from 'uikit/form/MultiSelect';
import Input from 'uikit/form/Input';
import FormControl from 'uikit/form/FormControl';
import styled from '@emotion/styled';

const Section = styled('div')`
  padding: 12px 11px;
  border: solid 1px ${({ theme }) => theme.colors.grey_2};
  margin-top: 15px;
`;

const UserSection = ({ user, onChange, validateField, errors, removeSelf }) => {
  console.log('User section', errors);
  return (
    <Section>
      <FormControl error={!!errors.firstName} required>
        <InputLabel>First Name</InputLabel>
        <Input
          value={user.firstName}
          onChange={e => onChange('firstName', e.target.value)}
          onBlur={() => validateField('firstName')}
        />
      </FormControl>
      <FormControl error={!!errors.email} required>
        <InputLabel>Email Address</InputLabel>
        <Input
          value={user.email}
          onChange={e => onChange('email', e.target.value)}
          onBlur={() => validateField('email')}
        />
      </FormControl>
      <FormControl error={!!errors.lastName} required>
        <InputLabel required>Last Name</InputLabel>
        <Input
          value={user.lastName}
          onChange={e => onChange('lastName', e.target.value)}
          onBlur={() => validateField('lastName')}
        />
      </FormControl>
      <FormControl required>
        <InputLabel required>Role</InputLabel>
        <MultiSelect />
      </FormControl>
      <div onClick={removeSelf}>Delete</div>
    </Section>
  );
};

export default UserSection;
