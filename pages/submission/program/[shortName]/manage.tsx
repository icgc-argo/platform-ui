import React from 'react';

import { createPage } from 'global/utils/pages';
import ProgramManagement from 'components/pages/submission-system/program-management';
import { isRdpcMember, isProgramAdmin } from 'global/utils/egoJwt';
import { useProgramCheckEffect } from 'global/hooks/useProgramCheckEffect';

export default createPage({
  isPublic: false,
  isAccessible: async ({ ctx, initialPermissions: permissions }) => {
    const {
      query: { shortName },
    } = ctx;
    return (
      !isRdpcMember(permissions) && isProgramAdmin({ permissions, programId: String(shortName) })
    );
  },
  startWithGlobalLoader: true,
})(props => {
  useProgramCheckEffect();
  return <ProgramManagement {...props} />;
});
