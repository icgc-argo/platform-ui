import * as React from 'react';
import Typography from 'uikit/Typography';
import Button, { BUTTON_SIZES } from 'uikit/Button';
import InstructionBox from 'uikit/InstructionBox';
import Icon from 'uikit/Icon';
import {
  instructionBoxButtonIconStyle,
  instructionBoxButtonContentStyle,
  instructionBoxButtonStyle,
} from '../common';

export default () => (
  <InstructionBox
    steps={[
      <>
        <Typography variant="paragraph" component="span">
          1. Download the clinical file templates and format them using the latest Data Dictionary.
        </Typography>
        <Button css={instructionBoxButtonStyle} variant="secondary" size={BUTTON_SIZES.SM}>
          <span css={instructionBoxButtonContentStyle}>
            <Icon
              name="upload"
              fill="accent2_dark"
              height="12px"
              css={instructionBoxButtonIconStyle}
            />
            File Templates
          </span>
        </Button>
      </>,
      <>
        <Typography variant="paragraph" component="span">
          2. Upload your formatted clinical TSV files.
        </Typography>
        <Button css={instructionBoxButtonStyle} variant="secondary" size={BUTTON_SIZES.SM}>
          <span css={instructionBoxButtonContentStyle}>
            <Icon
              name="upload"
              fill="accent2_dark"
              height="12px"
              css={instructionBoxButtonIconStyle}
            />
            Upload Files
          </span>
        </Button>
      </>,
      <>
        <Typography variant="paragraph" component="span">
          3. Validate your entire submission workspace.
        </Typography>
        <Button css={instructionBoxButtonStyle} variant="secondary" size={BUTTON_SIZES.SM} disabled>
          <span css={instructionBoxButtonContentStyle}>Validate Submission</span>
          Validate Submission
        </Button>
      </>,
      <>
        <Typography variant="paragraph" component="span">
          4. When your clinical data is valid and QC is complete, sign off your submission:
        </Typography>
        <Button css={instructionBoxButtonStyle} variant="secondary" size={BUTTON_SIZES.SM} disabled>
          <span css={instructionBoxButtonContentStyle}>Sign Off submission</span>
        </Button>
      </>,
    ]}
  />
);
