import { useQuery } from '@apollo/react-hooks';
import { PROGRAM_JOIN_DETAILS_PATH, INVITE_ID } from 'global/constants/pages';
import { useRouter } from 'next/router';
import React from 'react';
import { css } from 'uikit';
import GoogleLogin from 'uikit/Button/GoogleLogin';
import Typography from 'uikit/Typography';
import SubmissionLayout from '../layout';
import GET_JOIN_PROGRAM_INFO from './GET_JOIN_PROGRAM_INFO.gql';
import JoinProgramLayout from './JoinProgramLayout';
import { getConfig } from 'global/config';

export default () => {
  const { EGO_URL } = getConfig();

  const router = useRouter();
  const { inviteId } = router.query;

  const [notFound, setNotFound] = React.useState(false);
  const {
    data: { joinProgramInvite = {} as any, programOptions: { institutions = [] } = {} } = {},
    loading,
  } = useQuery(GET_JOIN_PROGRAM_INFO, {
    variables: { inviteId },
    onError: error => {
      if (error.message.includes('NOT_FOUND')) {
        setNotFound(true);
      }
    },
  });

  return (
    <SubmissionLayout noSidebar>
      <JoinProgramLayout
        tabValue="step1"
        joinProgramInvite={joinProgramInvite}
        notFound={notFound}
        loading={loading}
      >
        <Typography>
          Please log in to the ARGO Data Platform using the{' '}
          <b>same email address to which your program invitation was sent.</b>{' '}
        </Typography>
        <div
          css={css`
            display: flex;
            justify-content: center;
            padding-top: 82px;
            padding-bottom: 25px;
          `}
        >
          <GoogleLogin
            id="google-login"
            link={EGO_URL}
            redirectPath={PROGRAM_JOIN_DETAILS_PATH.replace(INVITE_ID, inviteId)}
          />
        </div>
      </JoinProgramLayout>
    </SubmissionLayout>
  );
};
