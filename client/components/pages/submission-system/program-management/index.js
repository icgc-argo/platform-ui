// @flow
import AddUserModal from 'components/pages/submission-system/modals/addUser';
import useEgoToken from 'global/hooks/useEgoToken';
import _ from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Col, Row } from 'react-grid-system';
import { css } from 'uikit';
import Button from 'uikit/Button';
import InputLabel from 'uikit/form/InputLabel';
import Icon from 'uikit/Icon';
import Modal from 'uikit/Modal';
import { ContentBox } from 'uikit/PageLayout';
import { TableActionBar } from 'uikit/Table';
import Tabs, { Tab } from 'uikit/Tabs';
import TitleBar from 'uikit/TitleBar';
import Typography from 'uikit/Typography';
import CreateProgramForm from '../create-program/CreateProgramForm';
import SubmissionLayout, { ModalPortal } from '../layout';
import UsersTable from './UsersTable';
import Toast from 'uikit/notifications/Toast';
import Portal from 'uikit/Portal';
import { isDccMember } from 'global/utils/egoJwt';
import useTheme from 'uikit/utils/useTheme';
import Fade from 'uikit/transitions/Fade';

const useSubmitFormHook = ({ gql }) => {
  const [triggerMutation, rest] = useMutation(gql);

  return [triggerMutation];
};

/**
 * @todo: actually fix this Minh!
 */
// $FlowFixMe .gql file not supported
import PROGRAM_QUERY from './PROGRAM_QUERY.gql';
// $FlowFixMe .gql file not supported
import INVITE_USER_MUTATION from './INVITE_USER_MUTATION.gql';

const REGIONS = ['Africa', 'North America', 'Asia', 'Europe', 'Oceania', 'South America'];
export default ({ logOut, pathname }: { logOut: any => any, pathname: string }) => {
  const router = useRouter();
  const { data: egoTokenData, token } = useEgoToken();
  const isDcc = token ? isDccMember(token) : false;

  const { shortName } = router.query;
  const { tab: defaultTab } = router.query;
  const { data: { program } = {}, loading, errors } = useQuery(PROGRAM_QUERY, {
    variables: { shortName },
  });
  const TABS = { PROFILE: 'PROFILE', USERS: 'USERS' };
  const [activeTab, setActiveTab] = React.useState(
    defaultTab === 'profile' ? TABS.PROFILE : TABS.USERS,
  );

  function handleChange(event, newValue) {
    setActiveTab(newValue);
  }

  const createUserInput = data => ({
    programShortName: shortName,
    userFirstName: data.firstName,
    userLastName: data.lastName,
    userEmail: data.email,
    userRole: data.role,
  });

  const [showModal, setShowModal] = React.useState(false);
  const [triggerInvite] = useSubmitFormHook({ gql: INVITE_USER_MUTATION });

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
          {activeTab === TABS.USERS && <Users users={FAKE_USERS} />}
          {activeTab === TABS.PROFILE &&
            (isDcc ? (
              <div
                css={css`
                   {
                    padding: 17px 41px 41px 41px;
                  }
                `}
              >
                {!isEmpty(program) && <CreateProgramForm program={program} noCancel />}
              </div>
            ) : (
              <ProfileView program={program} />
            ))}
        </ContentBox>
        {showModal && (
          <ModalPortal>
            <AddUserModal
              onSubmit={validData =>
                triggerInvite({
                  variables: { user: createUserInput(validData) },
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
    email: 'test@email.com',
    role: 'ADMINISTRATOR',
    isDacoApproved: true,
    status: 'PENDING_INVITATION',
    joinDate: '03-02-2018',
  },
  {
    id: '2',
    name: 'Bart Simpson',
    email: 'test@email.com',
    role: 'ADMINISTRATOR',
    isDacoApproved: true,
    status: 'PENDING_INVITATION',
    joinDate: '03-02-2018',
  },
  {
    id: '3',
    name: 'Lisa Simpson',
    email: 'test@email.com',
    role: 'ADMINISTRATOR',
    isDacoApproved: true,
    status: 'PENDING_INVITATION',
    joinDate: '03-02-2018',
  },
];

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

function Users({ users }) {
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
        onUserResendInviteClick={handleResendEmailClick}
        onUserDeleteClick={() => {}}
        onUserEditClick={() => {}}
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
    </div>
  );
}

function ProfileView({ program = {} }) {
  const theme = useTheme();
  const Left = props => (
    <Col
      lg={2}
      md={4}
      css={css`
        padding: 7px 0;
      `}
      {...props}
    />
  );
  const Right = ({ children, ...props }) => (
    <Col
      lg={10}
      md={8}
      css={css`
        padding: 7px 0;
      `}
      {...props}
    >
      <div
        css={css`
          max-width: 45em;
        `}
      >
        {children}
      </div>
    </Col>
  );
  const SectionTitle = props => (
    <Typography
      component="h3"
      variant="sectionHeader"
      css={css`
        margin: 17px 0;
      `}
      color="secondary"
      bold
      {...props}
    />
  );

  return (
    <div
      css={css`
        ${css(theme.typography.paragraph)}
        padding: 17px 41px 41px 41px;
      `}
    >
      <SectionTitle>Program Details</SectionTitle>

      <Row>
        <Left>
          <InputLabel>Program Name</InputLabel>
        </Left>
        <Right>{program.name || '--'}</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Short Name</InputLabel>
        </Left>
        <Right>{program.shortName || '--'}</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Countries</InputLabel>
        </Left>
        <Right>{program.countries || '--'}</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Cancer Types</InputLabel>
        </Left>
        <Right>{_.join(program.cancerTypes, ', ') || '--'}</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Primary Sites</InputLabel>
        </Left>
        <Right>{_.isEmpty(program.primarySites) ? '--' : program.primarySites}</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Commitment Level</InputLabel>
        </Left>
        <Right>
          {(program.commitmentDonors && program.commitmentDonors.toLocaleString()) || '--'}
        </Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Membership Type</InputLabel>
        </Left>
        <Right>{program.membershipType || '--'}</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Description</InputLabel>
        </Left>
        <Right>{program.description || '--'}</Right>
      </Row>

      <SectionTitle>Affiliated Institutions</SectionTitle>
      <Row>
        <Left>
          <InputLabel>Institutions</InputLabel>
        </Left>
        <Right>{program.institutions || '--'}</Right>
      </Row>

      <SectionTitle>Processing Regions</SectionTitle>
      <Row>
        <Col
          css={css`
            padding: 7px 0;
          `}
        >
          <InputLabel>
            The data for this program CAN be processed in the following regions:
          </InputLabel>
        </Col>
      </Row>
      <Row>
        <Col
          css={css`
            padding: 7px 0;
          `}
        >
          <Icon width="15px" height="15px" name="checkmark" fill="success_dark" />
          &nbsp;{_.replace(program.regions, ',(?! )', ', ')}
        </Col>
      </Row>

      <Row>
        <Col
          css={css`
            padding: 7px 0;
          `}
        >
          <InputLabel>
            The data for this program CANNOT be processed in the following regions:
          </InputLabel>
        </Col>
      </Row>
      <Row>
        <Col
          css={css`
            padding: 7px 0;
          `}
        >
          <Icon width="15px" height="15px" name="times" fill="error_dark" />
          &nbsp;
          {program.regions &&
            _.join(
              _.filter(REGIONS, region => {
                return !program.regions.includes(region);
              }),
              ', ',
            )}
        </Col>
      </Row>
    </div>
  );
}
