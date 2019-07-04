import React from 'react';
import PropTypes from 'prop-types';
import Container from 'uikit/Container';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import { styled } from 'uikit';
import programsImage from 'static/programs.svg';
import { Row, Container as GridContainer, Col } from 'react-grid-system';
import Button from 'uikit/Button';

const FormContainer = styled(Container)`
  padding: 30px;
  max-width: 600px;
`;

const InfoCard = styled(Container)`
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const JoinProgramForm = ({ programName, userRole, onJoinClick }) => {
  return (
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
      </Row>
      <Row nogutter>
        <Typography variant="subtitle2" color="secondary" bold>
          Primary Affiliation
        </Typography>
      </Row>
      <Row>Stuff here</Row>
      <Row>
        <Button onClick={onJoinClick}>Join now</Button>
      </Row>
    </FormContainer>
  );
};

JoinProgramForm.propTypes = {
  programName: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  onJoinClick: PropTypes.func.isRequired,
};

export default JoinProgramForm;
