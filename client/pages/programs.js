//@flow
import React from 'react';
import { get } from 'lodash';

import { isRdpcMember, getAuthorizedProgramPolicies, decodeToken } from 'global/utils/egoJwt';
import { createPage } from 'global/utils/pages';
import ProgramsPage from 'components/pages/programs';

export default createPage({
  isPublic: true,
  isAccessible: async ({ egoJwt, ctx }) => {
    return !isRdpcMember(egoJwt);
  },
  getInitialProps: async ({ egoJwt, asPath, query }) => {
    return {};
    // const data = decodeToken(egoJwt);
    // const firstName = get(data, 'context.user.firstName', '');
    // const lastName = get(data, 'context.user.lastName', '');
    // const authorizedPrograms = getAuthorizedProgramPolicies(egoJwt);
    // return { firstName, lastName, authorizedPrograms };
  },
})(ProgramsPage);
