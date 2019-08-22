// @flow
import * as React from 'react';
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
import InstructionBox from 'uikit/InstructionBox';

const Instructions = (props: { registrationEnabled: boolean }) => {
  const buttonStyle = css`
    margin-top: 10px;
    width: 150px;
  `;
  const buttonContentStyle = css`
    display: flex;
    align-items: center;
  `;
  const buttonIconStyle = css`
    margin-right: 5px;
  `;
  const footerContentStyle = css`
    text-align: center;
    width: 100%;
  `;
  return (
    <InstructionBox
      steps={[
        <>
          <Typography variant="paragraph" component="span">
            1. Download the registration template and format it using the latest{` `}
            <Link href={CONTACT_PAGE_PATH}>
              <a>
                <HyperLink>Data Dictionary.</HyperLink>
              </a>
            </Link>
          </Typography>
          <Button css={buttonStyle} variant={BUTTON_VARIANTS.SECONDARY} size={BUTTON_SIZES.SM}>
            <span css={buttonContentStyle}>
              <Icon name="download" fill="accent2_dark" height="12px" css={buttonIconStyle} /> File
              Template
            </span>
          </Button>
        </>,
        <>
          <Typography variant="paragraph" component="span">
            2. Upload your formatted registration TSV file.
          </Typography>
          <Button css={buttonStyle} variant={BUTTON_VARIANTS.SECONDARY} size={BUTTON_SIZES.SM}>
            <span css={buttonContentStyle}>
              <Icon name="upload" fill="accent2_dark" height="12px" css={buttonIconStyle} /> Upload
              File
            </span>
          </Button>
        </>,
        <>
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
        </>,
      ]}
      footer={
        <div css={footerContentStyle}>
          <Typography variant={'paragraph'}>
            If you have any changes to previously registered data, please {` `}
            <Link href={CONTACT_PAGE_PATH}>
              <a>
                <HyperLink>contact DCC.</HyperLink>
              </a>
            </Link>
          </Typography>
        </div>
      }
    />
  );
};

export default Instructions;
