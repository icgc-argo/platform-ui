import * as React from 'react';
import Progress from 'uikit/Progress';
import { usePageQuery } from 'global/hooks/usePageContext';
import { ClinicalSubmissionError } from './program-clinical-submission/types';
import { useClinicalSubmissionQuery } from './program-clinical-submission';
import { css } from '@emotion/core';
import { useSubmissionSystemDisabled } from './SubmissionSystemLockedNotification';

const ClinicalSubmissionProgressBar: React.ComponentType<{
  programShortName: string;
  approvalBarWidth?: number;
}> = ({ programShortName, approvalBarWidth }) => {
  const [] = React.useState<FileList | null>(null);

  const { data } = useClinicalSubmissionQuery(programShortName);

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
  const isSubmissionSystemDisabled = useSubmissionSystemDisabled();

  const progressStates: {
    upload: React.ComponentProps<typeof Progress.Item>['state'];
    validate: React.ComponentProps<typeof Progress.Item>['state'];
    signOff: React.ComponentProps<typeof Progress.Item>['state'];
  } = {
    upload: isSubmissionSystemDisabled
      ? 'locked'
      : isReadyForValidation
      ? 'success'
      : hasSchemaError || hasSchemaErrorsAfterMigration
      ? 'error'
      : 'disabled',
    validate: isSubmissionSystemDisabled
      ? 'locked'
      : isReadyForSignoff || isPendingApproval
      ? 'success'
      : isReadyForValidation
      ? hasDataError
        ? 'error'
        : 'pending'
      : 'disabled',
    signOff: isSubmissionSystemDisabled
      ? 'locked'
      : isReadyForSignoff
      ? 'pending'
      : isPendingApproval
      ? 'success'
      : 'disabled',
  };

  const pendingApprovalWidth = `${approvalBarWidth || 100}px`;
  return (
    <Progress>
      <Progress.Item text="Upload" state={progressStates.upload} />
      <Progress.Item text="Validate" state={progressStates.validate} />
      <Progress.Item text="Sign Off" state={progressStates.signOff} />
      {isPendingApproval && (
        <Progress.Item
          css={css`
            width: ${pendingApprovalWidth};
          `}
          text="Pending Approval"
          state="locked"
        />
      )}
    </Progress>
  );
};

export default ClinicalSubmissionProgressBar;
