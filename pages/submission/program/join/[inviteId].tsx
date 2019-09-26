import { createPage } from 'global/utils/pages';
import JoinProgramPage from 'components/pages/submission-system/join';

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx }) => {
    return true;
  },
  getInitialProps: async ({ egoJwt, asPath, query }) => {
    return {};
  },
})(JoinProgramPage);
