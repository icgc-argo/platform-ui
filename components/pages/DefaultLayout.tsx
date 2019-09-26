import NavBar from 'components/NavBar';
import { css } from 'uikit';
import Footer from 'uikit/Footer';
import { PageContainer } from 'uikit/PageLayout';
import { APP_VERSION } from 'global/constants';

const LinkToHome = props => <a style={{ cursor: 'pointer' }} {...props} onClick={() => 'TODO'} />;

const LinkToDataRepo = props => <a {...props} onClick={() => 'TODO'} />;

export default function DefaultLayout({ children }) {
  return (
    <PageContainer>
      <NavBar />
      {children}
      <Footer
        version={APP_VERSION}
        css={css`
          padding: 0 24px;
          box-shadow: 0 6px 0px 0px white, 0 1px 6px 0 rgba(0, 0, 0, 0.1),
            0 1px 5px 0 rgba(0, 0, 0, 0.08);
        `}
        links={[
          { displayName: 'Contact', href: '#' },
          { displayName: 'Documentation', href: '#' },
          { displayName: 'Privacy Policy', href: '/privacy' },
          { displayName: 'Terms & Conditions', href: '#' },
          { displayName: 'Publication Policy', href: '#' },
        ]}
      />
    </PageContainer>
  );
}
