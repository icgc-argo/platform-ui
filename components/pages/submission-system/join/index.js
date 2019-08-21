//@flow
import { get } from 'lodash';
import { useRouter } from 'next/router';
// $FlowFixMe
import { ERROR_STATUS_KEY } from 'pages/_error';
import React from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { css } from 'uikit';
import DnaLoader from 'uikit/DnaLoader';
import SubmissionLayout from '../layout';
import GET_INVITE from './GET_INVITE.gql';
import JOIN_PROGRAM from './JOIN_PROGRAM.gql';
import JoinProgramForm from './joinProgramForm';
import omit from 'lodash/omit';

export default ({ firstName, lastName, authorizedPrograms = [] }: any) => {
  const { inviteId } = useRouter().query;

  const { data: { joinProgramInvite } = {}, loading, error } = useQuery(GET_INVITE, {
    variables: { inviteId },
  });

  const [joinProgram] = useMutation(JOIN_PROGRAM);

  if (!!error) {
    error[ERROR_STATUS_KEY] = 500;
    throw new Error(error);
  }

  const handleSubmit = async validData => {
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
          />
        )}
      </div>
    </SubmissionLayout>
  );
};
