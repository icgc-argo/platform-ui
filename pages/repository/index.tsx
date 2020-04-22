import { createPage } from 'global/utils/pages';
import FileRepositoryPage from 'components/pages/file-repository';
import { dummyData } from 'components/pages/file-repository/FileTable/dummyData';
import useAuthContext from 'global/hooks/useAuthContext';

export default createPage<{ egoJwt: string }>({
  isPublic: true,
  getInitialProps: async ({ egoJwt }) => ({ egoJwt }),
})(({ egoJwt }) => {
  const { token } = useAuthContext();
  return <FileRepositoryPage token={token} data={dummyData} />;
});
