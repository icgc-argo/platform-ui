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
import { TOAST_VARIANTS, TOAST_INTERACTION } from 'uikit/notifications/Toast';
import UPDATE_PROGRAM_MUTATION from './UPDATE_PROGRAM_MUTATION.gql';
import useCommonToasters from 'components/useCommonToasters';
import useUrlParamState from 'global/hooks/useUrlParamState';

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
  return { tab, shortName } as PageQueryObject;
};

const useTabState = () => {
  const TABS = {
    PROFILE: 'profile' as TabValue,
    USERS: 'users' as TabValue,
  };
  const [activeTab, setActiveTab] = useUrlParamState('activeTab', TABS.USERS, {
    serialize: v => v,
    deSerialize: v => v as TabValue,
  });

  return { activeTab, setActiveTab, TABS } as {
    activeTab: TabValue;
    setActiveTab: (tab: TabValue) => void;
    TABS: typeof TABS;
  };
};

export default () => {
  const { token, permissions } = useAuthContext();
  const isDcc = React.useMemo(() => isDccMember(permissions), [token]);

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
      await refetch();
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
              id="add-users"
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
          <AddUserModal
            onSubmit={onAddUserSubmit}
            dismissModal={() => setShowModal(false)}
            users={loading ? [] : program ? program.users : []}
          />
        </ModalPortal>
      )}
    </ContentBox>
  );
};
