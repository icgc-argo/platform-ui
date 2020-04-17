import { createPage } from 'global/utils/pages';
import { isDccMember, getPermissionsFromToken } from 'global/utils/egoJwt';
import DccDashboard from 'components/pages/submission-system/dcc';

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx, initialPermissions }) => isDccMember(initialPermissions),
})(DccDashboard);
