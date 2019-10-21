import * as React from 'react';
import Typography from 'uikit/Typography';
import Button, { BUTTON_SIZES } from 'uikit/Button';
import InstructionBox from 'uikit/InstructionBox';
import Icon from 'uikit/Icon';
import {
  instructionBoxButtonIconStyle,
  instructionBoxButtonContentStyle,
  instructionBoxButtonStyle,
} from '../../common';
import FileSelectButton from 'uikit/FileSelectButton';
import FileTemplatesDownloadButton from './FileTemplatesDownloadButton';

export default ({
  validationEnabled,
  signOffEnabled,
  onUploadFileSelect,
  onValidateClick,
  uploadEnabled,
  onSignOffClick,
  clinicalTypes,
}: {
  onUploadFileSelect: (files: FileList) => Promise<any>;
  onValidateClick: () => Promise<any>;
  onSignOffClick: () => Promise<any>;
  validationEnabled: boolean;
  signOffEnabled: boolean;
  uploadEnabled: boolean;
  clinicalTypes: string[];
}) => {
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [isValidating, setIsValidating] = React.useState<boolean>(false);
  const [isSigningOff, setIsSigningOff] = React.useState<boolean>(false);

  const handleFileUploadClick = async (files: FileList) => {
    setIsUploading(true);
    await onUploadFileSelect(files);
    setIsUploading(false);
  };

  const handleValidationClick = async () => {
    setIsValidating(true);
    await onValidateClick();
    setIsValidating(false);
  };

  const handleSignOffClick = async () => {
    setIsSigningOff(true);
    await onSignOffClick();
    setIsSigningOff(false);
  };

  return (
    <InstructionBox
      steps={[
        <>
          <Typography variant="paragraph" component="span">
            1. Download the clinical file templates and format them using the latest Data
            Dictionary.
          </Typography>
          <FileTemplatesDownloadButton clinicalTypes={clinicalTypes} />
        </>,
        <>
          <Typography variant="paragraph" component="span">
            2. Upload your formatted clinical TSV files.
          </Typography>
          <FileSelectButton
            isAsync
            css={instructionBoxButtonStyle}
            variant="secondary"
            size={BUTTON_SIZES.SM}
            inputProps={{
              accept: '.tsv',
              multiple: true,
            }}
            onFilesSelect={handleFileUploadClick}
            isLoading={isUploading}
            disabled={!uploadEnabled}
          >
            <span css={instructionBoxButtonContentStyle}>
              <Icon
                name="upload"
                fill="accent2_dark"
                height="12px"
                css={instructionBoxButtonIconStyle}
              />
              Upload Files
            </span>
          </FileSelectButton>
        </>,
        <>
          <Typography variant="paragraph" component="span">
            3. Validate your entire submission workspace.
          </Typography>
          <Button
            css={instructionBoxButtonStyle}
            variant="primary"
            size={BUTTON_SIZES.SM}
            disabled={!validationEnabled}
            onClick={handleValidationClick}
            isLoading={isValidating}
            isAsync
          >
            <span css={instructionBoxButtonContentStyle}>Validate Submission</span>
          </Button>
        </>,
        <>
          <Typography variant="paragraph" component="span">
            4. When your clinical data is valid and QC is complete, sign off your submission:
          </Typography>
          <Button
            css={instructionBoxButtonStyle}
            variant="primary"
            size={BUTTON_SIZES.SM}
            disabled={!signOffEnabled}
            onClick={handleSignOffClick}
            isLoading={isSigningOff}
            isAsync
          >
            <span css={instructionBoxButtonContentStyle}>Sign Off submission</span>
          </Button>
        </>,
      ]}
    />
  );
};
