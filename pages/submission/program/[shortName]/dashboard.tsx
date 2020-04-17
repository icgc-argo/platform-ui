import React from 'react';

import { createPage } from 'global/utils/pages';
import ProgramDashboard from 'components/pages/submission-system/program-dashboard';
import { isRdpcMember, canReadProgram } from 'global/utils/egoJwt';
import { useProgramCheckEffect } from 'global/hooks/useProgramCheckEffect';

export default createPage({
  isPublic: false,
  isAccessible: async ({ ctx, initialPermissions: permissions }) => {
    const {
      query: { shortName },
    } = ctx;
    return (
      !isRdpcMember(permissions) && canReadProgram({ permissions, programId: String(shortName) })
    );
  },
  startWithGlobalLoader: true,
})(props => {
  useProgramCheckEffect();
  return <ProgramDashboard {...props} />;
});
