import { createPage } from 'global/utils/pages';
import JoinProgramDetailsPage from 'components/pages/submission-system/join/details';

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx }) => {
    return true;
  },
})(JoinProgramDetailsPage);
