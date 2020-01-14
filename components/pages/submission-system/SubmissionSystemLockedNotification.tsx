import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { css } from '@emotion/core';
import Notification from 'uikit/notifications/Notification';
import GLOBAL_SUBMISSION_SYSTEM_STATE from './GLOBAL_SUBMISSION_SYSTEM_STATE.gql';

export const useSubmissionSystemState = () => {
  const { data: { clinicalSubmissionSystemState = undefined } = {} } = useQuery(
    GLOBAL_SUBMISSION_SYSTEM_STATE,
  );

  return clinicalSubmissionSystemState;
};

export const SubmissionSystemLockedNotification = ({
  marginTop,
  marginBottom,
}: {
  marginTop?: number;
  marginBottom?: number;
}) => {
  const [showNotification, setshowNotification] = React.useState(true);
  const isWorksapceDisabled = useSubmissionSystemState();

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
    (isWorksapceDisabled && showNotification && (
      <Notification
        css={css`
          margin-top: ${marginTop}px;
          margin-bottom: ${marginBottom}px;
        `}
        size="SM"
        variant="WARNING"
        title={`Your program workspace is locked`}
        content={getContentWithLink()}
        interactionType="CLOSE"
        onInteraction={handleOnInteraction}
      />
    )) ||
    null
  );
};
