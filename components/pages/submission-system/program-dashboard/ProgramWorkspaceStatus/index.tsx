import Container from 'uikit/Container';
import { css } from '@emotion/core';
import Typography from 'uikit/Typography';
import { Row, Col } from 'react-grid-system';
import ClinicalSubmissionProgressBar from '../../ClinicalSubmissionProgressBar';
import { usePageQuery } from 'global/hooks/usePageContext';
import SampleRegistrationProgressBar from '../../SampleRegistrationProgressBar';
import Link from 'uikit/Link';

export default function ProgramWorkplaceStatus() {
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  return (
    <Container
      css={css`
        height: 134px;
      `}
    >
      <div
        css={css`
          padding: 12px;
        `}
      >
        <Typography variant="default" component="span">
          Program Workplace Status
        </Typography>

        <div
          css={css`
            height: 50px;
            display: flex;
            flex-direction: row;
          `}
        >
          <div
            css={css`
              width: 100px;
              height: 50px;
            `}
          >
            <Typography
              css={css`
                margin-top: 0;
              `}
            >
              Sample <br />
              Registration
            </Typography>
          </div>
          <div
            css={css`
              height: 50px;
              margin-top: 2px;
            `}
          >
            <SampleRegistrationProgressBar programShortName={programShortName} />
          </div>
        </div>
        <div
          css={css`
            height: 50px;
            display: flex;
            flex-direction: row;
          `}
        >
          <div
            css={css`
              width: 100px;
              height: 50px;
            `}
          >
            <Typography
              css={css`
                margin-top: 0;
              `}
            >
              Clinical <br />
              Submission
            </Typography>
          </div>
          <div
            css={css`
              height: 50px;
              margin-top: 2px;
            `}
          >
            <ClinicalSubmissionProgressBar programShortName={programShortName} />
          </div>
        </div>
      </div>
    </Container>
  );
}
