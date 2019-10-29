import * as React from 'react';
import SubmissionLayout from '../layout';
import { styled } from 'uikit';
import { usePageQuery } from 'global/hooks/usePageContext';
import { ClinicalSubmissionQueryData } from './types';
import Progress from 'uikit/Progress';
import { Row } from 'react-grid-system';
import Link from 'uikit/Link';
import Button from 'uikit/Button';
import Instruction from './Instruction';
import Container from 'uikit/Container';
import { containerStyle } from '../common';
import FilesNavigator from './FilesNavigator';
import {
  ClinicalSubmissionEntityFile,
  GqlClinicalEntity,
  ClinicalSubmissionQueryData,
  ValidateSubmissionMutationVariables,
  UploadFilesMutationVariables,
  SignOffSubmissionMutationVariables,
  ClinicalSubmissionError,
} from './types';
import Notification from 'uikit/notifications/Notification';
import CLINICAL_SUBMISSION_QUERY from './gql/CLINICAL_SUBMISSION_QUERY.gql';
import { useQuery } from '@apollo/react-hooks';
import UPLOAD_CLINICAL_SUBMISSION from './gql/UPLOAD_CLINICAL_SUBMISSION.gql';
import VALIDATE_SUBMISSION_MUTATION from './gql/VALIDATE_SUBMISSION_MUTATION.gql';
import SIGN_OFF_SUBMISSION_MUTATION from './gql/SIGN_OFF_SUBMISSION_MUTATION.gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import DnaLoader from 'uikit/DnaLoader';
import { capitalize } from 'global/utils/stringUtils';
import { useToaster } from 'global/hooks/toaster';
import ErrorNotification, { defaultColumns } from '../ErrorNotification';
import { ModalPortal } from 'components/ApplicationRoot';
import SignOffValidationModal, { useSignOffValidationModalState } from './SignOffValidationModal';
import SubmissionSummaryTable from './SubmissionSummaryTable';
import Typography from 'uikit/Typography';
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
