import { createPage } from 'global/utils/pages';
import CreateProgramPage from 'components/pages/submission-system/create-program';
import { isDccMember, getPermissionsFromToken } from 'global/utils/egoJwt';

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx, initialPermissions }) => {
    return isDccMember(initialPermissions);
  },
  getInitialProps: async ({ egoJwt, asPath, query }) => {
    return {};
  },
})(CreateProgramPage);
