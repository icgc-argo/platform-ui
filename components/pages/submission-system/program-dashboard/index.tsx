import * as React from 'react';
import SubmissionLayout from '../layout';
import { css } from 'uikit';
import TitleBar from 'uikit/TitleBar';
import { ContentBox } from 'uikit/PageLayout';
import usePageContext from 'global/hooks/usePageContext';
import Banner, { BANNER_VARIANTS } from 'uikit/notifications/Banner';
import { JUST_JOINED_PROGRAM_STORAGE_KEY } from '../join/details';
import { useQuery } from '@apollo/react-hooks';
import { GqlClinicalSubmissionData } from '../program-clinical-submission/types';
import SIDE_MENU_CLINICAL_SUBMISSION_STATE from '../SIDE_MENU_CLINICAL_SUBMISSION_STATE.gql';
import Notification from 'uikit/notifications/Notification';

export default function ProgramDashboard() {
  const {
    query: { shortName: programShortName },
  } = usePageContext();

  const [justJoined, setJustJoined] = React.useState(null);

  const { data: { clinicalSubmissions = undefined } = {} } = useQuery<{
    clinicalSubmissions: GqlClinicalSubmissionData;
  }>(SIDE_MENU_CLINICAL_SUBMISSION_STATE, {
    variables: {
      programShortName: programShortName,
    },
  });

  const hasSchemaErrorsAfterMigration =
    clinicalSubmissions && clinicalSubmissions.state === 'INVALID_BY_MIGRATION';

  React.useEffect(() => {
    // to prevent server side rendering mismatch
    if (typeof window !== 'undefined') {
      const justJoinedProgram = window.localStorage.getItem(JUST_JOINED_PROGRAM_STORAGE_KEY);
      if (justJoinedProgram === programShortName) {
        setJustJoined(true);
        window.localStorage.removeItem(JUST_JOINED_PROGRAM_STORAGE_KEY);
      }
    }
  });

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
            <>Dashboard</>
          </TitleBar>
        </div>
      }
    >
      {justJoined && (
        <Banner
          title={`Welcome to ${programShortName}!`}
          interactionType="CLOSE"
          onInteraction={() => setJustJoined(false)}
          variant={BANNER_VARIANTS.SUCCESS}
          content="If you have trouble getting started, please check out our documentation for program management, data access and data submission."
          css={css`
            margin-bottom: 30px;
          `}
        />
      )}
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
      <ContentBox
        css={css`
          padding-top: 0px;
          min-height: calc(100vh - 240px);
        `}
      >
        Dashboard
      </ContentBox>
    </SubmissionLayout>
  );
}
