import * as React from 'react';
import Footer from 'uikit/Footer';
import { css } from 'uikit';
import { APP_VERSION } from 'global/constants';

export default function GlobalFooter() {
  return (
    <Footer
      version={APP_VERSION}
      css={css`
        background: #fff;
        z-index: 1;
        padding: 0 24px;
        border-top: 1px solid rgb(220, 221, 225);
      `}
      links={[
        { displayName: 'Contact', href: '/contact' },
        { displayName: 'Documentation', href: '#' },
        { displayName: 'Privacy Policy', href: '/privacy' },
        { displayName: 'Terms & Conditions', href: '#' },
        { displayName: 'Publication Policy', href: '#' },
      ]}
    />
  );
}
