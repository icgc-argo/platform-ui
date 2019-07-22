// @flow
import React from 'react';
import UsersTable from './UsersTable';
import { TableActionBar } from 'uikit/Table';
import Toast from 'uikit/notifications/Toast';
import Portal from 'uikit/Portal';
import Fade from 'uikit/transitions/Fade';
import Modal from 'uikit/Modal';
import EditUserModal from '../modals/editUser';
import { ModalPortal } from '../layout';

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
const Users = ({ users }) => {
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
  const initialState = { selectedUser: null, showModal: false };
  const reducer = (state, action) => {
    console.log('reducer', state, action);
    return action.showModal
      ? { selectedUser: action.user, showModal: true }
      : { selectedUser: null, showModal: false };
  };
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { showModal, selectedUser } = state;

  return (
    <div>
      <TableActionBar>{users.length} results</TableActionBar>
      <UsersTable
        users={users}
        /**
         * @todo: actually implement these functions
         */
        onUserDeleteClick={console.log}
        onUserEditClick={console.log}
        onUserResendInviteClick={handleResendEmailClick}
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
            content={`The email invitation has been resent to ${user ? user.name : ''}`}
            onInteraction={handleToastInteraction}
          />
        </Fade>
      </Portal>

      {showModal && (
        <ModalPortal>
          <EditUserModal
            user={selectedUser}
            onSubmit={validData => console.log('validate data', validData)}
            dismissModal={() => dispatch({ showModal: false })}
          />
        </ModalPortal>
      )}
    </div>
  );
};

export default Users;
