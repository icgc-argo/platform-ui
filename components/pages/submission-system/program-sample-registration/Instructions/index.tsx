import { CONTACT_PAGE_PATH } from 'global/constants/pages';
import getConfig from 'next/config';
import Link from 'next/link';
import * as React from 'react';
import { css } from 'uikit';
import Button, { BUTTON_SIZES, BUTTON_VARIANTS } from 'uikit/Button';
import Icon from 'uikit/Icon';
import InstructionBox from 'uikit/InstructionBox';
import HyperLink from 'uikit/Link';
import Typography from 'uikit/Typography';
import urlJoin from 'url-join';

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

  const downloadTemplate = () => {
    const { GATEWAY_API_ROOT } = getConfig().publicRuntimeConfig;
    window.location.assign(urlJoin(GATEWAY_API_ROOT, 'clinical/template/registration.tsv'));
  };

  return (
    <InstructionBox
      steps={[
        <>
          <Typography variant="paragraph" component="span">
            1. Download the registration template and format it using the latest{` `}
            <Link href={CONTACT_PAGE_PATH}>
              <HyperLink>Data Dictionary</HyperLink>
            </Link>
            .
          </Typography>
          <Button
            css={buttonStyle}
            variant={BUTTON_VARIANTS.SECONDARY}
            size={BUTTON_SIZES.SM}
            onClick={downloadTemplate}
          >
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
              <HyperLink>contact DCC</HyperLink>
            </Link>
            .
          </Typography>
        </div>
      }
    />
  );
};

export default Instructions;
