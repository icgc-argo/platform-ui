// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, ScreenClassRender } from 'react-grid-system';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import { useTheme } from 'uikit/ThemeProvider';
import styled from '@emotion/styled-base';
import Button, { BUTTON_VARIANTS, BUTTON_SIZES } from 'uikit/Button';
import HyperLink from 'uikit/Link';
import Link from 'next/link';
import Icon from 'uikit/Icon';
import { CONTACT_PAGE_PATH } from 'global/constants/pages';

const Instructions = (props: { registrationEnabled: boolean }) => {
  const theme = useTheme();
  const InstructionStep = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    padding-bottom: 10px;
    height: 100%;
  `;
  const smallScreenRowStyle = css`
    & > * {
      border-bottom: solid 1px ${theme.colors.grey_2};
    }
  `;
  const defaultRowStyle = css`
    border-bottom: solid 1px ${theme.colors.grey_2};
    & > :not(:first-child) {
      border-left: solid 1px ${theme.colors.grey_2};
    }
  `;
  const buttonStyle = css`
    margin-top: 10px;
    width: 150px;
  `;
  return (
    <ScreenClassRender
      render={size => (
        <Col>
          <Row nogutter css={['xs'].includes(size) ? smallScreenRowStyle : defaultRowStyle}>
            <Col xs={12} sm={4}>
              <InstructionStep>
                <Typography variant="paragraph" component="span">
                  1. Download the registration template and format it using the latest{` `}
                  <Link href={CONTACT_PAGE_PATH}>
                    <a>
                      <HyperLink>Data Dictionary.</HyperLink>
                    </a>
                  </Link>
                </Typography>
                <Button
                  css={buttonStyle}
                  variant={BUTTON_VARIANTS.SECONDARY}
                  size={BUTTON_SIZES.SM}
                >
                  <Icon name="edit" fill="accent2_dark" height="10px" /> File Template
                </Button>
              </InstructionStep>
            </Col>
            <Col xs={12} sm={4}>
              <InstructionStep>
                <Typography variant="paragraph" component="span">
                  2. Upload your formatted registration TSV file.
                </Typography>
                <Button
                  css={buttonStyle}
                  variant={BUTTON_VARIANTS.SECONDARY}
                  size={BUTTON_SIZES.SM}
                >
                  <Icon name="edit" fill="accent2_dark" height="10px" /> Upload File
                </Button>
              </InstructionStep>
            </Col>
            <Col xs={12} sm={4}>
              <InstructionStep>
                <Typography variant="paragraph" component="span">
                  3. When your sample list is valid and QC is complete, submit your registration.
                </Typography>
                <Button
                  css={buttonStyle}
                  variant={BUTTON_VARIANTS.PRIMARY}
                  size={BUTTON_SIZES.SM}
                  disabled={!props.registrationEnabled}
                >
                  Register Samples
                </Button>
              </InstructionStep>
            </Col>
          </Row>
          <Row nogutter>
            <div
              css={css`
                text-align: center;
                width: 100%;
              `}
            >
              <Typography variant={'paragraph'}>
                If you have any changes to previously registered data, please {` `}
                <Link href={CONTACT_PAGE_PATH}>
                  <a>
                    <HyperLink>contact DCC.</HyperLink>
                  </a>
                </Link>
              </Typography>
            </div>
          </Row>
        </Col>
      )}
    />
  );
};

export default Instructions;
