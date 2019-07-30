import * as React from 'react';
import SubmissionLayout from '../layout';
import { css } from 'uikit';
import TitleBar from 'uikit/TitleBar';
import { ContentBox } from 'uikit/PageLayout';
import { useRouter } from 'next/router';
import usePageContext from 'global/hooks/usePageContext';

export default function ProgramIDRegistration({ logOut, pathname }) {
  const {
    query: { shortName: programShortName },
  } = usePageContext();

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
            <>ID Registration</>
          </TitleBar>
        </div>
      }
    >
      <ContentBox
        css={css`
          padding-top: 0px;
        `}
      >
        ID Registration
      </ContentBox>
    </SubmissionLayout>
  );
}
