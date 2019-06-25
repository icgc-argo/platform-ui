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

export default ({ logOut, pathname, router }) => {
  const TABS = { PROFILE: 'PROFILE', USERS: 'USERS' };
  const [activeTab, setActiveTab] = React.useState(TABS.PROFILE);

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
        <Tabs value={activeTab} onChange={handleChange}>
          <Tab value="USERS" label="Users" />
          <Tab value="PROFILE" label="Profile" />
          <Tab empty />
        </Tabs>
        {activeTab === TABS.USERS && <Users />}
        {activeTab === TABS.PROFILE && <Profile />}
      </ContentBox>
    </SubmissionLayout>
  );
};

const Users = () => (
  <div>
    <UsersTable />
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
