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
import RegisterSamplesModal from './RegisterSamplesModal';
import { RegisterState } from '../index';
import { useMutation } from '@apollo/react-hooks';
import UPLOAD_REGISTRATION from '../UPLOAD_REGISTRATION.gql';
import {
  instructionBoxButtonIconStyle,
  instructionBoxButtonContentStyle,
  instructionBoxButtonStyle,
  downloadTsvFileTemplate,
} from '../../common';
import FileSelectButton from 'uikit/FileSelectButton';
import { GATEWAY_API_ROOT } from 'global/config';

function Instructions({
  registrationEnabled,
  shortName,
  registrationId,
  setRegisterState,
  onUpload,
}: {
  registrationEnabled: boolean;
  shortName: string;
  registrationId: string;
  setRegisterState: (state: RegisterState) => void;
  onUpload: (x: any) => any;
}) {
  const footerContentStyle = css`
    text-align: center;
    width: 100%;
    padding-bottom: 10px;
    padding-top: 8px;
  `;

  const downloadTemplate = () => {
    downloadTsvFileTemplate('registration.tsv');
  };

  const [showRegisterSamplesModal, setShowRegisterSamplesModal] = React.useState(false);
  const handleRegisterClick = () => {
    setShowRegisterSamplesModal(true);
  };

  const handleRegisterCancelClick = () => {
    setShowRegisterSamplesModal(false);
  };

  const [uploadFile, { loading }] = useMutation(UPLOAD_REGISTRATION);

  const handleUpload = async file => {
    const {
      data: { uploadClinicalRegistration },
    } = await uploadFile({
      variables: { shortName, registrationFile: file },
    });
    onUpload({ response: uploadClinicalRegistration, fileName: file.name });
  };

  return (
    <>
      <InstructionBox
        steps={[
          <>
            <Typography variant="data" component="span">
              1. Download the registration template and format it using the latest{` `}
              <Link href={CONTACT_PAGE_PATH}>
                <HyperLink>Data Dictionary</HyperLink>
              </Link>
              .
            </Typography>
            <Button
              css={instructionBoxButtonStyle}
              variant={BUTTON_VARIANTS.SECONDARY}
              size={BUTTON_SIZES.SM}
              onClick={downloadTemplate}
            >
              <span css={instructionBoxButtonContentStyle}>
                <Icon
                  name="download"
                  fill="accent2_dark"
                  height="12px"
                  css={instructionBoxButtonIconStyle}
                />{' '}
                File Template
              </span>
            </Button>
          </>,
          <>
            <Typography variant="data" component="span">
              2. Upload your formatted registration TSV file.
            </Typography>
            <FileSelectButton
              css={instructionBoxButtonStyle}
              variant={BUTTON_VARIANTS.SECONDARY}
              size={BUTTON_SIZES.SM}
              onFilesSelect={files => {
                if (files[0]) handleUpload(files[0]);
              }}
            >
              <span css={instructionBoxButtonContentStyle}>
                <Icon
                  name="upload"
                  fill="accent2_dark"
                  height="12px"
                  css={instructionBoxButtonIconStyle}
                />{' '}
                Upload File
              </span>
            </FileSelectButton>
          </>,
          <>
            <Typography variant="data" component="span">
              3. When your sample list is valid and QC is complete, submit your registration.
            </Typography>
            <Button
              css={instructionBoxButtonStyle}
              variant={BUTTON_VARIANTS.PRIMARY}
              size={BUTTON_SIZES.SM}
              disabled={!registrationEnabled}
              onClick={handleRegisterClick}
            >
              Register Samples
            </Button>
          </>,
        ]}
        footer={
          <div css={footerContentStyle}>
            <Typography variant="data">
              If you have any changes to previously registered data, please {` `}
              <Link href={CONTACT_PAGE_PATH}>
                <HyperLink>contact the DCC</HyperLink>
              </Link>
              .
            </Typography>
          </div>
        }
      />
      {showRegisterSamplesModal && (
        <RegisterSamplesModal
          onCancelClick={handleRegisterCancelClick}
          shortName={shortName}
          registrationId={registrationId}
          setRegisterState={setRegisterState}
        />
      )}
    </>
  );
}

export default Instructions;
