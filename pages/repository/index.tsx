import { createPage } from 'global/utils/pages';
import FileRepositoryPage from 'components/pages/file-repository';
import { getConfig } from 'global/config';
import { ERROR_STATUS_KEY } from 'pages/_error';

export default createPage<{ egoJwt: string }>({
  isPublic: true,
  getInitialProps: async () => {
    const { FEATURE_REPOSITORY_ENABLED } = getConfig();
    if (!FEATURE_REPOSITORY_ENABLED) {
      const err = new Error('Page Not Found') as Error & { statusCode?: number };
      err[ERROR_STATUS_KEY] = 404;
      throw err;
    }
  },
})(() => {
  return <FileRepositoryPage />;
});
