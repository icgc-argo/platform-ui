import { useMutation, useQuery } from '@apollo/react-hooks';
import usePageContext from 'global/hooks/usePageContext';
import get from 'lodash/get';
import union from 'lodash/union';
import * as React from 'react';
import { Row } from 'react-grid-system';
import { css } from 'uikit';
import Button, { BUTTON_SIZES, BUTTON_VARIANTS } from 'uikit/Button';
import Container from 'uikit/Container';
import Link from 'uikit/Link';
import Progress, { PROGRESS_STATUS } from 'uikit/Progress';
import TitleBar from 'uikit/TitleBar';
import Typography from 'uikit/Typography';
import SubmissionLayout from '../layout';
import CLEAR_CLINICAL_REGISTRATION_MUTATION from './gql/CLEAR_CLINICAL_REGISTRATION_MUTATION.gql';
import FileTable from './FileTable';
import NoDataMessage from './FileTable/NoDataMessage';
import GET_REGISTRATION from './gql/GET_REGISTRATION.gql';
import Instructions from './Instructions';
import { FileEntry } from './FileTable';
import { containerStyle } from '../common';
import { useToaster } from 'global/hooks/toaster';
import ErrorNotification, { defaultColumns } from '../ErrorNotification';
import { ClinicalRegistrationData, ClinicalRegistration } from './types';
import Notification from 'uikit/notifications/Notification';
import { toDisplayError } from 'global/utils/clinicalUtils';
import { SchemaInvalidSubmisisonNotification } from '../SchemaInvalidSubmissionNotification';
import SampleRegistrationProgressBar from '../SampleRegistrationProgressBar';

const recordsToFileTable = (
  records: ClinicalRegistrationData[],
  newRows: Array<number>,
): Array<FileEntry> =>
  records.map(record => {
    const fields = get(record, 'fields', []);
    const data = fields.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {} as any);
    return { ...data, row: record.row, isNew: newRows.includes(record.row) };
  });

export default function ProgramIDRegistration() {
  const {
    query: { shortName: programShortName },
  } = usePageContext();

  const {
    data: { clinicalRegistration = undefined } = {},
    loading,
    refetch,
    updateQuery: updateClinicalRegistrationQuery,
  } = useQuery<{
    clinicalRegistration: ClinicalRegistration;
  }>(GET_REGISTRATION, {
    variables: { shortName: programShortName },
  });

  const schemaOrValidationErrors = get(
    clinicalRegistration,
    'errors',
    [] as typeof clinicalRegistration.errors,
  );
  const fileErrors = get(
    clinicalRegistration,
    'fileErrors',
    [] as typeof clinicalRegistration.fileErrors,
  );
  const fileRecords = get(
    clinicalRegistration,
    'records',
    [] as typeof clinicalRegistration.records,
  );

  const [clearRegistration] = useMutation(CLEAR_CLINICAL_REGISTRATION_MUTATION);

  const toaster = useToaster();

  const handleClearClick = async () => {
    if (clinicalRegistration.id == null) {
      refetch();
      return;
    }

    try {
      await clearRegistration({
        variables: {
          shortName: programShortName,
          registrationId: get(clinicalRegistration, 'id'),
        },
      });
      await refetch();
    } catch (err) {
      await refetch();
      toaster.addToast({
        variant: 'ERROR',
        title: 'Something went wrong',
        content: 'Uh oh! It looks like something went wrong. This page has been reloaded.',
      });
    }
  };

  // Data formatting
  let submissionInfo = null;
  let stats = null;
  let newRows = [];

  if (clinicalRegistration) {
    const {
      createdAt = '',
      creator = '',
      fileName = '',
      alreadyRegistered,
      newDonors,
      newSamples,
      newSpecimens,
    } = clinicalRegistration;
    submissionInfo = { createdAt, creator, fileName };

    newRows = union(newDonors.rows, newSamples.rows, newSpecimens.rows);

    stats = {
      newCount: newRows.length,
      existingCount: alreadyRegistered.count,
    };
  }

  const onErrorClose: (
    index: number,
  ) => React.ComponentProps<typeof Notification>['onInteraction'] = index => ({ type }) => {
    if (type === 'CLOSE') {
      updateClinicalRegistrationQuery(previous => ({
        ...previous,
        clinicalRegistration: {
          ...previous.clinicalRegistration,
          fileErrors: previous.clinicalRegistration.fileErrors.filter((_, i) => i !== index),
        },
      }));
    }
  };

  const pageHeaderStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `;

  const cardHeaderContainerStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  `;

  return (
    <SubmissionLayout
      contentHeader={
        <div css={pageHeaderStyle}>
          <TitleBar>
            <>{programShortName}</>
            <Row nogutter align="center">
              <div
                css={css`
                  margin-right: 20px;
                `}
              >
                Register Samples
              </div>
              <SampleRegistrationProgressBar />
            </Row>
          </TitleBar>
          <Link
            css={css`
              font-size: 12px;
            `}
            withChevron
            underline={false}
            bold
          >
            HELP
          </Link>
        </div>
      }
    >
      {<SchemaInvalidSubmisisonNotification programShortName={programShortName as string} />}
      <Container
        css={css`
          ${containerStyle}
          padding-bottom: 0px;
        `}
      >
        <Instructions
          registrationEnabled={!!get(clinicalRegistration, 'id')}
          shortName={programShortName as string}
          registrationId={get(clinicalRegistration, 'id')}
        />
      </Container>

      {fileErrors.map(({ fileNames, message }, i) => (
        <Notification
          key={i}
          css={css`
            margin-top: 20px;
          `}
          size="SM"
          variant="ERROR"
          interactionType="CLOSE"
          title={`File failed to upload: ${fileNames.join(', ')}`}
          content={message}
          onInteraction={onErrorClose(i)}
        />
      ))}

      <Container
        css={css`
          ${containerStyle}
          min-height: calc(100vh - 390px);
        `}
      >
        {fileRecords.length > 0 ? (
          <>
            <div css={cardHeaderContainerStyle}>
              <Typography
                css={css`
                  margin: 0;
                `}
                color="primary"
                variant="subtitle2"
                component="h2"
              >
                File Preview
              </Typography>
              <Button
                id="button-register-clear-file"
                variant={BUTTON_VARIANTS.TEXT}
                size={BUTTON_SIZES.SM}
                onClick={handleClearClick}
              >
                <Typography variant="data">Clear</Typography>
              </Button>
            </div>
            <FileTable
              records={recordsToFileTable(fileRecords, newRows)}
              stats={stats}
              submissionInfo={submissionInfo}
            />
          </>
        ) : schemaOrValidationErrors.length > 0 ? (
          <ErrorNotification
            onClearClick={handleClearClick}
            title={`${schemaOrValidationErrors.length} errors found in uploaded file`}
            errors={schemaOrValidationErrors.map(toDisplayError)}
            subtitle={
              'Your file cannot be processed. Please correct the following errors and reupload your file.'
            }
            columnConfig={defaultColumns}
            tsvExcludeCols={['type', 'specimenId', 'sampleId']}
          />
        ) : (
          <NoDataMessage loading={loading} />
        )}
      </Container>
    </SubmissionLayout>
  );
}
