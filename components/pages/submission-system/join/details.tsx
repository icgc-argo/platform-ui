import { useMutation, useQuery } from '@apollo/react-hooks';
import { PROGRAM_DASHBOARD_PATH, PROGRAM_SHORT_NAME_PATH } from 'global/constants/pages';
import { useToaster } from 'global/hooks/toaster';
import useAuthContext from 'global/hooks/useAuthContext';
import get from 'lodash/get';
import omit from 'lodash/omit';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { ERROR_STATUS_KEY } from 'pages/_error';
import React from 'react';
import { css } from 'uikit';
import Banner, { BANNER_VARIANTS } from 'uikit/notifications/Banner';
import { TOAST_VARIANTS } from 'uikit/notifications/Toast';
import Typography from 'uikit/Typography';
import SubmissionLayout from '../layout';
import GET_JOIN_PROGRAM_INFO from './GET_JOIN_PROGRAM_INFO.gql';
import JoinProgramForm from './joinProgramForm';
import JoinProgramLayout from './JoinProgramLayout';
import JOIN_PROGRAM_MUTATION from './JOIN_PROGRAM_MUTATION.gql';

export default ({ firstName, lastName, authorizedPrograms = [] }: any) => {
  const { EGO_URL } = getConfig().publicRuntimeConfig;

  const router = useRouter();
  const { inviteId } = router.query;

  const [joinProgram] = useMutation(JOIN_PROGRAM_MUTATION);

  const toaster = useToaster();

  const { updateToken, data: userModel } = useAuthContext();

  const [notFound, setNotFound] = React.useState(false);

  const {
    data: { joinProgramInvite = {} as any, programOptions: { institutions = [] } = {} } = {},
    loading,
  } = useQuery(GET_JOIN_PROGRAM_INFO, {
    variables: { inviteId },
    onCompleted: data => {
      if (!joinProgramInvite) {
        return;
      }
    },
    onError: error => {
      if (error.message.includes('NOT_FOUND')) {
        setNotFound(true);
      } else {
        error[ERROR_STATUS_KEY] = 500;
        throw new Error(error.message);
      }
    },
  });

  const incorrectEmail =
    !loading && get(userModel, 'context.user.email') !== get(joinProgramInvite, 'user.email');

  const handleSubmit = async validData => {
    try {
      await joinProgram({
        variables: {
          joinProgramInput: {
            ...omit(validData, 'institutions'),
            invitationId: inviteId,
            // TODO: fix the misalignment of ui and api
            institute: validData.institutions[0],
          },
        },
      });

      const egoToken = await updateToken(); // Side effect
      if (egoToken) {
        window.localStorage.setItem('justJoinedProgram', joinProgramInvite.program.shortName);
        router.push(
          PROGRAM_DASHBOARD_PATH.replace(
            PROGRAM_SHORT_NAME_PATH,
            joinProgramInvite.program.shortName,
          ),
        );
      } else {
        // Guard against bad impl
        throw new Error('Could not update authorization.');
      }
    } catch (err) {
      // handle error
      toaster.addToast({
        variant: TOAST_VARIANTS.ERROR,
        title: '',
        content: err.message,
      });
    }
  };

  return (
    <SubmissionLayout noSidebar>
      <JoinProgramLayout
        tabValue="step2"
        joinProgramInvite={joinProgramInvite}
        loading={loading}
        notFound={notFound}
      >
        {incorrectEmail ? (
          <>
            <Banner
              title={'Incorrect email address'}
              variant={BANNER_VARIANTS.ERROR}
              content="Please try again using the same email address to which your program invitation was sent."
              css={css`
                margin-bottom: 30px;
              `}
            />
          </>
        ) : (
          <>
            <Typography
              css={css`
                margin-bottom: 27px;
              `}
            >
              Please provide the following basic details
            </Typography>
            <JoinProgramForm
              onSubmit={handleSubmit}
              programName={get(joinProgramInvite, 'program.name')}
              userRole={get(joinProgramInvite, 'user.role')}
              institutions={institutions}
            />
          </>
        )}
      </JoinProgramLayout>
    </SubmissionLayout>
  );
};
