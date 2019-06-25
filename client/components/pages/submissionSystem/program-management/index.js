import React from 'react';
import TitleBar from 'uikit/TitleBar';
import { css } from 'uikit';
import SubmissionLayout from '../layout';
import { ContentBox } from 'uikit/PageLayout';
import Tabs, { Tab } from 'uikit/Tabs';
import InputLabel from 'uikit/form/InputLabel';

import Typography from 'uikit/Typography';
import { Row, Col } from 'react-grid-system';
import { ThemeContext } from '@emotion/core';
import Icon from 'uikit/Icon';
import UsersTable from './UsersTable';
import Button from 'uikit/Button';
import { TableActionBar } from 'uikit/Table';
import users from 'uikit/Icon/icons/collection/users';
import InteractiveIcon from 'uikit/Table/InteractiveIcon';

export default ({ logOut, pathname, router }) => {
  const TABS = { PROFILE: 'PROFILE', USERS: 'USERS' };
  const [activeTab, setActiveTab] = React.useState(TABS.USERS);

  function handleChange(event, newValue) {
    setActiveTab(newValue);
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
            <Button
              css={css`
                margin: 9px 0;
              `}
            >
              Add Users
            </Button>
          </Tab>
        </Tabs>
        {activeTab === TABS.USERS && <Users users={FAKE_USERS} />}
        {activeTab === TABS.PROFILE && <Profile />}
      </ContentBox>
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

const Users = ({ users }) => (
  <div>
    <TableActionBar>{users.length} results</TableActionBar>
    <UsersTable users={users} />
  </div>
);

function Profile() {
  const theme = React.useContext(ThemeContext);
  const Left = props => (
    <Col
      md={3}
      css={css`
        padding: 7px 0;
      `}
      {...props}
    />
  );
  const Right = props => <Col md={9} {...props} />;
  const SectionTitle = props => (
    <Typography
      component="h3"
      variant="subtitle2"
      css={css`
        margin: 17px 0;
        font-size: 16px;
        font-weight: 600;
        color: ${theme.colors.secondary};
      `}
      {...props}
    />
  );
  return (
    <div
      css={css`
        padding: 17px 41px;
      `}
    >
      <SectionTitle>Program Details</SectionTitle>

      <Row>
        <Left>
          <InputLabel>Program Name</InputLabel>
        </Left>
        <Right>test</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Short Name</InputLabel>
        </Left>
        <Right>test</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Countries</InputLabel>
        </Left>
        <Right>test</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Cancer Types</InputLabel>
        </Left>
        <Right>test</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Primary Sites</InputLabel>
        </Left>
        <Right>test</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Commitment Level</InputLabel>
        </Left>
        <Right>test</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Membership Type</InputLabel>
        </Left>
        <Right>test</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Description</InputLabel>
        </Left>
        <Right>test</Right>
      </Row>

      <SectionTitle>Affiliated Institutions</SectionTitle>
      <Row>
        <Left>
          <InputLabel>Institutions</InputLabel>
        </Left>
        <Right>--</Right>
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
          <Icon name="checkmark" fill="success_dark" />
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
          <Icon name="times" fill="error_dark" />
        </Col>
      </Row>
    </div>
  );
}
