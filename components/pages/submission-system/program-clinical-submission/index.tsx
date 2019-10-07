import * as React from 'react';
import SubmissionLayout from '../layout';
import { css } from 'uikit';
import TitleBar from 'uikit/TitleBar';
import usePageContext from 'global/hooks/usePageContext';
import Progress from 'uikit/Progress';
import { Row } from 'react-grid-system';
import Link from 'uikit/Link';
import Button from 'uikit/Button';
import Instruction from './Instruction';
import Container from 'uikit/Container';
import { containerStyle } from '../common';
import FilesNavigator from './FilesNavigator';
import { ClinicalSubmissionEntityFile, ClinicalError } from './types';
import Banner from 'uikit/notifications/Banner';
import Notification from 'uikit/notifications/Notification';
import { MOCK_FILE_STATE } from './mock';

export default function ProgramClinicalSubmission() {
  const {
    query: { shortName: programShortName },
  } = usePageContext();

  const [clinicalErrors, setClinicalErrors] = React.useState<ClinicalError[]>([
    {
      code: 'SOME_CODE',
      fileNames: ['a.tsv', 'b.tsv'],
      msg:
        'Improperly named files cannot be uploaded or validated. Please retain the template file names and only append characters to the end. For example, donor<_optional_extension>.tsv. ',
    },
  ]);
  const onErrorClose: React.ComponentProps<typeof Notification>['onInteraction'] = ({ type }) => {
    if (type === 'CLOSE') {
      setClinicalErrors([]);
    }
  };

  return (
    <SubmissionLayout
      contentHeader={
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          `}
        >
          <TitleBar>
            <>{programShortName}</>
            <Row nogutter align="center">
              <div
                css={css`
                  margin-right: 20px;
                `}
              >
                Submit Clinical Data
              </div>
              <Progress>
                <Progress.Item text="Upload" state="disabled" />
                <Progress.Item text="Validate" state="disabled" />
                <Progress.Item text="Sign Off" state="disabled" />
              </Progress>
            </Row>
          </TitleBar>
          <Row nogutter align="center">
            <Button
              variant="text"
              disabled
              css={css`
                margin-right: 10px;
              `}
            >
              Clear submission
            </Button>
            <Link
              bold
              withChevron
              uppercase
              underline={false}
              css={css`
                font-size: 14px;
              `}
            >
              HELP
            </Link>
          </Row>
        </div>
      }
    >
      <Container css={containerStyle}>
        <Instruction />
      </Container>
      {clinicalErrors.map(({ code, fileNames, msg }) => (
        <Notification
          key={code}
          css={css`
            margin-top: 20px;
          `}
          variant="ERROR"
          interactionType="CLOSE"
          title={`${fileNames.length} of 5 files failed to upload: ${fileNames.join(', ')}`}
          content={msg}
          onInteraction={onErrorClose}
        />
      ))}
      <Container
        css={css`
          ${containerStyle}
          padding: 0px;
          min-height: calc(100vh - 240px);
        `}
      >
        <FilesNavigator fileStates={MOCK_FILE_STATE} loading={false} />
      </Container>
    </SubmissionLayout>
  );
}
