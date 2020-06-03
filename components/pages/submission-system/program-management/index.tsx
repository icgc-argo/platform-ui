import React from 'react';
import { useRouter } from 'next/router';
import { css } from 'uikit';
import TitleBar from 'uikit/TitleBar';
import SubmissionLayout from '../layout';
import ManageProgramTabs from './ManageProgramTabs';
import Link from 'uikit/Link';
import { Row } from 'react-grid-system';
import { DOCS_MANAGING_PROGRAM_ACCESS_PAGE } from 'global/constants/docSitePaths';

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
            align-items: center;
            width: 100%;
          `}
        >
          <TitleBar>
            <>{programShortName}</>
            <Row nogutter align="center">
              <div
                css={css`
                  margin-right: 20px;
                `}
              >
                Manage Program
              </div>
            </Row>
          </TitleBar>
          <Link
            target="_blank"
            href={DOCS_MANAGING_PROGRAM_ACCESS_PAGE}
            bold
            withChevron
            uppercase
            underline={false}
            css={css`
              font-size: 14px;
            `}
          >
            HELP
          </Link>
        </div>
      }
    >
      <ManageProgramTabs />
    </SubmissionLayout>
  );
};
