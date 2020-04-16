import React from 'react';

import { createPage } from 'global/utils/pages';
import ProgramDashboard from 'components/pages/submission-system/program-dashboard';
import { isRdpcMember, canReadProgram, getPermissionsFromToken } from 'global/utils/egoJwt';
import { useProgramCheckEffect } from 'global/hooks/useProgramCheckEffect';

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx }) => {
    const {
      query: { shortName },
    } = ctx;
    const permissions = getPermissionsFromToken(egoJwt);
    return (
      !isRdpcMember(permissions) && canReadProgram({ permissions, programId: String(shortName) })
    );
  },
  startWithGlobalLoader: true,
})(props => {
  useProgramCheckEffect();
  return <ProgramDashboard {...props} />;
});
