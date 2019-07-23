import React from 'react';
import UsersTable from './UsersTable';
import { TableActionBar } from 'uikit/Table';
import Toast from 'uikit/notifications/Toast';
import Portal from 'uikit/Portal';
import Fade from 'uikit/transitions/Fade';
import Modal from 'uikit/Modal';
import EditUserModal from '../modals/editUser';
import { ModalPortal } from '../layout';
import { useSubmitFormHook, createUserInput } from './';
import EDIT_USER_MUTATION from './EDIT_USER_MUTATION.gql';

function ResendEmailModal({ user, ...otherProps }) {
  return (
    <Modal.Overlay>
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
    </Modal.Overlay>
  );
}

const Users = ({ users, programShortName }) => {
  const [currentEditingUser, setCurrentEditingUser] = React.useState(null);
  const [triggerEdit] = useSubmitFormHook({ gql: EDIT_USER_MUTATION });

  const [isResendEmailModalOpen, setIsResendEmailModalOpen] = React.useState(false);
  const [isToastOpen, setIsToastOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const handleModalCancelClick = () => {
    setIsResendEmailModalOpen(false);
  };

  const handleResendEmailClick = ({ user }) => {
    setUser(user);
    setIsResendEmailModalOpen(true);
  };

  const handleActionClick = () => {
    setIsResendEmailModalOpen(false);
    setIsToastOpen(true);
  };

  const handleToastInteraction = ({ type, event }) => {
    if (type === 'CLOSE') {
      setIsToastOpen(false);
    }
  };

  return (
    <div>
      <TableActionBar>{users.length} results</TableActionBar>
      <UsersTable
        users={users}
        /**
         * @todo: actually implement these functions
         */
        onUserDeleteClick={console.log}
        onUserResendInviteClick={handleResendEmailClick}
        onUserEditClick={({ user }) => setCurrentEditingUser(user)}
      />
      {isResendEmailModalOpen && (
        <ResendEmailModal
          user={user}
          onCancelClick={handleModalCancelClick}
          onCloseClick={handleModalCancelClick}
          onActionClick={handleActionClick}
        />
      )}
      <Portal selector="body">
        <Fade in={isToastOpen}>
          <Toast
            variant="SUCCESS"
            title=""
            setOpen={setIsToastOpen}
            content={`The email invitation has been resent to ${
              currentEditingUser ? currentEditingUser.name : ''
            }`}
            onInteraction={handleToastInteraction}
          />
        </Fade>
      </Portal>

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
