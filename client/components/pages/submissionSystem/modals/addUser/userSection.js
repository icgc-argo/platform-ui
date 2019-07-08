import React from 'react';
import InputLabel from 'uikit/form/InputLabel';
import MultiSelect from 'uikit/form/MultiSelect';
import Input from 'uikit/form/Input';
import FormControl from 'uikit/form/FormControl';
import styled from '@emotion/styled';
import Icon from 'uikit/Icon';
import Select from 'uikit/form/Select';

const Section = styled('div')`
  padding: 12px 11px;
  border: solid 1px ${({ theme }) => theme.colors.grey_2};
  margin-top: 15px;
`;

const UserSection = ({ user, onChange, validateField, errors, deleteSelf }) => {
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
        <Select
          aria-label="role-select"
          value={user.role}
          options={[{ content: 'Value 1', value: 'v1' }, { content: 'Value 2', value: 'v2' }]}
          onChange={val => onChange('role', val)}
        />
      </FormControl>
      <Icon
        height="20px"
        width="18px"
        name="trash"
        fill={deleteSelf ? 'accent2' : '#cecfd3'}
        onClick={deleteSelf}
      />
    </Section>
  );
};

export default UserSection;
