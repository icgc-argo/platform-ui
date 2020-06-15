/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import * as React from 'react';
import Footer from 'uikit/Footer';
import { css } from 'uikit';
import { APP_VERSION } from 'global/constants';
import useTheme from 'uikit/utils/useTheme';
import { getConfig } from 'global/config';
import urlJoin from 'url-join';
import { CONTACT_PAGE_PATH } from 'global/constants/pages';
import * as internalPaths from 'global/constants/pages';
import {
  ARGO_PRIVACY_PAGE,
  ARGO_TERMS_PAGE,
  ARGO_PUBLICATION_PAGE,
} from 'global/constants/argoPages';
import { STATUS_PATH } from 'global/constants/gatewayApiPaths';

export default function GlobalFooter({ hideApiVersion = false, hideInternalPaths = false }) {
  const theme = useTheme();
  const { DOCS_URL_ROOT, GATEWAY_API_ROOT } = getConfig();
  const [apiVersion, setApiVersion] = React.useState(null);

  React.useEffect(() => {
    fetch(urlJoin(GATEWAY_API_ROOT, STATUS_PATH))
      .then(res => res.json())
      .then(version => {
        setApiVersion(version);
      })
      .catch(err => {
        console.warn(err);
      });
  }, []);

  return (
    <Footer
      version={APP_VERSION}
      apiVersion={hideApiVersion ? null : apiVersion}
      css={css`
        background: #fff;
        z-index: 1;
        padding: 0 24px;
        border-top: 1px solid ${theme.colors.grey_2};
      `}
      links={[
        {
          displayName: 'Contact',
          href: CONTACT_PAGE_PATH,
          target: '_self',
        },
        {
          displayName: 'Documentation',
          href: DOCS_URL_ROOT,
          target: '_blank',
        },
        {
          displayName: 'The Team',
          href: internalPaths.TEAM_PATH,
        },
        {
          displayName: 'Privacy Policy',
          href: ARGO_PRIVACY_PAGE,
          target: '_blank',
        },
        {
          displayName: 'Terms & Conditions',
          href: ARGO_TERMS_PAGE,
          target: '_blank',
        },
        {
          displayName: 'Publication Policy',
          href: ARGO_PUBLICATION_PAGE,
          target: '_blank',
        },
      ].filter(({ href }) =>
        hideInternalPaths ? !Object.values(internalPaths).includes(href) : true,
      )}
    />
  );
}
