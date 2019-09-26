import { createPage } from 'global/utils/pages';
import CreateProgramPage from 'components/pages/submission-system/create-program';
import { isDccMember } from 'global/utils/egoJwt';

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx }) => {
    return isDccMember(egoJwt);
  },
  getInitialProps: async ({ egoJwt, asPath, query }) => {
    return {};
  },
})(CreateProgramPage);
