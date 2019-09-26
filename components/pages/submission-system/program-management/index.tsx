
import React from 'react';
import useAuthContext from 'global/hooks/useAuthContext';
import { useRouter } from 'next/router';
import { css } from 'uikit';
import { ContentBox } from 'uikit/PageLayout';
import TitleBar from 'uikit/TitleBar';
import SubmissionLayout from '../layout';
import ManageProgramTabs from './ManageProgramTabs';

export default () => {
  const router = useRouter();
  const { shortName: programShortName } = router.query;

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
      <ManageProgramTabs />
    </SubmissionLayout>
  );
};
