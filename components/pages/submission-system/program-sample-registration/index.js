import * as React from 'react';
import SubmissionLayout from '../layout';
import { css } from 'uikit';
import TitleBar from 'uikit/TitleBar';
import { ContentBox } from 'uikit/PageLayout';
import { useRouter } from 'next/router';
import usePageContext from 'global/hooks/usePageContext';
import Progress from 'uikit/Progress';
import { Row, Col } from 'react-grid-system';

export default function ProgramIDRegistration() {
  const {
    query: { shortName: programShortName },
  } = usePageContext();

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
            <Row nogutter align="center">
              <div
                css={css`
                  margin-right: 20px;
                `}
              >
                Register Samples
              </div>
              <Progress>
                <Progress.Item state="success" text="Updated" />
                <Progress.Item state="pending" text="Register" />
              </Progress>
            </Row>
          </TitleBar>
        </div>
      }
    >
      <ContentBox
        css={css`
          padding-top: 0px;
        `}
      >
        Sample Registration
      </ContentBox>
    </SubmissionLayout>
  );
}
