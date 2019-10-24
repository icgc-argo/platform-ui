import * as React from 'react';
import { css } from 'uikit';
import { GqlClinicalSubmissionData } from './types';
import Modal from 'uikit/Modal';
import Typography from 'uikit/Typography';
import SubmissionSummaryTable from './SubmissionSummaryTable';

export const useSignOffValidationModalState = () => {
  const [signOffModalShown, setSignOffModalShown] = React.useState(false);
  const [{ onApprove, onCancel }, setSignOffFlow] = React.useState({
    onApprove: () => setSignOffModalShown(false),
    onCancel: () => setSignOffModalShown(false),
  });

  const getUserApproval = (): Promise<boolean> =>
    new Promise(resolve => {
      setSignOffModalShown(true);
      setSignOffFlow({
        onApprove: () => {
          setSignOffModalShown(false);
          resolve(true);
        },
        onCancel: () => {
          setSignOffModalShown(false);
          resolve(false);
        },
      });
    });
  return {
    signOffModalShown,
    getUserApproval,
    onApprove,
    onCancel,
  };
};

export default ({
  clinicalSubmissions,
  onCloseClick,
  onActionClick,
  onCancelClick,
  hasUpdate,
}: {
  clinicalSubmissions: GqlClinicalSubmissionData;
  hasUpdate: boolean;
  onCloseClick: React.ComponentProps<typeof Modal>['onCloseClick'];
  onActionClick: React.ComponentProps<typeof Modal>['onActionClick'];
  onCancelClick: React.ComponentProps<typeof Modal>['onCancelClick'];
}) => {
  return (
    <Modal
      actionButtonText="yes, sign off"
      title={
        <span
          css={css`
            padding-right: 20px;
          `}
        >
          Are you sure you want to sign-off your clinical submission?
        </span>
      }
      onCloseClick={onCloseClick}
      onActionClick={onActionClick}
      onCancelClick={onCancelClick}
    >
      <div>
        {hasUpdate
          ? 'The DCC will be notified of the following updates to previously released data and your submission will be locked. Once your submission is approved by the DCC, your clinical data will be placed in a queue for the next release.'
          : 'The clinical data in your workspace will be placed in a queue for the next release.'}
      </div>
      <div
        css={css`
          margin: 10px 5px;
        `}
      >
        <Typography color="secondary" bold variant="sectionHeader">
          Clinical Submission Summary
        </Typography>
      </div>
      <SubmissionSummaryTable clinicalSubmissions={clinicalSubmissions} />
    </Modal>
  );
};
