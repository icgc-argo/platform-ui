import { createPage } from 'global/utils/pages';
import programClinicalSubmission from 'components/pages/submission-system/program-clinical-submission';
import { isRdpcMember, canReadProgram } from 'global/utils/egoJwt';

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx }) => {
    const {
      query: { shortName },
    } = ctx;
    return !isRdpcMember(egoJwt) && canReadProgram({ egoJwt, programId: shortName });
  },
})(programClinicalSubmission);
