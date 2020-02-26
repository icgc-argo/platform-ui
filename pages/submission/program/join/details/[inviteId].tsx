import { createPage } from 'global/utils/pages';
import JoinProgramDetailsPage from 'components/pages/submission-system/join/details';
import { useRouter } from 'next/router';

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx }) => {
    return true;
  },
})(props => {
  const router = useRouter();
  const { inviteId } = router.query;
  return <JoinProgramDetailsPage {...props} />;
});
