import React from 'react';
import useTheme from 'uikit/utils/useTheme';
import { Col, Row } from 'react-grid-system';
import Typography from 'uikit/Typography';
import InputLabel from 'uikit/form/InputLabel';
import Icon from 'uikit/Icon';
import { css } from 'uikit';
import join from 'lodash/join';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import replace from 'lodash/replace';

const REGIONS = ['Africa', 'North America', 'Asia', 'Europe', 'Oceania', 'South America'];

const MISSING_ENTRY_TEXT = '--';

const arrayToText = array => (isEmpty(array) ? MISSING_ENTRY_TEXT : join(array, ', '));

type Program = {
  name?: string;
  shortName?: string;
  countries?: string;
  cancerTypes?: string;
  primarySites?: string;
  commitmentDonors?: string;
  membershipType?: string;
  description?: string;
  institutions?: string;
  regions?: string;
};
function ProfileView({ program = {} as Program }) {
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
        <Right>{program.name || MISSING_ENTRY_TEXT}</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Short Name</InputLabel>
        </Left>
        <Right>{program.shortName || MISSING_ENTRY_TEXT}</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Countries</InputLabel>
        </Left>
        <Right>{arrayToText(program.countries)}</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Cancer Types</InputLabel>
        </Left>
        <Right>{arrayToText(program.cancerTypes)}</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Primary Sites</InputLabel>
        </Left>
        <Right>{arrayToText(program.primarySites)}</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Commitment Level</InputLabel>
        </Left>
        <Right>
          {(program.commitmentDonors && program.commitmentDonors.toLocaleString()) ||
            MISSING_ENTRY_TEXT}
        </Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Membership Type</InputLabel>
        </Left>
        <Right>{program.membershipType || MISSING_ENTRY_TEXT}</Right>
      </Row>

      <Row>
        <Left>
          <InputLabel>Description</InputLabel>
        </Left>
        <Right>{program.description || MISSING_ENTRY_TEXT}</Right>
      </Row>

      <SectionTitle>Affiliated Institutions</SectionTitle>
      <Row>
        <Left>
          <InputLabel>Institutions</InputLabel>
        </Left>
        <Right>{arrayToText(program.institutions)}</Right>
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
          &nbsp;{replace(program.regions, ',(?! )', ', ')}
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
            join(
              filter(REGIONS, region => {
                return !program.regions.includes(region);
              }),
              ', ',
            )}
        </Col>
      </Row>
    </div>
  );
}

export default ProfileView;
