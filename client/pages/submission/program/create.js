import { createPage } from 'global/utils/pages';
import CreateProgramPage from 'components/pages/submission-system/create-program';

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx }) => {
    return true;
  },
  getInitialProps: async ({ egoJwt, asPath, query }) => {
    return {};
  },
})(CreateProgramPage);
