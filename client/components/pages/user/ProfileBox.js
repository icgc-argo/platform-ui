//@flow
import * as React from 'react';
import DefaultLayout from '../DefaultLayout';
import { ContentBox } from 'uikit/PageLayout';
import Typography from 'uikit/Typography';
import { Row, Col } from 'react-grid-system';
import { css } from 'uikit';
import useAuthContext from 'global/hooks/useAuthContext';
import useTheme from 'uikit/utils/useTheme';
import { Box } from './common';

const UserInitialImage = ({ contentText = '' }) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        position: relative;
        width: 100px;
        height: 100px;
        background: url('static/initials-large.svg');
        pointer-events: none;
      `}
    >
      <div
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          background: ${theme.colors.accent1_3};
          color: ${theme.colors.accent1_dark};
          font-size: 25px;
          border-radius: 1000px;
          height: 50px;
          width: 50px;
          margin-left: -26px;
          margin-top: -27px;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        {contentText}
      </div>
    </div>
  );
};

export default function ProfileBox() {
  const { data: userModel } = useAuthContext() || {};

  return (
    <Box title="Profile">
      <Row nogutter>
        <Col sm={12} md={2}>
          <div
            css={css`
              margin-top: 10px;
            `}
          >
            <UserInitialImage
              contentText={
                userModel &&
                `${userModel.context.user.firstName[0]}${userModel.context.user.lastName[0]}`
              }
            />
          </div>
        </Col>
        <Col sm={12} md={5}>
          <Row nogutter>
            <Col xs={4}>
              <Typography variant="paragraph" bold>
                Name
              </Typography>
            </Col>
            <Col>
              <Typography variant="paragraph">
                {userModel && userModel.context.user.firstName}{' '}
                {userModel && userModel.context.user.lastName}
              </Typography>
            </Col>
          </Row>
          <Row nogutter>
            <Col xs={4}>
              <Typography variant="paragraph" bold>
                Email Address
              </Typography>
            </Col>
            <Col>
              <Typography variant="paragraph">
                {userModel && userModel.context.user.email}
              </Typography>
            </Col>
          </Row>
        </Col>
        <Col sm={12} md={5}>
          {
            // Not implemented until persona is available
            /* <Row nogutter>
            <Col xs={4}>
              <Typography variant="paragraph" bold>
                Institution
              </Typography>
            </Col>
            <Col>
              <Typography variant="paragraph">Stuff</Typography>
            </Col>
          </Row>
          <Row nogutter>
            <Col xs={4}>
              <Typography variant="paragraph" bold>
                PI Name
              </Typography>
            </Col>
            <Col>
              <Typography variant="paragraph">Stuff</Typography>
            </Col>
          </Row>
          <Row nogutter>
            <Col xs={4}>
              <Typography variant="paragraph" bold>
                Department
              </Typography>
            </Col>
            <Col>
              <Typography variant="paragraph">Stuff</Typography>
            </Col>
          </Row> */
          }
        </Col>
      </Row>
    </Box>
  );
}
