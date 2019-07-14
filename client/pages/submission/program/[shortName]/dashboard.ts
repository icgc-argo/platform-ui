import { createPage } from 'global/utils/pages';
import ProgramDashboard from 'components/pages/submission-system/program-dashboard';
import { isRdpcMember, canReadProgram } from 'global/utils/egoJwt';

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx }) => {
    const {
      query: { shortName },
    } = ctx;
    return !isRdpcMember(egoJwt) && canReadProgram({ egoJwt, programId: shortName });
  },
})(ProgramDashboard);
