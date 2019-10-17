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

  const getUserApproval = () =>
    new Promise((resolve, reject) => {
      setSignOffModalShown(true);
      setSignOffFlow({
        onApprove: () => {
          setSignOffModalShown(false);
          resolve();
        },
        onCancel: () => {
          setSignOffModalShown(false);
          reject();
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
}: {
  clinicalSubmissions: GqlClinicalSubmissionData;
  onCloseClick: React.ComponentProps<typeof Modal>['onCloseClick'];
  onActionClick: React.ComponentProps<typeof Modal>['onActionClick'];
  onCancelClick: React.ComponentProps<typeof Modal>['onCancelClick'];
}) => {
  return (
    <Modal
      actionButtonText="yes, sign off"
      title="Are you sure you want to sign-off your clinical submission?"
      onCloseClick={onCloseClick}
      onActionClick={onActionClick}
      onCancelClick={onCancelClick}
    >
      <div>
        The DCC will be notified of the following updates to previously released data and your
        submission will be locked. Once your submission is approved by the DCC, your clinical data
        will be placed in a queue for the next release.
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
