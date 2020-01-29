import * as React from 'react';
import { css } from 'uikit';
import { GqlClinicalSubmissionData } from './types';
import Modal, { ModalContainer } from 'uikit/Modal';
import Typography from 'uikit/Typography';
import SubmissionSummaryTable from './SubmissionSummaryTable';
import styled from '@emotion/styled';

const SignOffModalCont = styled(ModalContainer)`
  max-width: 1120px;
`;

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
      ContainerEl={SignOffModalCont}
    >
      <div>
        {hasUpdate
          ? 'The DCC will be notified of the following updates to previously released data and your submission will be locked until approval.'
          : 'The following clinical data will be submitted.'}
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
