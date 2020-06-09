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
import Modal from 'uikit/Modal';
import { UserSection, UserSectionProps, UserField } from '../styledComponents';
import { UserModel, userSchema } from '../common';
import useFormHook from 'global/hooks/useFormHook';
import { adminRestrictionText } from '../../program-management/Users';

const EditUserModal = ({
  user,
  dismissModal,
  onSubmit,
  roleDisabled,
}: {
  user: typeof UserModel;
  onSubmit: (data: typeof UserModel) => any | void;
  dismissModal: () => any | void;
  roleDisabled?: boolean;
}) => {
  const {
    errors,
    data: form,
    setData,
    validateField,
    validateForm,
    touched,
    hasErrors,
  } = useFormHook({ initialFields: user, schema: userSchema });
  const validationErrors = errors as UserSectionProps['errors'];
  const submitForm = async () => {
    try {
      const validData = await validateForm();
      const result = onSubmit(validData);
    } catch (err) {
      console.log(err);
    }
  };

  const disabledFields: Array<UserField> = [
    { fieldName: 'email' },
    { fieldName: 'firstName' },
    { fieldName: 'lastName' },
    ...(roleDisabled
      ? [{ fieldName: 'role', explanationText: adminRestrictionText } as UserField]
      : []),
  ];

  return (
    <Modal
      title="Edit Users"
      actionButtonText="Save"
      cancelText="Cancel"
      onActionClick={() => submitForm()}
      actionDisabled={!touched || hasErrors}
      onCancelClick={dismissModal}
      onCloseClick={dismissModal}
    >
      {/* added extra margin at bottom to prevent scrolling from modal body, give role dropdown display room */}
      <div style={{ marginBottom: 40 }}>
        <UserSection
          user={form}
          onChange={(key, val) => setData({ key, val })}
          validateField={key => validateField({ key })}
          errors={validationErrors}
          disabledFields={disabledFields}
          onClickDelete={null}
        />
      </div>
      <br />
    </Modal>
  );
};

export default EditUserModal;
