import { createPage } from 'global/utils/pages';
import CreateProgram from 'components/pages/submissionSystem/create-program';

export default createPage({
  isPublic: true,
  isAccessible: async ({ egoJwt, ctx }) => {
    return true;
    const {
      query: { id },
    } = ctx;
    if (id) {
      return !isRdpcMember(egoJwt) && hasAccessToProgram({ egoJwt, programId: id });
    } else {
      return true;
    }
  },
  getInitialProps: async ({ egoJwt, asPath, query }) => {
    return {};
  },
})(CreateProgram);
