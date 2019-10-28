import NavBar from 'components/NavBar';
import Footer from '../Footer';
import { PageContainer } from 'uikit/PageLayout';

export default function DefaultLayout({ children }) {
  return (
    <PageContainer>
      <NavBar />
      {children}
      <Footer />
    </PageContainer>
  );
}
