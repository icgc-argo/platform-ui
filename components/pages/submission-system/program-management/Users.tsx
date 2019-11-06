import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import UsersTable from './UsersTable';
import { TableActionBar } from 'uikit/Table';
import Fade from 'uikit/transitions/Fade';
import { TOAST_VARIANTS, TOAST_INTERACTION } from 'uikit/notifications/Toast';

import EditUserModal from '../modals/editUser';
import DeleteUserModal from '../modals/deleteUser';
import ResendInviteModal from '../modals/resendInvite';
import { ModalPortal } from 'components/ApplicationRoot';

import { useToaster } from 'global/hooks/toaster';
import { UserModel, RoleDisplayName } from '../modals/common';
import { useModalViewAnalyticsEffect } from 'global/hooks/analytics';

import EDIT_USER_MUTATION from './EDIT_USER_MUTATION.gql';
import REMOVE_USER_MUTATION from './REMOVE_USER_MUTATION.gql';
import INVITE_USER_MUTATION from './INVITE_USER_MUTATION.gql';

const Users = ({
  users,
  programShortName,
  onUserUpdate,
  loading,
}: {
  users: Array<any>;
  programShortName: string;
  onUserUpdate: () => void;
  loading: boolean;
}) => {
  const [currentEditingUser, setCurrentEditingUser] = React.useState(null);
  const [currentDeletingUser, setCurrentDeletingUser] = React.useState(null);
  const [currentResendEmailUser, setCurrentResendEmailUser] = React.useState(null);
  const [triggerEdit] = useMutation(EDIT_USER_MUTATION);
  const [triggerDelete] = useMutation(REMOVE_USER_MUTATION);
  const [triggerResendInvite] = useMutation(INVITE_USER_MUTATION);

  const toaster = useToaster();

  /** @GOOGLE_ANALYTICS **/
  useModalViewAnalyticsEffect(`USER_EDIT_MODAL`, !!currentEditingUser);
  useModalViewAnalyticsEffect(`USER_REMOVE_MODAL`, !!currentDeletingUser);
  useModalViewAnalyticsEffect(`USER_EMAIL_RESEND_MODAL`, !!currentResendEmailUser);

  return (
    <div>
      <TableActionBar>{users.length} results</TableActionBar>
      <UsersTable
        loading={loading}
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
                onUserUpdate();
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
            onSubmit={async (validData: typeof UserModel) => {
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
                      The information for{' '}
                      <strong>
                        {currentEditingUser && currentEditingUser.firstName}{' '}
                        {currentEditingUser && currentEditingUser.lastName}
                      </strong>{' '}
                      has been updated.
                    </span>
                  ),
                });
                onUserUpdate();
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
                      The user{' '}
                      <strong>
                        {currentDeletingUser && currentDeletingUser.firstName}{' '}
                        {currentDeletingUser && currentDeletingUser.lastName}
                      </strong>{' '}
                      has been removed.
                    </span>
                  ),
                });
                onUserUpdate();
              } catch (err) {
                toaster.addToast({
                  variant: TOAST_VARIANTS.ERROR,
                  title: '',
                  content: 'An error occurred while removing the user.',
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
