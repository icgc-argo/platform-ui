import * as React from 'react';
import SubmissionLayout from '../layout';
import { css } from 'uikit';
import TitleBar from 'uikit/TitleBar';
import { ContentBox } from 'uikit/PageLayout';
import usePageContext from 'global/hooks/usePageContext';
import Progress from 'uikit/Progress';
import { Row } from 'react-grid-system';
import Link from 'uikit/Link';
import VerticalTabs from 'uikit/VerticalTabs';
import Button from 'uikit/Button';
import Instruction from './Instruction';
import Container from 'uikit/Container';
import { containerStyle } from '../common';
import FilesNavigator from './FilesNavigator';
import { ClinicalSubmissionEntityFile } from './types';

const MOCK_FILE_STATE: Array<ClinicalSubmissionEntityFile> = [
  {
    id: 'donors',
    displayName: 'Donors',
    recordsCount: 2,
    status: 'ERROR',
    records: [
      {
        row: 0,
        fields: [
          {
            name: 'field_1',
            value: 'sdf',
          },
          {
            name: 'field_2',
            value: 'sdf',
          },
          {
            name: 'field_3',
            value: 'sdf',
          },
          {
            name: 'field_4',
            value: 'sdf',
          },
        ],
      },
      {
        row: 0,
        fields: [
          {
            name: 'field_1',
            value: 'sdf',
          },
          {
            name: 'field_2',
            value: 'sdf',
          },
          {
            name: 'field_3',
            value: 'sdf',
          },
          {
            name: 'field_4',
            value: 'sdf',
          },
        ],
      },
    ],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'specimen',
    displayName: 'Specimen',
    recordsCount: 24,
    status: 'SUCCESS',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'sample',
    displayName: 'Sample',
    recordsCount: 43,
    status: 'WARNING',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis',
    displayName: 'Primary Diagnosis',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis_1',
    displayName: 'Primary Diagnosis',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis_2',
    displayName: 'Primary Diagnosis',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis_3',
    displayName: 'Primary Diagnosis',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis_4',
    displayName: 'Primary Diagnosis',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis_5',
    displayName: 'Primary Diagnosis',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis_6',
    displayName: 'Primary Diagnosis',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis_7',
    displayName: 'Primary Diagnosis',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis_8',
    displayName: 'Primary Diagnosis',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis_9',
    displayName: 'Some very long text that will for sure overflow to multiple lines',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
];

export default function ProgramClinicalSubmission() {
  const {
    query: { shortName: programShortName },
  } = usePageContext();

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
