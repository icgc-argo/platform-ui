/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import React from 'react';
import ErrorLayout from 'components/pages/error';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import HyperLink from 'uikit/Link';
import { getConfig } from 'global/config';
import Link from 'next/link';
import { Row, Col } from 'react-grid-system';
import image from 'static/dna-broken.svg';
import logoMark from 'static/logomark.svg';

export default function Error404Page() {
  const { DOCS_URL_ROOT } = getConfig();
  return (
    <ErrorLayout>
      <Row
        nogutter
        css={css`
          padding: 32px;
        `}
      >
        <Col sm={12} md={6}>
          <Typography
            css={css`
              font-size: 100px;
              margin: 0;
              font-weight: 600;
              line-height: normal;
            `}
          >
            4
            <img
              css={css`
                margin: 0 8px -2px;
              `}
              alt="Logo mark"
              src={logoMark}
            />
            4
          </Typography>
          <Typography as="div" variant="subtitle" color="secondary">
            Page not Found
          </Typography>
          <Typography variant="subtitle2">
            Oops! We can’t find the page that you’re looking for.
          </Typography>
          <Typography variant="subtitle2">
            Check out our{' '}
            <HyperLink target="_blank" href={DOCS_URL_ROOT}>
              <a>Documentation</a>
            </HyperLink>{' '}
            or head back{' '}
            <Link href="/">
              <HyperLink>Home</HyperLink>
            </Link>
            .
          </Typography>
        </Col>
        <Col
          sm={12}
          md={6}
          css={css`
            text-align: center;
          `}
        >
          <img alt="Broken dna" src={image} />
        </Col>
      </Row>
    </ErrorLayout>
  );
}
