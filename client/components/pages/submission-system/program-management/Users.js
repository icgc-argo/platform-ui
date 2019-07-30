// @flow
import React from 'react';
import UsersTable from './UsersTable';
import { TableActionBar } from 'uikit/Table';
import Toast, { TOAST_VARIANTS } from 'uikit/notifications/Toast';
import Portal from 'uikit/Portal';
import Fade from 'uikit/transitions/Fade';
import Modal from 'uikit/Modal';
import EditUserModal from '../modals/editUser';
import DeleteUserModal from '../modals/deleteUser';
import { ModalPortal } from '../layout';
import { useSubmitFormHook, createUserInput } from './';
import EDIT_USER_MUTATION from './EDIT_USER_MUTATION.gql';
import REMOVE_USER_MUTATION from './REMOVE_USER_MUTATION.gql';
import { useMutation } from 'react-apollo-hooks';
import { useToaster } from '../toaster';

function ResendEmailModal({ user, ...otherProps }) {
  return (
    <Modal
      title="Resend Invitation?"
      actionButtonText="RESEND INVITATION"
      cancelText="CANCEL"
      {...otherProps}
    >
      <div style={{ width: '322px' }}>
        Are you sure you want to resend the email invitation to{' '}
        <strong>{user ? user.name : ''}</strong>?
      </div>
    </Modal>
  );
}

const Users = ({ users, programShortName }: { users: Array<any>, programShortName: string }) => {
  const [currentEditingUser, setCurrentEditingUser] = React.useState(null);
  const [currentDeletingUser, setCurrentDeletingUser] = React.useState(null);
  const [triggerEdit] = useSubmitFormHook({ gql: EDIT_USER_MUTATION });
  const [triggerDelete] = useMutation(REMOVE_USER_MUTATION);
  const [isResendEmailModalOpen, setIsResendEmailModalOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const toaster = useToaster();

  const handleModalCancelClick = () => {
    setIsResendEmailModalOpen(false);
  };

  const handleResendEmailClick = ({ user }) => {
    setUser(user);
    setIsResendEmailModalOpen(true);
  };

  const handleActionClick = () => {
    setIsResendEmailModalOpen(false);
    toaster.addToast({
      variant: TOAST_VARIANTS.SUCCESS,
      title: '',
      content: `The email invitation has been resent to ${
        currentEditingUser ? currentEditingUser.name : ''
      }`,
    });
  };

  return (
    <div>
      <TableActionBar>{users.length} results</TableActionBar>
      <UsersTable
        users={users}
        /**
         * @todo: actually implement these functions
         */
        onUserDeleteClick={({ user }) => setCurrentDeletingUser(user)}
        onUserResendInviteClick={handleResendEmailClick}
        onUserEditClick={({ user }) => setCurrentEditingUser(user)}
      />
      {isResendEmailModalOpen && (
        <ModalPortal>
          <ResendEmailModal
            user={user}
            onCancelClick={handleModalCancelClick}
            onCloseClick={handleModalCancelClick}
            onActionClick={handleActionClick}
          />
        </ModalPortal>
      )}
      {!!currentDeletingUser && (
        <ModalPortal>
          <DeleteUserModal
            user={currentDeletingUser}
            onSubmit={validData => {
              triggerDelete({
                variables: { userEmail: currentDeletingUser.email, programShortName },
              });
            }}
            dismissModal={() => setCurrentDeletingUser(null)}
          />
        </ModalPortal>
      )}
      {!!currentEditingUser && (
        <ModalPortal>
          <EditUserModal
            user={currentEditingUser}
            onSubmit={validData =>
              triggerEdit({
                variables: { user: createUserInput({ data: validData, programShortName }) },
              })
            }
            dismissModal={() => setCurrentEditingUser(null)}
          />
        </ModalPortal>
      )}
    </div>
  );
};

export default Users;
