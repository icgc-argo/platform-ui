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
        box-shadow: 0 6px 0px 0px white, 0 1px 6px 0 rgba(0, 0, 0, 0.1),
          0 1px 5px 0 rgba(0, 0, 0, 0.08);
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
