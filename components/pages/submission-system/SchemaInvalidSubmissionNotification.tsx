import { useQuery } from '@apollo/react-hooks';
import { GqlClinicalSubmissionData } from './program-clinical-submission/types';
import { useRouter } from 'next/router';
import React from 'react';
import { css } from '@emotion/core';
import Link from 'uikit/Link';
import Notification, { NOTIFICATION_INTERACTION_EVENTS } from 'uikit/notifications/Notification';
import { PROGRAM_CLINICAL_SUBMISSION_PATH, PROGRAM_SHORT_NAME_PATH } from 'global/constants/pages';
import SIDE_MENU_CLINICAL_SUBMISSION_STATE from './SIDE_MENU_CLINICAL_SUBMISSION_STATE.gql';

export const SchemaInvalidSubmisisonNotification = ({
  marginTop,
  marginBottom,
  programShortName,
}: {
  marginTop?: number;
  marginBottom?: number;
  programShortName: string;
}) => {
  const router = useRouter();

  const { data: { clinicalSubmissions = undefined } = {} } = useQuery<{
    clinicalSubmissions: GqlClinicalSubmissionData;
  }>(SIDE_MENU_CLINICAL_SUBMISSION_STATE, {
    variables: {
      programShortName: programShortName,
    },
  });

  const hasSchemaErrorsAfterMigration =
    clinicalSubmissions && clinicalSubmissions.state === 'INVALID_BY_MIGRATION';
  const [closedMigrationMsg, setclosedMigrationMsg] = React.useState(false);

  return (
    (hasSchemaErrorsAfterMigration && !closedMigrationMsg && (
      <Notification
        css={css`
          margin-top: ${marginTop}px;
          margin-bottom: ${marginBottom}px;
        `}
        size="SM"
        variant="ERROR"
        title={`Your clinical submission is invalid`}
        content={[
          <Link href="/">Version Y.Z of the data dictionary</Link>,
          ` was released and has made your clinical submission invalid. See the details in your clinical workspace.`,
        ]}
        interactionType="ACTION_DISMISS"
        onInteraction={({ type }) => {
          if (type === NOTIFICATION_INTERACTION_EVENTS.ACTION) {
            router.push(
              PROGRAM_CLINICAL_SUBMISSION_PATH.replace(
                PROGRAM_SHORT_NAME_PATH,
                programShortName as string,
              ),
            );
          } else {
            setclosedMigrationMsg(true);
          }
        }}
      />
    )) ||
    null
  );
};
