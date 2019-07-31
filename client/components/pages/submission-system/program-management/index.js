// @flow
import React from 'react';
import useAuthContext from 'global/hooks/useAuthContext';
import { useRouter } from 'next/router';
import { useMutation } from 'react-apollo-hooks';
import { css } from 'uikit';
import { ContentBox } from 'uikit/PageLayout';
import TitleBar from 'uikit/TitleBar';
import SubmissionLayout from '../layout';
import ManageProgramTabs from './ManageProgramTabs';

export default ({ logOut, pathname }: { logOut: any => any, pathname: string }) => {
  const router = useRouter();
  const { shortName: programShortName } = router.query;

  return (
    <SubmissionLayout
      pathname={pathname}
      logOut={logOut}
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
