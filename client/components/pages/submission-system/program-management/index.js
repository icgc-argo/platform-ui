// @flow
import AddUserModal from 'components/pages/submission-system/modals/addUser';
import useAuthContext from 'global/hooks/useAuthContext';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { css } from 'uikit';
import Button from 'uikit/Button';
import InputLabel from 'uikit/form/InputLabel';
import Icon from 'uikit/Icon';
import { ContentBox } from 'uikit/PageLayout';
import Tabs, { Tab } from 'uikit/Tabs';
import TitleBar from 'uikit/TitleBar';
import CreateProgramForm from '../create-program/CreateProgramForm';
import SubmissionLayout, { ModalPortal } from '../layout';
import { isDccMember } from 'global/utils/egoJwt';
import Users from './Users';
import Profile from './Profile';
import PROGRAM_QUERY from './PROGRAM_QUERY.gql';
import INVITE_USER_MUTATION from './INVITE_USER_MUTATION.gql';
import { UserModel as ModalUserModel } from '../modals/common';

export const useSubmitFormHook = ({ gql }: { gql: typeof INVITE_USER_MUTATION }) => {
  const [triggerMutation, rest] = useMutation(gql);

  return [triggerMutation];
};

export const createUserInput = ({
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

export default ({ logOut, pathname }: { logOut: any => any, pathname: string }) => {
  const router = useRouter();
  const { data: egoTokenData, token } = useAuthContext();
  const isDcc = token ? isDccMember(token) : false;

  const { shortName: programShortName } = router.query;
  const { tab: defaultTab } = router.query;
  const { data: { program } = {}, loading, errors } = useQuery(PROGRAM_QUERY, {
    variables: { shortName: programShortName },
  });

  const TABS = { PROFILE: 'PROFILE', USERS: 'USERS' };
  const [activeTab, setActiveTab] = React.useState(
    defaultTab === 'profile' ? TABS.PROFILE : TABS.USERS,
  );

  function handleChange(event, newValue) {
    setActiveTab(newValue);
  }

  const [showModal, setShowModal] = React.useState(false);
  const [triggerInvite] = useSubmitFormHook({ gql: INVITE_USER_MUTATION });

  function handleCancelClick() {
    // reset the form
    setActiveTab('');
    setTimeout(() => {
      setActiveTab(TABS.PROFILE);
    });
  }

  return (
    <SubmissionLayout
      pathname={pathname}
      logOut={logOut}
      contentHeader={
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            width: 100%;
          `}
        >
          <TitleBar>
            <>Program Name</>
            <>Manage Program</>
          </TitleBar>
        </div>
      }
    >
      <>
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
            <Users programShortName={programShortName} users={FAKE_USERS} />
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
        </ContentBox>
        {showModal && (
          <ModalPortal>
            <AddUserModal
              onSubmit={validData =>
                triggerInvite({
                  variables: { user: createUserInput({ data: validData, programShortName }) },
                })
              }
              dismissModal={() => setShowModal(false)}
            />
          </ModalPortal>
        )}
      </>
    </SubmissionLayout>
  );
};

// TODO: Remove dummy data
const FAKE_USERS = [
  {
    id: '1',
    name: 'Homer Simpson',
    firstName: 'Homer',
    lastName: 'Simpson',
    email: 'test@email.com',
    role: 'ADMINISTRATOR',
    isDacoApproved: true,
    status: 'PENDING_INVITATION',
    joinDate: '03-02-2018',
  },
  {
    id: '2',
    name: 'Bart Simpson',
    firstName: 'Bart',
    lastName: 'Simpson',
    email: 'test@email.com',
    role: 'ADMINISTRATOR',
    isDacoApproved: true,
    status: 'PENDING_INVITATION',
    joinDate: '03-02-2018',
  },
  {
    id: '3',
    name: 'Lisa Simpson',
    firstName: 'Lisa',
    lastName: 'Simpson',
    email: 'test@email.com',
    role: 'ADMINISTRATOR',
    isDacoApproved: true,
    status: 'PENDING_INVITATION',
    joinDate: '03-02-2018',
  },
];
