/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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

export type UserField = { fieldName: keyof typeof UserModel; explanationText?: string };

export type UserSectionProps = {
  user: typeof UserModel;
  onChange: (fieldName: keyof typeof UserModel, value: unknown) => unknown | void;
  validateField: (fieldName: keyof typeof UserModel) => unknown | void;
  errors: typeof UserModel;
  onClickDelete: (() => unknown | void) | null;
  disabledFields: Array<UserField>;
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
  const isDisabledField = (fieldName: keyof typeof UserModel) =>
    disabledFields.some((field) => field.fieldName === fieldName);
  const fieldsWithExplanations = disabledFields.filter((entry) => entry.explanationText);
  const explanations = Object.fromEntries(
    fieldsWithExplanations.map((field) => [field.fieldName, field.explanationText]),
  );
  return (
    <Section>
      <div
        css={css`
          flex: 1;
        `}
      >
        <Row nogutter>
          <Col sm={12} md={6} style={{ paddingRight: '10px' }}>
            <FormControl error={!!firstNameError} disabled={isDisabledField('firstName')} required>
              <Row nogutter>
                <Col sm={4} style={{ paddingTop: 6 }}>
                  <InputLabel>First Name</InputLabel>
                </Col>
                <Col>
                  <Input
                    aria-label="First name"
                    value={user.firstName}
                    onChange={(e) => onChange('firstName', e.target.value)}
                    onBlur={() => validateField('firstName')}
                  />
                  {!!firstNameError ? <FormHelperText>{firstNameError}</FormHelperText> : null}{' '}
                </Col>
              </Row>
            </FormControl>
          </Col>
          <Col sm={12} md={6} style={{ paddingRight: '10px' }}>
            <FormControl error={!!lastNameError} disabled={isDisabledField('lastName')} required>
              <Row nogutter>
                <Col sm={4} style={{ paddingTop: 6 }}>
                  <InputLabel>Last Name</InputLabel>
                </Col>
                <Col>
                  <Input
                    aria-label="Last name"
                    value={user.lastName}
                    onChange={(e) => onChange('lastName', e.target.value)}
                    onBlur={() => validateField('lastName')}
                  />
                  {!!lastNameError ? <FormHelperText>{lastNameError}</FormHelperText> : null}
                </Col>
              </Row>
            </FormControl>
          </Col>
        </Row>
        <Row nogutter>
          <Col sm={12} md={6} style={{ paddingRight: '10px' }}>
            <FormControl error={!!emailError} disabled={isDisabledField('email')} required>
              <Row nogutter>
                <Col sm={4} style={{ paddingTop: 6 }}>
                  <InputLabel>Email Address</InputLabel>
                </Col>
                <Col>
                  <Input
                    aria-label="Email"
                    value={user.email}
                    onChange={(e) => onChange('email', e.target.value)}
                    onBlur={() => validateField('email')}
                  />
                  {!!emailError ? <FormHelperText>{emailError}</FormHelperText> : null}
                </Col>{' '}
              </Row>
            </FormControl>
          </Col>
          <Col sm={12} md={6} style={{ paddingRight: '10px' }}>
            <FormControl error={!!roleError} required disabled={isDisabledField('role')}>
              <Row nogutter>
                <Col sm={4} style={{ paddingTop: 6 }}>
                  <InputLabel>Role</InputLabel>
                </Col>
                <Col>
                  <Select
                    aria-label="Select role"
                    disabled={isDisabledField('role')}
                    value={user.role}
                    options={PROGRAM_USER_ROLES}
                    onChange={(val) => onChange('role', val)}
                    onBlur={() => validateField('role')}
                    hintText={isDisabledField('role') ? explanations.role : null}
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
