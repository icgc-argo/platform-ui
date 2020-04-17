import Container from 'uikit/Container';
import { css } from '@emotion/core';
import Typography from 'uikit/Typography';
import { Row, Col } from 'react-grid-system';
import ClinicalSubmissionProgressBar from '../../ClinicalSubmissionProgressBar';
import { usePageQuery } from 'global/hooks/usePageContext';
import SampleRegistrationProgressBar from '../../SampleRegistrationProgressBar';
import Hyperlink, { HyperLinkProps } from 'uikit/Link';
import Link, { LinkProps } from 'next/link';
import {
  PROGRAM_SAMPLE_REGISTRATION_PATH,
  PROGRAM_SHORT_NAME_PATH,
  PROGRAM_CLINICAL_SUBMISSION_PATH,
} from 'global/constants/pages';
import { DashboardCard } from '../common';
import { isCollaborator, getPermissionsFromToken } from 'global/utils/egoJwt';
import useAuthContext from 'global/hooks/useAuthContext';

const ConditionalLink: React.ComponentType<{
  showAsLink: boolean;
  link: LinkProps;
  hyperlink?: HyperLinkProps;
}> = ({ showAsLink, link, hyperlink, children }) => {
  return showAsLink ? (
    <Link {...link}>
      <Hyperlink {...hyperlink}>{children}</Hyperlink>
    </Link>
  ) : (
    <>{children}</>
  );
};

export default function ProgramWorkplaceStatus() {
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const { token, permissions } = useAuthContext();
  const canViewLinks = !isCollaborator({
    permissions,
    programId: programShortName,
  });
  return (
    <DashboardCard cardHeight="170px">
      <Typography variant="default" component="span">
        Program Workplace Status
      </Typography>

      <div
        css={css`
          height: 40px;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          padding-top: 10px;
        `}
      >
        <div
          css={css`
            width: 90px;
          `}
        >
          <ConditionalLink
            showAsLink={canViewLinks}
            link={{
              href: PROGRAM_SAMPLE_REGISTRATION_PATH,
              as: PROGRAM_SAMPLE_REGISTRATION_PATH.replace(
                PROGRAM_SHORT_NAME_PATH,
                programShortName as string,
              ),
            }}
          >
            <Typography variant="caption">
              Sample <br />
              Registration
            </Typography>
          </ConditionalLink>
        </div>
        <div
          css={css`
            margin-bottom: 2px;
          `}
        >
          <SampleRegistrationProgressBar programShortName={programShortName} />
        </div>
      </div>
      <div
        css={css`
          height: 40px;
          padding-top: 20px;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
        `}
      >
        <div
          css={css`
            width: 90px;
          `}
        >
          <ConditionalLink
            showAsLink={canViewLinks}
            link={{
              href: PROGRAM_CLINICAL_SUBMISSION_PATH,
              as: PROGRAM_CLINICAL_SUBMISSION_PATH.replace(
                PROGRAM_SHORT_NAME_PATH,
                programShortName as string,
              ),
            }}
          >
            <Typography variant="caption">
              Clinical <br />
              Submission
            </Typography>
          </ConditionalLink>
        </div>
        <div
          css={css`
            margin-bottom: 2px;
          `}
        >
          <ClinicalSubmissionProgressBar
            programShortName={programShortName}
            approvalBarWidth={75}
          />
        </div>
      </div>
    </DashboardCard>
  );
}
