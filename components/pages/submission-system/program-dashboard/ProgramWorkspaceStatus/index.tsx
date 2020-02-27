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
import { isCollaborator } from 'global/utils/egoJwt';
import { ReactNode } from 'react';
import useAuthContext from 'global/hooks/useAuthContext';

type accessStatus = {
  jwt: string;
  programId: string;
};
const LinkWrapper: React.ComponentType<{
  access: accessStatus;
  wrapper: Function;
  children: ReactNode;
}> = ({ wrapper, access, children }) => {
  const canViewLinks = !isCollaborator({ egoJwt: access.jwt, programId: access.programId });
  return canViewLinks ? wrapper(children) : children;
};

export default function ProgramWorkplaceStatus() {
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const { token } = useAuthContext();
  const currentUserStatus: accessStatus = {
    jwt: token,
    programId: programShortName,
  };
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
          <LinkWrapper
            access={currentUserStatus}
            wrapper={(children: ReactNode) => (
              <Link
                href={PROGRAM_SAMPLE_REGISTRATION_PATH}
                as={PROGRAM_SAMPLE_REGISTRATION_PATH.replace(
                  PROGRAM_SHORT_NAME_PATH,
                  programShortName as string,
                )}
              >
                <Hyperlink>{children}</Hyperlink>
              </Link>
            )}
          >
            <Typography variant="label">Sample Registration</Typography>
          </LinkWrapper>
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
          <LinkWrapper
            access={currentUserStatus}
            wrapper={(children: ReactNode) => (
              <Link
                href={PROGRAM_CLINICAL_SUBMISSION_PATH}
                as={PROGRAM_CLINICAL_SUBMISSION_PATH.replace(
                  PROGRAM_SHORT_NAME_PATH,
                  programShortName as string,
                )}
              >
                <Hyperlink>{children}</Hyperlink>
              </Link>
            )}
          >
            <Typography variant="label">Clinical Submission</Typography>
          </LinkWrapper>
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
