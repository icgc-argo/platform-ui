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
import { DashboardCard } from '../common';

export default function ProgramWorkplaceStatus() {
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  return (
    <DashboardCard cardHeight="170px">
     <Typography variant="default" component="span">
          Program Workplace Status
        </Typography>

        <div
          css={css`
            height: 50px;
            display: flex;
            flex-direction: row;
            padding-top: 10px;
          `}
        >
          <div
            css={css`
              margin-top: 7px;
              width: 175px;
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
              <Hyperlink>
                <Typography variant="label">Sample Registration</Typography>
              </Hyperlink>
            </Link>
          </div>
          <div
            css={css`
              height: 50px;
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
              margin-top: 7px;
              width: 175px;
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
              <Hyperlink>
                <Typography variant="label">Clinical Submission</Typography>
              </Hyperlink>
            </Link>
          </div>
          <div
            css={css`
              height: 50px;
            `}
          >
            <ClinicalSubmissionProgressBar programShortName={programShortName} />
          </div>
        </div>
    </DashboardCard>
  );
}
