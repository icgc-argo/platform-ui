import React from 'react';

import { createPage } from 'global/utils/pages';
import ProgramSampleRegistration from 'components/pages/submission-system/program-sample-registration';
import { isRdpcMember, canReadProgram, canWriteProgramData } from 'global/utils/egoJwt';
import { useProgramCheckEffect } from 'global/hooks/useProgramCheckEffect';

export default createPage({
  isPublic: false,
  isAccessible: async ({ ctx, initialPermissions: permissions }) => {
    const {
      query: { shortName },
    } = ctx;
    return (
      !isRdpcMember(permissions) &&
      canReadProgram({ permissions, programId: String(shortName) }) &&
      canWriteProgramData({ permissions, programId: String(shortName) })
    );
  },
  startWithGlobalLoader: true,
})(props => {
  useProgramCheckEffect();
  return <ProgramSampleRegistration {...props} />;
});
