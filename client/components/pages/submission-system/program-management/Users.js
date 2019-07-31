// @flow
import React from 'react';
import { useMutation } from 'react-apollo-hooks';

import UsersTable from './UsersTable';
import { TableActionBar } from 'uikit/Table';
import Fade from 'uikit/transitions/Fade';
import Toast, { TOAST_VARIANTS, TOAST_INTERACTION } from 'uikit/notifications/Toast';

import EditUserModal from '../modals/editUser';
import DeleteUserModal from '../modals/deleteUser';
import ResendInviteModal from '../modals/resendInvite';
import { ModalPortal } from '../layout';

import { useSubmitFormHook } from './';
import { useToaster } from '../toaster';

import EDIT_USER_MUTATION from './EDIT_USER_MUTATION.gql';
import REMOVE_USER_MUTATION from './REMOVE_USER_MUTATION.gql';
import INVITE_USER_MUTATION from './INVITE_USER_MUTATION.gql';

const Users = ({
  users,
  programShortName,
  refetch,
}: {
  users: Array<any>,
  programShortName: string,
  refetch: any => void,
}) => {
  const [currentEditingUser, setCurrentEditingUser] = React.useState(null);
  const [currentDeletingUser, setCurrentDeletingUser] = React.useState(null);
  const [currentResendEmailUser, setCurrentResendEmailUser] = React.useState(null);
  const [triggerEdit] = useSubmitFormHook({ gql: EDIT_USER_MUTATION });
  const [triggerDelete] = useMutation(REMOVE_USER_MUTATION);
  const [triggerResendInvite] = useMutation(INVITE_USER_MUTATION);

  const toaster = useToaster();

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
                toaster.addToast({
                  variant: TOAST_VARIANTS.SUCCESS,
                  interactionType: TOAST_INTERACTION.CLOSE,
                  title: '',
                  content: (
                    <span>
                      The email invitation has been resent to{' '}
                      <strong>
                        {currentResendEmailUser && currentResendEmailUser.firstName}{' '}
                        {currentResendEmailUser && currentResendEmailUser.lastName}
                      </strong>
                    </span>
                  ),
                });
                refetch();
              } catch (err) {
                toaster.addToast({
                  variant: TOAST_VARIANTS.ERROR,
                  title: '',
                  content: 'An error occurred while sending the invite.',
                });
              }
              setCurrentResendEmailUser(null);
            }}
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
                toaster.addToast({
                  variant: TOAST_VARIANTS.SUCCESS,
                  interactionType: TOAST_INTERACTION.CLOSE,
                  title: '',
                  content: (
                    <span>
                      Successfully updated user:
                      <strong>
                        {currentDeletingUser && currentDeletingUser.firstName}{' '}
                        {currentDeletingUser && currentDeletingUser.lastName}
                      </strong>
                    </span>
                  ),
                });
                refetch();
              } catch (err) {
                toaster.addToast({
                  variant: TOAST_VARIANTS.ERROR,
                  title: '',
                  content: 'An error occurred while updating the user.',
                });
              }
              setCurrentEditingUser(null);
            }}
            dismissModal={() => setCurrentEditingUser(null)}
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
                toaster.addToast({
                  variant: TOAST_VARIANTS.SUCCESS,
                  interactionType: TOAST_INTERACTION.CLOSE,
                  title: '',
                  content: (
                    <span>
                      Successfully removed user:
                      <strong>
                        {currentDeletingUser && currentDeletingUser.firstName}{' '}
                        {currentDeletingUser && currentDeletingUser.lastName}
                      </strong>
                    </span>
                  ),
                });
                refetch();
              } catch (err) {
                toaster.addToast({
                  variant: TOAST_VARIANTS.ERROR,
                  title: '',
                  content: 'An error occurred while removing the user.s',
                });
              }
              setCurrentDeletingUser(null);
            }}
            dismissModal={() => setCurrentDeletingUser(null)}
          />
        </ModalPortal>
      )}
    </div>
  );
};

export default Users;
