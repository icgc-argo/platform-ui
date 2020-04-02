import { useQuery } from '@apollo/react-hooks';
import { GqlClinicalSubmissionData } from './program-clinical-submission/types';
import { useRouter } from 'next/router';
import React from 'react';
import { css } from '@emotion/core';
import Link from 'uikit/Link';
import Notification, { NOTIFICATION_INTERACTION_EVENTS } from 'uikit/notifications/Notification';
import {
  PROGRAM_CLINICAL_SUBMISSION_PATH,
  PROGRAM_SHORT_NAME_PATH,
  DOCS_DICTIONARY_PATH,
} from 'global/constants/pages';
import SIDE_MENU_CLINICAL_SUBMISSION_STATE from './SIDE_MENU_CLINICAL_SUBMISSION_STATE.gql';
import CLINICAL_SCHEMA_VERSION from './CLINICAL_SCHEMA_VERSION.gql';
import { getConfig } from 'global/config';
import urljoin from 'url-join';

export const SchemaInvalidSubmissionNotification = ({
  marginTop,
  marginBottom,
  programShortName,
  isClinicalSubmissionPage = false,
}: {
  marginTop?: number;
  marginBottom?: number;
  programShortName: string;
  isClinicalSubmissionPage?: boolean;
}) => {
  const router = useRouter();

  const { data: { clinicalSubmissions = undefined } = {} } = useQuery<{
    clinicalSubmissions: GqlClinicalSubmissionData;
  }>(SIDE_MENU_CLINICAL_SUBMISSION_STATE, {
    variables: {
      programShortName: programShortName,
    },
  });

  const { DOCS_URL_ROOT } = getConfig();
  const { data: { clinicalSubmissionSchemaVersion = undefined } = {} } = useQuery<{
    clinicalSubmissionSchemaVersion: string;
  }>(CLINICAL_SCHEMA_VERSION);

  const hasSchemaErrorsAfterMigration =
    clinicalSubmissions && clinicalSubmissions.state === 'INVALID_BY_MIGRATION';
  const [closedMigrationMsg, setclosedMigrationMsg] = React.useState(false);

  const getContentWithLink = (submissionPage: boolean) => (
    <div
      css={css`
        padding: 8px 8px 8px 0px;
      `}
    >
      <Link href={urljoin(DOCS_URL_ROOT, DOCS_DICTIONARY_PATH)} target="_blank">
        Version {clinicalSubmissionSchemaVersion} of the data dictionary
      </Link>
      {` was released and has made your clinical submission invalid. `}
      {submissionPage ? `See the details below.` : `See the details in your clinical workspace.`}
    </div>
  );

  const handleOnInteraction: React.ComponentProps<typeof Notification>['onInteraction'] = ({
    type,
  }) => {
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
  };

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
        content={getContentWithLink(isClinicalSubmissionPage)}
        interactionType={isClinicalSubmissionPage ? 'NONE' : 'ACTION_DISMISS'}
        onInteraction={isClinicalSubmissionPage ? undefined : handleOnInteraction}
      />
    )) ||
    null
  );
};
