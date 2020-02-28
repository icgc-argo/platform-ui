import React from 'react';
import { useRouter } from 'next/router';
import { css } from 'uikit';
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
