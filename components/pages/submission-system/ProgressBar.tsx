import * as React from 'react';
import SubmissionLayout from './layout';
import { styled } from 'uikit';
import Progress from 'uikit/Progress';
import { usePageQuery } from 'global/hooks/usePageContext';
import {
  ClinicalSubmissionQueryData,
  ClinicalSubmissionError,
} from './program-clinical-submission/types';
import CLINICAL_SUBMISSION_QUERY from './gql/CLINICAL_SUBMISSION_QUERY.gql';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { ContentHeader } from 'uikit/PageLayout';
import { useTheme } from 'uikit/ThemeProvider';

export const placeholderClinicalSubmissionQueryData = (
  shortName: string,
): ClinicalSubmissionQueryData => ({
  clinicalSubmissions: {
    version: '',
    programShortName: shortName,
    clinicalEntities: [],
    fileErrors: [],
    id: '',
    state: null,
    updatedAt: '',
    updatedBy: '',
    __typename: 'ClinicalSubmissionData',
  },
});

type ClinicalSubmissionQueryVariables = {
  programShortName: string;
};

export const useClinicalSubmissionQuery = (
  programShortName: string,
  options: Omit<
    QueryHookOptions<ClinicalSubmissionQueryData, ClinicalSubmissionQueryVariables>,
    'variables'
  > = {},
) => {
  const hook = useQuery<ClinicalSubmissionQueryData, ClinicalSubmissionQueryVariables>(
    CLINICAL_SUBMISSION_QUERY,
    {
      ...options,
      variables: {
        programShortName,
      },
    },
  );

  return {
    ...hook,
    data: hook.data || placeholderClinicalSubmissionQueryData(programShortName),
  };
};

export default function ProgramClinicalSubmissionProgressBar() {
  const theme = useTheme();
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const [] = React.useState<FileList | null>(null);

  const { data, loading: loadingClinicalSubmission } = useClinicalSubmissionQuery(programShortName);

  var progressStates: {
    upload: React.ComponentProps<typeof Progress.Item>['state'];
    validate: React.ComponentProps<typeof Progress.Item>['state'];
    signOff: React.ComponentProps<typeof Progress.Item>['state'];
  };

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
  const hasSchemaErrorsAfterMigration = data.clinicalSubmissions.state === 'INVALID_BY_MIGRATION';
  const isReadyForValidation = hasSomeEntity && !hasSchemaError && !hasSchemaErrorsAfterMigration;
  const isReadyForSignoff = isReadyForValidation && data.clinicalSubmissions.state === 'VALID';
  const isPendingApproval = data.clinicalSubmissions.state === 'PENDING_APPROVAL';
  const hasUpdate = data.clinicalSubmissions.clinicalEntities.some(
    clinicalEntity => !!clinicalEntity.dataUpdates.length,
  );
  const isValidated = data.clinicalSubmissions.state !== 'OPEN';

  progressStates = {
    upload: isReadyForValidation
      ? 'success'
      : hasSchemaError || hasSchemaErrorsAfterMigration
      ? 'error'
      : 'disabled',
    validate:
      isReadyForSignoff || isPendingApproval
        ? 'success'
        : isReadyForValidation
        ? hasDataError
          ? 'error'
          : 'pending'
        : 'disabled',
    signOff: isReadyForSignoff ? 'pending' : isPendingApproval ? 'success' : 'disabled',
  };
}
