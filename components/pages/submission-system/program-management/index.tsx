import React from 'react';
import useAuthContext from 'global/hooks/useAuthContext';
import { useRouter } from 'next/router';
import { css } from 'uikit';
import { ContentBox } from 'uikit/PageLayout';
import TitleBar from 'uikit/TitleBar';
import SubmissionLayout from '../layout';
import ManageProgramTabs from './ManageProgramTabs';
import { useQuery } from '@apollo/react-hooks';
import { GqlClinicalSubmissionData } from '../program-clinical-submission/types';
import SIDE_MENU_CLINICAL_SUBMISSION_STATE from '../SIDE_MENU_CLINICAL_SUBMISSION_STATE.gql';
import Notification from 'uikit/notifications/Notification';

export default () => {
  const router = useRouter();
  const { shortName: programShortName } = router.query;

  const { data: { clinicalSubmissions = undefined } = {} } = useQuery<{
    clinicalSubmissions: GqlClinicalSubmissionData;
  }>(SIDE_MENU_CLINICAL_SUBMISSION_STATE, {
    variables: {
      programShortName: programShortName,
    },
  });

  const hasSchemaErrorsAfterMigration =
    clinicalSubmissions && clinicalSubmissions.state === 'INVALID_BY_MIGRATION';

  return (
    <SubmissionLayout
      contentHeader={
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            width: 100%;
          `}
        >
          <TitleBar>
            <>{programShortName}</>
            <>Manage Program</>
          </TitleBar>
        </div>
      }
    >
      {hasSchemaErrorsAfterMigration && (
        <Notification
          css={css`
            margin-bottom: 20px;
          `}
          size="SM"
          variant="ERROR"
          title={`Your clinical submission is invalid`}
          content={`Version _link here_ was released and has made your clinical submission invalid. See the details in your clinical workspace.`}
          interactionType="ACTION_DISMISS"
        />
      )}
      <ManageProgramTabs />
    </SubmissionLayout>
  );
};
