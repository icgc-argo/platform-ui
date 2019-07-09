// @flow
import React from 'react';
import { get } from 'lodash';

import { decodeToken } from 'global/utils/egoJwt';
import { isRdpcMember, isProgramAdmin } from 'global/utils/egoJwt';
import { createPage } from 'global/utils/pages';
import ProgramManagement from 'components/pages/submissionSystem/program-management';

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx }) => {
    const {
      query: { id },
    } = ctx;
    if (id) {
      return !isRdpcMember(egoJwt) && isProgramAdmin({ egoJwt, programId: id });
    } else {
      return true;
    }
  },
  getInitialProps: async ({ query }) => ({
    programId: query.id,
  }),
})(ProgramManagement);
