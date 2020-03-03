import * as React from 'react';
import Footer from 'uikit/Footer';
import { css } from 'uikit';
import { APP_VERSION } from 'global/constants';
import useTheme from 'uikit/utils/useTheme';
import { getConfig } from 'global/config';

export default function GlobalFooter() {
  const theme = useTheme();
  const { DOCS_URL_ROOT } = getConfig();
  return (
    <Footer
      version={APP_VERSION}
      css={css`
        background: #fff;
        z-index: 1;
        padding: 0 24px;
        border-top: 1px solid ${theme.colors.grey_2};
      `}
      links={[
        { displayName: 'Contact', href: '/contact' },
        { displayName: 'Documentation', href: DOCS_URL_ROOT },
        { displayName: 'Privacy Policy', href: '/privacy' },
        { displayName: 'Terms & Conditions', href: '#' },
        { displayName: 'Publication Policy', href: '#' },
      ]}
    />
  );
}
