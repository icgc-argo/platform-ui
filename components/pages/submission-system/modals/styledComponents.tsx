import React from 'react';
import InputLabel from 'uikit/form/InputLabel';
import MultiSelect from 'uikit/form/MultiSelect';
import Input from 'uikit/form/Input';
import FormControl from 'uikit/form/FormControl';
import styled from '@emotion/styled';
import Icon from 'uikit/Icon';
import Select from 'uikit/form/Select';
import FormHelperText from 'uikit/form/FormHelperText';
import { PROGRAM_USER_ROLES } from 'global/constants';
import css from '@emotion/css';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-grid-system';
import { UserModel } from './common';

const Section = styled('div')`
  padding: 12px 11px;
  border: solid 1px ${({ theme }) => theme.colors.grey_2};
  margin-top: 15px;
  display: flex;
`;

export type UserSectionProps = {
  user: typeof UserModel;
  onChange: (fieldName: string, value: unknown) => unknown | void;
  validateField: (fieldName: string) => unknown | void;
  errors: typeof UserModel;
  onClickDelete: (() => unknown | void) | null;
  disabledFields: Array<string | void>;
  showDelete?: boolean;
};
export const UserSection: React.ComponentType<UserSectionProps> = ({
  user,
  onChange,
  validateField,
  errors,
  onClickDelete,
  disabledFields = [],
  showDelete,
}) => {
  const {
    firstName: firstNameError,
    lastName: lastNameError,
    email: emailError,
    role: roleError,
  } = errors;

  return (
    <Section>
      <div
        css={css`
          flex: 1;
          min-width: 700px;
        `}
      >
        <Row nogutter>
          <Col sm={6} style={{ paddingRight: '10px' }}>
            <FormControl
              error={!!firstNameError}
              disabled={disabledFields.includes('firstName')}
              required
            >
              <Row nogutter>
                <Col sm={4} style={{ paddingTop: 6 }}>
                  <InputLabel>First Name</InputLabel>
                </Col>
                <Col>
                  <Input
                    aria-label="First name"
                    value={user.firstName}
                    onChange={e => onChange('firstName', e.target.value)}
                    onBlur={() => validateField('firstName')}
                  />
                  {!!firstNameError ? <FormHelperText>{firstNameError}</FormHelperText> : null}{' '}
                </Col>
              </Row>
            </FormControl>
          </Col>
          <Col sm={6} style={{ paddingRight: '10px' }}>
            <FormControl
              error={!!lastNameError}
              disabled={disabledFields.includes('lastName')}
              required
            >
              <Row nogutter>
                <Col sm={4} style={{ paddingTop: 6 }}>
                  <InputLabel>Last Name</InputLabel>
                </Col>
                <Col>
                  <Input
                    aria-label="Last name"
                    value={user.lastName}
                    onChange={e => onChange('lastName', e.target.value)}
                    onBlur={() => validateField('lastName')}
                  />
                  {!!lastNameError ? <FormHelperText>{lastNameError}</FormHelperText> : null}
                </Col>
              </Row>
            </FormControl>
          </Col>
        </Row>
        <Row nogutter>
          <Col sm={6} style={{ paddingRight: '10px' }}>
            <FormControl error={!!emailError} disabled={disabledFields.includes('email')} required>
              <Row nogutter>
                <Col sm={4} style={{ paddingTop: 6 }}>
                  <InputLabel>Email Address</InputLabel>
                </Col>
                <Col>
                  <Input
                    aria-label="Email"
                    value={user.email}
                    onChange={e => onChange('email', e.target.value)}
                    onBlur={() => validateField('email')}
                  />
                  {!!emailError ? <FormHelperText>{emailError}</FormHelperText> : null}
                </Col>{' '}
              </Row>
            </FormControl>
          </Col>
          <Col sm={6} style={{ paddingRight: '10px' }}>
            <FormControl error={!!roleError} disabled={disabledFields.includes('role')} required>
              <Row nogutter>
                <Col sm={4} style={{ paddingTop: 6 }}>
                  <InputLabel>Role</InputLabel>
                </Col>
                <Col>
                  <Select
                    aria-label="Select role"
                    value={user.role}
                    options={PROGRAM_USER_ROLES}
                    onChange={val => onChange('role', val)}
                    onBlur={() => validateField('role')}
                  />
                  {!!roleError ? <FormHelperText>{roleError}</FormHelperText> : null}
                </Col>
              </Row>
            </FormControl>
          </Col>
        </Row>
      </div>
      <Icon
        height="20px"
        width="18px"
        name="trash"
        fill={showDelete ? 'accent2' : '#cecfd3'}
        onClick={() => (showDelete ? onClickDelete() : null)}
        css={css`
          margin-left: 6px;
        `}
      />
    </Section>
  );
};

export default UserSection;
