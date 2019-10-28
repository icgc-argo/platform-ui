import * as React from 'react';
import SubmissionLayout from '../layout';
import { css } from 'uikit';
import TitleBar from 'uikit/TitleBar';
import { ContentBox } from 'uikit/PageLayout';
import usePageContext from 'global/hooks/usePageContext';
import Banner, { BANNER_VARIANTS } from 'uikit/notifications/Banner';
import { JUST_JOINED_PROGRAM_STORAGE_KEY } from '../join/details';

export default function ProgramDashboard() {
  const {
    query: { shortName: programShortName },
  } = usePageContext();

  const [justJoined, setJustJoined] = React.useState(null);

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
          title={`Welcome to ${programShortName}`}
          variant={BANNER_VARIANTS.SUCCESS}
          content="If you have trouble getting started, please check out our documentation for program management, data access and data submission."
          css={css`
            margin-bottom: 30px;
          `}
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
