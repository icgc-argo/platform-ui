import HomePage from '../components/pages/Homepage';
import { createPage } from 'global/utils/pages';

const landingPage = HomePage;

export default createPage({
  isPublic: true,
  getInitialProps: async () => ({}),
})(landingPage);
