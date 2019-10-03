import React from 'react';
import useAuthContext from 'global/hooks/useAuthContext';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { css } from 'uikit';
import Button from 'uikit/Button';
import { ContentBox } from 'uikit/PageLayout';
import Tabs, { Tab } from 'uikit/Tabs';
import AddUserModal from 'components/pages/submission-system/modals/addUser';
import ProgramForm from '../program-form/ProgramForm';
import { ModalPortal } from 'components/ApplicationRoot';
import { isDccMember } from 'global/utils/egoJwt';
import Users from './Users';
import Profile from './Profile';
import PROGRAM_QUERY from './PROGRAM_QUERY.gql';
import INVITE_USER_MUTATION from './INVITE_USER_MUTATION.gql';
import { UserModel as ModalUserModel } from '../modals/common';

import { useToaster } from 'global/hooks/toaster';
import Toast, { TOAST_VARIANTS, TOAST_INTERACTION } from 'uikit/notifications/Toast';
import UPDATE_PROGRAM_MUTATION from './UPDATE_PROGRAM_MUTATION.gql';
import useCommonToasters from 'components/useCommonToasters';
import { PROGRAM_SHORT_NAME_PATH } from 'global/constants/pages';

const createUserInput = ({
  data,
  programShortName,
}: {
  data: typeof ModalUserModel;
  programShortName: string;
}) => ({
  programShortName,
  userFirstName: data.firstName,
  userLastName: data.lastName,
  userEmail: data.email,
  userRole: data.role,
});

/* *************************************** *
 * Reshape form data for gql input
 * *************************************** */
const createUpdateProgramInput = formData => ({
  name: formData.programName,
  description: formData.description,
  commitmentDonors: parseInt(formData.commitmentLevel),
  website: formData.website,
  institutions: formData.institutions,
  countries: formData.countries,
  regions: Array.from(formData.processingRegions),
  membershipType: formData.membershipType,
  cancerTypes: formData.cancerTypes,
  primarySites: formData.primarySites,
});

type TabValue = 'profile' | 'users';
type PageQueryObject = {
  shortName: string;
  tab?: TabValue;
};

const usePageQuery = (): PageQueryObject => {
  const router = useRouter();
  const { tab, shortName } = router.query;
  return { tab, shortName };
};

const useTabState = () => {
  const router = useRouter();
  const { tab: defaultTab, shortName: programShortName } = usePageQuery();
  const TABS = {
    PROFILE: 'profile' as TabValue,
    USERS: 'users' as TabValue,
  };
  const [activeTab, setActiveTab] = React.useState<TabValue>(
    defaultTab === TABS.PROFILE ? TABS.PROFILE : TABS.USERS,
  );
  React.useEffect(() => {
    if (router.pathname) {
      window.history.replaceState(
        '',
        '',
        `${router.pathname.replace(PROGRAM_SHORT_NAME_PATH, programShortName)}?tab=${
          TABS[activeTab.toUpperCase()]
        }`,
      );
    }
  }, [activeTab]);
  return { activeTab, setActiveTab, TABS };
};

export default () => {
  const { token } = useAuthContext();
  const isDcc = token ? isDccMember(token) : false;

  const { shortName: programShortName } = usePageQuery();

  const { data: { program = null } = {}, loading, refetch } = useQuery(PROGRAM_QUERY, {
    variables: { shortName: programShortName },
  });

  const { activeTab, setActiveTab, TABS } = useTabState();

  const toaster = useToaster();
  const commonToasters = useCommonToasters();

  function handleChange(_event, newValue) {
    setActiveTab(newValue);
  }

  const [showModal, setShowModal] = React.useState(false);
  const [triggerInvite] = useMutation(INVITE_USER_MUTATION);

  const [sendUpdateProgram] = useMutation(UPDATE_PROGRAM_MUTATION);
  const onSubmit = async data => {
    try {
      await sendUpdateProgram({
        variables: {
          shortName: data.shortName,
          updates: createUpdateProgramInput(data),
        },
      });
      commonToasters.onSave();
    } catch (err) {
      commonToasters.unknownError();
    }
  };

  const onAddUserSubmit = async validData => {
    // Close modal on submit. Toasts after completion and refetch will indicate completion.
    // TODO: Some sort of indicator that data is being sent
    setShowModal(false);

    // validData will be an array of users to add
    // we need to store the list of names that are added successfully or failed to show in toasts after
    const successNames = [];
    const failNames = [];
    for (let i = 0; i < validData.length; i++) {
      try {
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
            {successNames.length} user{successNames.length === 1 ? ' was' : 's were'} added to the
            program: <br />
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
            {failNames.length} user{failNames.length > 1 && 's'} could not be added to the program:{' '}
            <br />
            <strong>{failNames.join(', ')}</strong>
          </span>
        ),
      });
    }
  };

  return (
    <ContentBox
      css={css`
        overflow: visible;
        padding-top: 0px;
        min-height: 300px;
      `}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        css={css`
          width: 100%;
        `}
      >
        <Tab value={TABS.USERS} label="Users" />
        <Tab value={TABS.PROFILE} label="Profile" />
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
          loading={loading}
          users={loading ? [] : program ? program.users : []}
          onUserUpdate={() => refetch()}
        />
      )}
      {activeTab === TABS.PROFILE &&
        (isDcc ? (
          <div
            css={css`
              padding: 17px 41px 41px 41px;
            `}
          >
            {!isEmpty(program) && (
              <ProgramForm
                program={program}
                onSubmit={onSubmit}
                leftFooterComponent={({ formModel }) => (
                  <Button variant="text" onClick={() => formModel.reset()}>
                    Cancel
                  </Button>
                )}
              />
            )}
          </div>
        ) : (
          <Profile program={program} />
        ))}
      {showModal && (
        <ModalPortal>
          <AddUserModal onSubmit={onAddUserSubmit} dismissModal={() => setShowModal(false)} />
        </ModalPortal>
      )}
    </ContentBox>
  );
};
