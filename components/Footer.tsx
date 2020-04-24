import * as React from 'react';
import Footer from 'uikit/Footer';
import { css } from 'uikit';
import { APP_VERSION } from 'global/constants';
import useTheme from 'uikit/utils/useTheme';
import { getConfig } from 'global/config';
import urlJoin from 'url-join';
import { trim } from 'lodash';

export default function GlobalFooter() {
  const theme = useTheme();
  const { DOCS_URL_ROOT, GATEWAY_API_ROOT } = getConfig();
  const [apiVersion, setApiVersion] = React.useState(null);

  React.useEffect(() => {
    fetch(urlJoin(GATEWAY_API_ROOT, 'status'))
      .then(res => res.text())
      .then(version => {
        setApiVersion(trim(version, '"'));
      })
      .catch(err => {
        console.warn(err);
      });
  }, []);

  return (
    <Footer
      version={APP_VERSION}
      apiVersion={apiVersion}
      css={css`
        background: #fff;
        z-index: 1;
        padding: 0 24px;
        border-top: 1px solid ${theme.colors.grey_2};
      `}
      links={[
        { displayName: 'Contact', href: '/contact', target: '_self' },
        { displayName: 'Documentation', href: DOCS_URL_ROOT, target: '_blank' },
        {
          displayName: 'Privacy Policy',
          href: 'https://www.icgc-argo.org/page/2/privacy',
          target: '_blank',
        },
        {
          displayName: 'Terms & Conditions',
          href: 'https://www.icgc-argo.org/page/1/terms-and-conditions',
          target: '_blank',
        },
        {
          displayName: 'Publication Policy',
          href: 'https://www.icgc-argo.org/page/77/e3-publication-policy',
          target: '_blank',
        },
      ]}
    />
  );
}
