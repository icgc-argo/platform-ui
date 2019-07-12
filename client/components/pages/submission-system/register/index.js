//@flow
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { orderBy } from 'lodash';

import Typography from 'uikit/Typography';
import { Input } from 'uikit/form';
import { css } from 'uikit';
import { TableActionBar } from 'uikit/Table';
import { ContentBox } from 'uikit/PageLayout';
import SubmissionLayout from '../layout';

import JoinProgramForm from './joinProgramForm';

export default ({
  egoJwt,
  firstName,
  lastName,
  authorizedPrograms = [],
  logOut,
  pathname,
}: any) => (
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
        programName="Pancreatic Cancer - AU"
        userRole="Program Administrator"
        onJoinClick={console.log}
        availableInstitutions={[]}
      />
    </div>
  </SubmissionLayout>
);
