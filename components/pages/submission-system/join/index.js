//@flow
import { PROGRAM_DASHBOARD_PATH, PROGRAM_SHORT_NAME_PATH } from 'global/constants/pages';
import { useToaster } from 'global/hooks/toaster';
import useAuthContext from 'global/hooks/useAuthContext';
import { get } from 'lodash';
import omit from 'lodash/omit';
import { useRouter } from 'next/router';
// $FlowFixMe
import { ERROR_STATUS_KEY } from 'pages/_error';
import React from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { css } from 'uikit';
import DnaLoader from 'uikit/DnaLoader';
import { TOAST_VARIANTS } from 'uikit/notifications/Toast';
import SubmissionLayout from '../layout';
import GET_JOIN_PROGRAM_INFO from './GET_JOIN_PROGRAM_INFO.gql';
import JoinProgramForm from './joinProgramForm';
import JOIN_PROGRAM_MUTATION from './JOIN_PROGRAM_MUTATION.gql';

export default ({ firstName, lastName, authorizedPrograms = [] }: any) => {
  const router = useRouter();
  const { inviteId } = router.query;

  const {
    data: { joinProgramInvite, programOptions: { institutions } = {} } = {},
    loading,
    error,
  } = useQuery(GET_JOIN_PROGRAM_INFO, {
    variables: { inviteId },
  });

  const [joinProgram] = useMutation(JOIN_PROGRAM_MUTATION);

  if (!!error) {
    error[ERROR_STATUS_KEY] = 500;
    throw new Error(error);
  }

  const toaster = useToaster();

  const { updateToken } = useAuthContext();

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

      updateToken().then(egoToken => {
        router.push(
          PROGRAM_DASHBOARD_PATH.replace(
            PROGRAM_SHORT_NAME_PATH,
            joinProgramInvite.program.shortName,
          ),
        );
      });
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
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          left: 0px;
          top: 0px;
          position: absolute;
        `}
      >
        {loading ? (
          <DnaLoader />
        ) : (
          <JoinProgramForm
            onSubmit={handleSubmit}
            programName={get(joinProgramInvite, 'program.name')}
            userRole={get(joinProgramInvite, 'user.role')}
            institutions={institutions}
          />
        )}
      </div>
    </SubmissionLayout>
  );
};
