import * as React from 'react';
import SubmissionLayout from '../layout';
import { styled } from 'uikit';
import { usePageQuery } from 'global/hooks/usePageContext';
import { ClinicalSubmissionQueryData, ClinicalSubmissionError } from './types';
import CLINICAL_SUBMISSION_QUERY from './gql/CLINICAL_SUBMISSION_QUERY.gql';
import { useQuery } from '@apollo/react-hooks';
import { ContentHeader } from 'uikit/PageLayout';
import { useTheme } from 'uikit/ThemeProvider';
import Header from './Header';
import PageContent from './PageContent';

export default function ProgramClinicalSubmission() {
  const theme = useTheme();
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const [] = React.useState<FileList | null>(null);

  const placeHolderResponse: ClinicalSubmissionQueryData = {
    clinicalSubmissions: {
      version: '',
      clinicalEntities: [],
      fileErrors: [],
      id: '',
      state: 'OPEN',
      updatedAt: '',
      updatedBy: '',
      __typename: 'ClinicalSubmissionData',
    },
  };

  const { data = placeHolderResponse, loading: loadingClinicalSubmission } = useQuery<
    ClinicalSubmissionQueryData
  >(CLINICAL_SUBMISSION_QUERY, {
    variables: {
      programShortName,
    },
  });

  const allDataErrors = React.useMemo(
    () =>
      data.clinicalSubmissions.clinicalEntities.reduce<
        Array<
          ClinicalSubmissionError & {
            fileName: string;
          }
        >
      >(
        (acc, entity) => [
          ...acc,
          ...entity.dataErrors.map(err => ({
            ...err,
            fileName: entity.batchName,
          })),
        ],
        [],
      ),
    [data],
  );

  const hasDataError = !!allDataErrors.length;
  const hasSchemaError =
    !!data.clinicalSubmissions.clinicalEntities.length &&
    data.clinicalSubmissions.clinicalEntities.some(({ schemaErrors }) => !!schemaErrors.length);
  const hasSomeEntity = data.clinicalSubmissions.clinicalEntities.some(
    ({ records }) => !!records.length,
  );
  const isReadyForValidation = hasSomeEntity && !hasSchemaError;
  const isReadyForSignoff = isReadyForValidation && data.clinicalSubmissions.state === 'VALID';
  const isPendingApproval = data.clinicalSubmissions.state === 'PENDING_APPROVAL';
  const hasUpdate = data.clinicalSubmissions.clinicalEntities.some(
    clinicalEntity => !!clinicalEntity.dataUpdates.length,
  );
  const isValidated = data.clinicalSubmissions.state !== 'OPEN';

  return (
    <>
      <SubmissionLayout
        ContentHeaderComponent={styled(ContentHeader)`
          background: ${isPendingApproval ? theme.colors.accent3_4 : theme.colors.white};
        `}
        contentHeader={
          <Header
            programShortName={programShortName}
            showProgress={!loadingClinicalSubmission}
            isPendingApproval={isPendingApproval}
            progressStates={{
              upload: isReadyForValidation ? 'success' : hasSchemaError ? 'error' : 'disabled',
              validate:
                isReadyForSignoff || isPendingApproval
                  ? 'success'
                  : isReadyForValidation
                  ? hasDataError
                    ? 'error'
                    : 'pending'
                  : 'disabled',
              signOff: isReadyForSignoff ? 'pending' : isPendingApproval ? 'success' : 'disabled',
            }}
          />
        }
      >
        <PageContent />
      </SubmissionLayout>
    </>
  );
}
