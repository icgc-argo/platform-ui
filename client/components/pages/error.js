import * as React from 'react';
import NavBar from './NavBar';
import { MenuItem } from 'uikit/AppBar';
import Footer from 'uikit/Footer';
import { css } from 'uikit';
import Container from 'uikit/Container';

export default function ErrorLayout({ children }) {
  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: auto 1fr auto;
        min-height: 100vh;
      `}
    >
      <NavBar pathname="123">
        <MenuItem>File Repository</MenuItem>
      </NavBar>

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

      <Footer
        css={css`
          padding: 0 24px;
          box-shadow: 0 6px 0px 0px white, 0 1px 6px 0 rgba(0, 0, 0, 0.1),
            0 1px 5px 0 rgba(0, 0, 0, 0.08);
        `}
        links={[
          { displayName: 'Contact', href: '#' },
          { displayName: 'Documentation', href: '#' },
          { displayName: 'Privacy Policy', href: '#' },
        ]}
      />
    </div>
  );
}
