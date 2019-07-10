import { createPage } from 'global/utils/pages';
import RegisterProgramPage from 'components/pages/submissionSystem/register';

export default createPage({
  isPublic: true,
  isAccessible: async ({ egoJwt, ctx }) => {
    return true;
  },
  getInitialProps: async ({ egoJwt, asPath, query }) => {
    return {};
  },
})(RegisterProgramPage);
