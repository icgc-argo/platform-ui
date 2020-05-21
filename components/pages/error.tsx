import * as React from 'react';
import NavBar from 'components/NavBar';
import { MenuItem } from 'uikit/AppBar';
import Footer from '../Footer';
import { css } from 'uikit';
import Container from 'uikit/Container';
import { PageContainer } from 'uikit/PageLayout';

export default function ErrorLayout({
  children,
  hideNavbarLinks = false,
  hideInternalPaths = false,
  hideApiVersion = false,
}) {
  return (
    <PageContainer>
      <NavBar hideLink={hideNavbarLinks} disableLogoLink={hideInternalPaths} />
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <Container
          css={css`
            max-width: 875px;
          `}
        >
          {children}
        </Container>
      </div>

      <Footer hideApiVersion={hideApiVersion} hideInternalPaths={hideInternalPaths} />
    </PageContainer>
  );
}
