import { createPage } from 'global/utils/pages';
import { isDccMember } from 'global/utils/egoJwt';
import DccDashboard from 'components/pages/submission-system/dcc';

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx }) => isDccMember(egoJwt),
})(DccDashboard);
