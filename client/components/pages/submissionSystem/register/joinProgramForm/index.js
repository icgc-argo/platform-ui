//@flow
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ScreenClassRender } from 'react-grid-system';
import Container from 'uikit/Container';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import { styled } from 'uikit';
import Button from 'uikit/Button';
import FormControl from 'uikit/form/FormControl';
import InputLabel from 'uikit/form/InputLabel';
import MultiSelect, { Option } from 'uikit/form/MultiSelect';
import { Input } from 'uikit/form';
import programsImage from 'static/programs.svg';

const FormContainer = styled(Container)`
  padding: 30px;
  max-width: 500px;
`;

const InfoCard = styled(Container)`
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const ProgramInfoCard = ({ programName, userRole }) => (
  <InfoCard>
    <img
      alt=""
      src={programsImage}
      css={css`
        margin-right: 16px;
      `}
    />
    <div>
      <Row nogutter>
        <Typography
          variant="label"
          color="primary"
          bold
          css={css`
            width: 150px;
          `}
        >
          Program Name:
        </Typography>
        <Typography variant="label" color="secondary" bold>
          {programName}
        </Typography>
      </Row>
      <Row nogutter>
        <Typography
          variant="label"
          color="primary"
          bold
          css={css`
            width: 150px;
          `}
        >
          Role:
        </Typography>
        <Typography variant="label" color="secondary" bold>
          {userRole}
        </Typography>
      </Row>
    </div>
  </InfoCard>
);

const Form = ({ availableInstitutions = [] }) => (
  <ScreenClassRender
    render={screenSize => (
      <div>
        <FormControl required>
          <Row nogutter align="center">
            <Col sm={3}>
              <InputLabel required>Institution</InputLabel>
            </Col>
            <Col>
              <MultiSelect aria-label="institution-input" allowNew>
                {availableInstitutions.map(institution => (
                  <Option>{institution}</Option>
                ))}
              </MultiSelect>
            </Col>
          </Row>
        </FormControl>
        <Row nogutter>
          <Col sm={6}>
            <FormControl required>
              <Row nogutter align="center">
                <Col sm={6}>
                  <InputLabel required>PI First Name</InputLabel>
                </Col>
                <Col>
                  <Input aria-label="first-name-input" />
                </Col>
              </Row>
            </FormControl>
          </Col>
          <Col sm={6}>
            <FormControl required>
              <Row
                nogutter
                align="center"
                style={{
                  ...(screenSize === 'xs'
                    ? {}
                    : {
                        paddingLeft: 10,
                      }),
                }}
              >
                <Col sm={6}>
                  <InputLabel required>PI Last Name</InputLabel>
                </Col>
                <Col>
                  <Input aria-label="first-last-input" />
                </Col>
              </Row>
            </FormControl>
          </Col>
        </Row>

        <FormControl>
          <Row nogutter align="center">
            <Col sm={3}>
              <InputLabel required>Department</InputLabel>
            </Col>
            <Col>
              <Input aria-label="department-input" />
            </Col>
          </Row>
        </FormControl>
      </div>
    )}
  />
);

const JoinProgramForm = ({
  programName,
  userRole,
  availableInstitutions,
  onJoinClick,
}: {
  programName: string,
  userRole: string,
  availableInstitutions: Array<any>,
  onJoinClick: any => any,
}) => (
  <FormContainer>
    <Row nogutter>
      <Typography
        variant="title"
        color="primary"
        css={css`
          margin: 0px;
        `}
      >
        Join a Program
      </Typography>
    </Row>
    <Row nogutter>
      <Typography variant="paragraph">
        You have been invited to join the following program, but first we need a few details.
      </Typography>
    </Row>
    <Row nogutter>
      <ProgramInfoCard programName={programName} userRole={userRole} />
    </Row>
    <Row
      nogutter
      css={css`
        padding: 10px 0px;
      `}
    >
      <Typography variant="subtitle2" component="h2" color="secondary" bold>
        Primary Affiliation
      </Typography>
    </Row>
    <Form availableInstitutions={availableInstitutions} />
    <Row nogutter justify="end">
      <Button onClick={onJoinClick}>Join now</Button>
    </Row>
  </FormContainer>
);

export default JoinProgramForm;
