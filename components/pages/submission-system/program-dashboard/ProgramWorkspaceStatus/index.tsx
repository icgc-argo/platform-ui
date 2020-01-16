import Container from 'uikit/Container';
import { css } from '@emotion/core';
import Typography from 'uikit/Typography';
import { Row, Col } from 'react-grid-system';
import ClinicalSubmissionProgressBar from '../../ClinicalSubmissionProgressBar';
import { usePageQuery } from 'global/hooks/usePageContext';
import SampleRegistrationProgressBar from '../../SampleRegistrationProgressBar';
import Hyperlink from 'uikit/Link';
import Link from 'next/link';
import {
  PROGRAM_SAMPLE_REGISTRATION_PATH,
  PROGRAM_SHORT_NAME_PATH,
  PROGRAM_CLINICAL_SUBMISSION_PATH,
} from 'global/constants/pages';

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
            <Link
              href={PROGRAM_SAMPLE_REGISTRATION_PATH}
              as={PROGRAM_SAMPLE_REGISTRATION_PATH.replace(
                PROGRAM_SHORT_NAME_PATH,
                programShortName as string,
              )}
            >
              <Hyperlink
                css={css`
                  margin-top: 0;
                `}
              >
                <Typography variant="label">Sample Registration</Typography>
              </Hyperlink>
            </Link>
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
            <Link
              href={PROGRAM_CLINICAL_SUBMISSION_PATH}
              as={PROGRAM_CLINICAL_SUBMISSION_PATH.replace(
                PROGRAM_SHORT_NAME_PATH,
                programShortName as string,
              )}
            >
              <Hyperlink
                css={css`
                  margin-top: 0;
                `}
              >
                <Typography variant="label">Clinical Submission</Typography>
              </Hyperlink>
            </Link>
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
