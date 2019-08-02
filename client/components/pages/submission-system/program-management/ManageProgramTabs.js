// @flow
import React from 'react';
import useAuthContext from 'global/hooks/useAuthContext';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { css } from 'uikit';
import Button from 'uikit/Button';
import { ContentBox } from 'uikit/PageLayout';
import Tabs, { Tab } from 'uikit/Tabs';
import AddUserModal from 'components/pages/submission-system/modals/addUser';
import CreateProgramForm from '../create-program/CreateProgramForm';
import { ModalPortal } from '../layout';
import { isDccMember } from 'global/utils/egoJwt';
import Users from './Users';
import Profile from './Profile';
import PROGRAM_QUERY from './PROGRAM_QUERY.gql';
import INVITE_USER_MUTATION from './INVITE_USER_MUTATION.gql';
import { UserModel as ModalUserModel } from '../modals/common';

import { useToaster } from '../toaster';
import Toast, { TOAST_VARIANTS, TOAST_INTERACTION } from 'uikit/notifications/Toast';

const createUserInput = ({
  data,
  programShortName,
}: {
  data: typeof ModalUserModel,
  programShortName: string,
}) => ({
  programShortName,
  userFirstName: data.firstName,
  userLastName: data.lastName,
  userEmail: data.email,
  userRole: data.role,
});

export default () => {
  const router = useRouter();
  const { data: egoTokenData, token } = useAuthContext();
  const isDcc = token ? isDccMember(token) : false;

  const { shortName: programShortName } = router.query;
  const { tab: defaultTab } = router.query;

  const { data: { program } = {}, loading, errors, refetch } = useQuery(PROGRAM_QUERY, {
    variables: { shortName: programShortName },
  });

  const TABS = { PROFILE: 'PROFILE', USERS: 'USERS' };
  const [activeTab, setActiveTab] = React.useState(
    defaultTab === 'profile' ? TABS.PROFILE : TABS.USERS,
  );

  const toaster = useToaster();

  function handleChange(event, newValue) {
    setActiveTab(newValue);
  }

  const [showModal, setShowModal] = React.useState(false);
  const [triggerInvite] = useMutation(INVITE_USER_MUTATION);

  function handleCancelClick() {
    // reset the form
    setActiveTab('');
    setTimeout(() => {
      setActiveTab(TABS.PROFILE);
    });
  }
  return (
    <ContentBox
      css={css`
        padding-top: 0px;
      `}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        css={css`
          width: 100%;
        `}
      >
        <Tab value="USERS" label="Users" />
        <Tab value="PROFILE" label="Profile" />
        <Tab
          empty
          css={css`
            padding: 0;
            justify-content: flex-end;
          `}
        >
          {activeTab === TABS.USERS && (
            <Button
              css={css`
                margin: 9px 0;
              `}
              onClick={() => setShowModal(true)}
            >
              Add Users
            </Button>
          )}
        </Tab>
      </Tabs>
      {activeTab === TABS.USERS && (
        <Users
          programShortName={programShortName}
          users={loading ? [] : program.users}
          onUserUpdate={() => refetch()}
        />
      )}
      {activeTab === TABS.PROFILE &&
        (isDcc ? (
          <div
            css={css`
               {
                padding: 17px 41px 41px 41px;
              }
            `}
          >
            {!isEmpty(program) && (
              <CreateProgramForm
                program={program}
                leftFooterComponent={
                  <Button variant="text" onClick={handleCancelClick}>
                    Cancel
                  </Button>
                }
              />
            )}
          </div>
        ) : (
          <Profile program={program} />
        ))}
      {showModal && (
        <ModalPortal>
          <AddUserModal
            onSubmit={async validData => {
              // Close modal on submit. Toasts after completion and refetch will indicate completion.
              // TODO: Some sort of indicator that data is being sent
              setShowModal(false);

              // validData will be an array of users to add
              // we need to store the list of names that are added successfully or failed to show in toasts after
              const successNames = [];
              const failNames = [];
              for (let i = 0; i < validData.length; i++) {
                try {
                  if (i > 0) throw new Error('ah!');
                  await triggerInvite({
                    variables: {
                      invite: createUserInput({ data: validData[i], programShortName }),
                    },
                  });
                  successNames.push(`${validData[i].firstName} ${validData[i].lastName}`);
                } catch (err) {
                  failNames.push(`${validData[i].firstName} ${validData[i].lastName}`);
                }
              }
              refetch();
              if (successNames.length > 0) {
                toaster.addToast({
                  variant: TOAST_VARIANTS.SUCCESS,
                  interactionType: TOAST_INTERACTION.CLOSE,
                  title: '',
                  content: (
                    <span>
                      {successNames.length} user{successNames.length === 1 ? ' was' : 's were'}{' '}
                      added to the program: <br />
                      <strong>{successNames.join(', ')}</strong>
                    </span>
                  ),
                });
              }
              if (failNames.length > 0) {
                toaster.addToast({
                  variant: TOAST_VARIANTS.ERROR,
                  title: '',
                  content: (
                    <span>
                      {failNames.length} user{failNames.length > 1 && 's'} could not be added to the
                      program: <br />
                      <strong>{failNames.join(', ')}</strong>
                    </span>
                  ),
                });
              }
            }}
            dismissModal={() => setShowModal(false)}
          />
        </ModalPortal>
      )}
    </ContentBox>
  );
};
