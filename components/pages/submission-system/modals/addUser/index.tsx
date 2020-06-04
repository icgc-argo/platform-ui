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

import React, { useState } from 'react';
import { styled, css } from 'uikit';
import Modal from 'uikit/Modal';
import Button from 'uikit/Button';
import Icon from 'uikit/Icon';
import Typography from 'uikit/Typography';
import { UserSection, UserSectionProps } from '../styledComponents';
import useFormHook from 'global/hooks/useFormHook';
import { UserModel, userSchema } from '../common';
import uniqueId from 'lodash/uniqueId';
import { firstName } from 'global/utils/form/validations';
import { uniq } from 'lodash';

const AddUser = ({ id, formSubscriptions, removeSection, onUpdate, showDelete }) => {
  const form = useFormHook({ initialFields: UserModel, schema: userSchema });

  const { errors, data, setData, validateField, touched } = form;
  const validationErrors = errors as UserSectionProps['errors'];

  React.useEffect(() => {
    formSubscriptions[id] = form;
    onUpdate();
  });

  return (
    <UserSection
      key={id}
      user={data}
      onChange={(key, val) => {
        setData({ key, val });
      }}
      validateField={key => validateField({ key })}
      errors={validationErrors}
      onClickDelete={() => removeSection(id)}
      disabledFields={[]}
      showDelete={showDelete}
    />
  );
};

const AddSection = styled(Button)`
  text-transform: uppercase;
  color: ${({ disabled, theme }) => (disabled ? '#d0d1d8' : theme.colors.accent2_dark)};
  margin-top: 14px;
`;

const AddUserModal = ({
  onSubmit,
  dismissModal,
  users,
}: {
  onSubmit: (data: typeof UserModel[]) => any | void;
  dismissModal: () => any | void;
  users: Array<typeof UserModel>;
}) => {
  const [formIds, setFormIds] = React.useState([uniqueId()]);
  const [isLastSectionTouched, setIsLastSectionTouched] = React.useState(false);
  const [isFormTouched, setIsFormTouched] = React.useState(false);
  const [hasErrors, setHasErrors] = React.useState(false);
  const formSubscriptions = {};

  // check if form has been touched
  const touchCheck = () => {
    const formSubKeys = Object.keys(formSubscriptions);
    const isTouched = formSubKeys
      .map(key => formSubscriptions[key].touched)
      .reduce((acc, val) => acc || val, false);
    setIsFormTouched(isTouched);
  };

  // check for errors
  const errorCheck = () => {
    const formSubKeys = Object.keys(formSubscriptions);
    const invalidity = formSubKeys
      .map(key => formSubscriptions[key].hasErrors)
      .reduce((acc, val) => acc || val, false);
    setHasErrors(invalidity);
  };

  // check if last form section is touched
  const lastSectionTouchCheck = async () => {
    const formSubKeys = Object.keys(formSubscriptions);
    const lastSection = formSubscriptions[formSubKeys[formSubKeys.length - 1]];
    setIsLastSectionTouched(lastSection.touched);
  };

  // Returns true if form has duplicate emails within Modal
  const formHasDuplicateEmail = form => {
    const formsWithThisEmail = Object.keys(formSubscriptions)
      .map(key => formSubscriptions[key].data.email.toLowerCase())
      .filter(email => email === form.data.email.toLowerCase());
    return formsWithThisEmail.length > 1;
  };

  // Returns true if an form has email that already exists outside of Modal
  const formHasExistingEmail = form => {
    const existingEmails = users.map(({ email }) => email.toLowerCase());
    return existingEmails.includes(form.data.email.toLowerCase());
  };

  // validate each individual form and fire onSubmit for each
  const submitForm = async () => {
    const allForms = Object.keys(formSubscriptions).map(async key => {
      const form = formSubscriptions[key];
      return form.validateForm();
    });
    const matchingEmails = Object.values(formSubscriptions).filter(formHasDuplicateEmail);
    const existingEmails = Object.values(formSubscriptions).filter(formHasExistingEmail);
    matchingEmails.forEach((form: ReturnType<typeof useFormHook>) => {
      form.setError({
        key: 'email',
        val: 'You have already added this user email.',
      });
    });
    existingEmails.forEach((form: ReturnType<typeof useFormHook>) => {
      form.setError({
        key: 'email',
        val: 'A user with this email already exists.',
      });
    });
    Promise.all(allForms)
      .then(validData => {
        if (!matchingEmails.length && !existingEmails.length) {
          console.log('Validation succeeded, submitting all forms');
          onSubmit(validData);
        }
      })
      .catch(err => console.log('Validation Failed', err));
  };

  // add user form
  const addSection = async () => {
    if (isLastSectionTouched) {
      const formSubKeys = Object.keys(formSubscriptions);
      const lastSection = formSubscriptions[formSubKeys[formSubKeys.length - 1]];
      try {
        await lastSection.validateForm();
        setFormIds(formIds.concat(uniqueId()));
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('error: last section cannot be added');
    }
  };

  // remove user form
  const removeSection = removeId => {
    if (formIds.length > 1) {
      setFormIds(formIds.filter(id => id !== removeId));
      delete formSubscriptions[removeId];
    }
  };

  return (
    <Modal
      title="Add Users"
      actionButtonId="modal-add-users"
      actionButtonText="Add Users"
      cancelText="Cancel"
      onActionClick={() => submitForm()}
      onCancelClick={dismissModal}
      onCloseClick={dismissModal}
    >
      When you add users, they will receive an email inviting them to register. Note: the provided
      email address must be a Gmail or G Suite email address for login purposes.
      <div>
        {formIds.map((id, index) => (
          <AddUser
            key={id}
            id={id}
            formSubscriptions={formSubscriptions}
            removeSection={id => {
              removeSection(id);
            }}
            onUpdate={() => {
              touchCheck();
              errorCheck();
              lastSectionTouchCheck();
            }}
            showDelete={formIds.length > 1}
          />
        ))}
      </div>
      <AddSection variant="text" disabled={!isLastSectionTouched || hasErrors}>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          <Icon
            name="plus_circle"
            fill={isLastSectionTouched && !hasErrors ? 'accent2' : '#cecfd3'}
            css={css`
              margin-right: 3px;
            `}
          />
          <Typography
            onClick={() => (isLastSectionTouched && !hasErrors ? addSection() : null)}
            variant="paragraph"
            component="span"
          >
            Add another
          </Typography>
        </div>
      </AddSection>
    </Modal>
  );
};

export default AddUserModal;
