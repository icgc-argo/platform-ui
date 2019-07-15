import React from 'react';

import { createPage } from 'global/utils/pages';
import programIDRegistration from 'components/pages/submission-system/program-id-registration';
import { isRdpcMember, isProgramAdmin } from 'global/utils/egoJwt';

export default createPage({
  isPublic: false,
  isAccessible: ({ egoJwt, ctx }) => {
    const {
      query: { shortName },
    } = ctx;
    return !isRdpcMember(egoJwt);
  },
})(programIDRegistration);
