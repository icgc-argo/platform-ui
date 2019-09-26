import NavBar from 'components/NavBar';
import { css } from 'uikit';
import Footer from '../Footer';
import { PageContainer } from 'uikit/PageLayout';

const LinkToHome = props => <a style={{ cursor: 'pointer' }} {...props} onClick={() => 'TODO'} />;

const LinkToDataRepo = props => <a {...props} onClick={() => 'TODO'} />;

export default function DefaultLayout({ children }) {
  return (
    <PageContainer>
      <NavBar />
      {children}
      <Footer />
    </PageContainer>
  );
}
