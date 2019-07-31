// @flow
import React from 'react';
import UsersTable from './UsersTable';
import { TableActionBar } from 'uikit/Table';
import Fade from 'uikit/transitions/Fade';
import Modal from 'uikit/Modal';
import EditUserModal from '../modals/editUser';
import DeleteUserModal from '../modals/deleteUser';
import ResendInviteModal from '../modals/resendInvite';
import { ModalPortal } from '../layout';
import { useSubmitFormHook } from './';
import EDIT_USER_MUTATION from './EDIT_USER_MUTATION.gql';
import REMOVE_USER_MUTATION from './REMOVE_USER_MUTATION.gql';
import INVITE_USER_MUTATION from './INVITE_USER_MUTATION.gql';
import { useMutation } from 'react-apollo-hooks';

const Users = ({ users, programShortName, refetch }) => {
  const [currentEditingUser, setCurrentEditingUser] = React.useState(null);
  const [currentDeletingUser, setCurrentDeletingUser] = React.useState(null);
  const [currentResendEmailUser, setCurrentResendEmailUser] = React.useState(null);
  const [triggerEdit] = useSubmitFormHook({ gql: EDIT_USER_MUTATION });
  const [triggerDelete] = useMutation(REMOVE_USER_MUTATION);
  const [triggerResendInvite] = useMutation(INVITE_USER_MUTATION);

  return (
    <div>
      <TableActionBar>{users.length} results</TableActionBar>
      <UsersTable
        users={users}
        /**
         * @todo: actually implement these functions
         */
        onUserDeleteClick={({ user }) => setCurrentDeletingUser(user)}
        onUserResendInviteClick={({ user }) => setCurrentResendEmailUser(user)}
        onUserEditClick={({ user }) => setCurrentEditingUser(user)}
      />
      {!!currentResendEmailUser && (
        <ModalPortal>
          <ResendInviteModal
            user={currentResendEmailUser}
            dismissModal={() => setCurrentResendEmailUser(null)}
            onSubmit={async () => {
              try {
                const result = await triggerResendInvite({
                  variables: {
                    invite: {
                      programShortName,
                      userFirstName: currentResendEmailUser.firstName,
                      userLastName: currentResendEmailUser.lastName,
                      userEmail: currentResendEmailUser.email,
                      userRole: currentResendEmailUser.role,
                    },
                  },
                });
                //toaster for success
                setCurrentResendEmailUser(null);
              } catch (err) {
                // toaster for error
              }
            }}
          />
        </ModalPortal>
      )}
      {!!currentDeletingUser && (
        <ModalPortal>
          <DeleteUserModal
            user={currentDeletingUser}
            onSubmit={async () => {
              try {
                const result = await triggerDelete({
                  variables: { userEmail: currentDeletingUser.email, programShortName },
                });
                //toaster for success
                setCurrentDeletingUser(null);
                console.log('refetching', refetch);
                refetch();
              } catch (err) {
                // toaster for error
              }
            }}
            dismissModal={() => setCurrentDeletingUser(null)}
          />
        </ModalPortal>
      )}
      {!!currentEditingUser && (
        <ModalPortal>
          <EditUserModal
            user={currentEditingUser}
            onSubmit={async validData => {
              try {
                await triggerEdit({
                  variables: {
                    userEmail: validData.email,
                    programShortName,
                    userRole: validData.role,
                  },
                });
                // toaster for success
                setCurrentEditingUser(null);
                refetch();
              } catch (err) {
                //toaster for error
              }
            }}
            dismissModal={() => setCurrentEditingUser(null)}
          />
        </ModalPortal>
      )}
    </div>
  );
};

export default Users;
