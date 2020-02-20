import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { css } from '@emotion/core';
import Notification from 'uikit/notifications/Notification';
import CLINICAL_SUBMISSION_SYSTEM_DISABLED from './CLINICAL_SUBMISSION_SYSTEM_DISABLED.gql';

// Note: submission system disabled means disabled for both sample_registraiton and clinical_submission in clinical
export const useSubmissionSystemDisabled = (): boolean => {
  const { data: { clinicalSubmissionSystemDisabled = undefined } = {} } = useQuery(
    CLINICAL_SUBMISSION_SYSTEM_DISABLED,
  );

  return clinicalSubmissionSystemDisabled as boolean;
};

export const SubmissionSystemLockedNotification = ({
  marginTop,
  marginBottom,
  canClose = false,
}: {
  marginTop?: number;
  marginBottom?: number;
  canClose?: boolean;
}) => {
  const [showNotification, setshowNotification] = React.useState(true);
  const isWorkspaceDisabled = useSubmissionSystemDisabled();

  // the link is to the home page currently because data dictionary link is not avaialable yet
  const getContentWithLink = () => (
    <div
      css={css`
        padding: 8px 8px 8px 0px;
      `}
    >
      {`The ARGO DCC is currently releasing a new version of the `}
      <a href="/">data dictionary</a> {`. Your workspace will be unlocked shortly.`}
    </div>
  );

  const handleOnInteraction: React.ComponentProps<typeof Notification>['onInteraction'] = () => {
    setshowNotification(false);
  };

  return (
    (isWorkspaceDisabled && showNotification && (
      <Notification
        css={css`
          margin-top: ${marginTop}px;
          margin-bottom: ${marginBottom}px;
        `}
        size="SM"
        variant="WARNING"
        title={`Your program workspace is locked`}
        content={getContentWithLink()}
        interactionType={canClose ? 'CLOSE' : 'NONE'}
        onInteraction={handleOnInteraction}
      />
    )) ||
    null
  );
};
