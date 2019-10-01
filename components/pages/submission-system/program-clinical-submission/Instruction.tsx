import * as React from 'react';
import Typography from 'uikit/Typography';
import Button from 'uikit/Button';
import InstructionBox from 'uikit/InstructionBox';

export default () => (
  <InstructionBox
    steps={[
      <>
        <Typography variant="paragraph" component="span">
          1. Download the clinical file templates and format them using the latest Data Dictionary.
        </Typography>
        <Button variant="secondary">Templates</Button>
      </>,
      <>
        <Typography variant="paragraph" component="span">
          2. Upload your formatted clinical TSV files.
        </Typography>
        <Button variant="secondary">Upload Files</Button>
      </>,
      <>
        <Typography variant="paragraph" component="span">
          3. Validate your entire submission workspace.
        </Typography>
        <Button variant="secondary" disabled>
          Validate Submission
        </Button>
      </>,
      <>
        <Typography variant="paragraph" component="span">
          4. When your clinical data is valid and QC is complete, sign off your submission:
        </Typography>
        <Button variant="secondary" disabled>
          Sign Off submission
        </Button>
      </>,
    ]}
  />
);
