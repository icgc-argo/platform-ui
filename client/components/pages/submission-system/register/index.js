//@flow
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { css } from 'uikit';
import SubmissionLayout from '../layout';
import JoinProgramForm from './joinProgramForm';
import GET_INVITE from './GET_INVITE.gql';
import { get } from 'lodash';
// $FlowFixMe
import { ERROR_STATUS_KEY } from 'pages/_error';

export default ({ firstName, lastName, authorizedPrograms = [] }: any) => {
  const { inviteId } = useRouter().query;

  const { data: { joinProgramInvite } = {}, loading, error } = useQuery(GET_INVITE, {
    variables: { inviteId },
  });

  if (!!error) {
    error[ERROR_STATUS_KEY] = 500;
    throw new Error(error);
  }

  return (
    <SubmissionLayout pathname={pathname} logOut={logOut} noSidebar>
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
        <JoinProgramForm
          inviteId={inviteId}
          programName={get(
            joinProgramInvite,
            'program.name',
            loading ? '[loading...]' : '[error to fetch data]',
          )}
          userRole={get(
            joinProgramInvite,
            'user.role',
            loading ? '[loading...]' : '[error to fetch data]',
          )}
        />
      </div>
    </SubmissionLayout>
  );
};
