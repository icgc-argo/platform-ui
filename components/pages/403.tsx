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
import { Typography } from '@icgc-argo/uikit';
import { css } from '@icgc-argo/uikit';
import { HyperLink } from '@icgc-argo/uikit';
import NextLink from 'next/link';
import { getConfig } from 'global/config';
import { Row, Col } from 'react-grid-system';
import dnaLockedImage from 'images/dna-locked.svg';
import logoMarkImage from 'images/logomark.svg';
import Image from 'next/image';

export default function Error403Page() {
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
            <Image
              css={css`
                margin: 0 8px -2px;
              `}
              alt="0"
              src={logoMarkImage}
              layout="fixed"
              width={70}
              height={71}
            />
            3
          </Typography>
          <Typography as="h2" variant="subtitle" color="secondary">
            Forbidden
          </Typography>
          <Typography
            variant="subtitle2"
            css={css`
              margin: 33px 0;
            `}
          >
            You do not have permission to access this page.
          </Typography>
          <Typography variant="subtitle2">
            Check out our{' '}
            <HyperLink target="_blank" href={DOCS_URL_ROOT}>
              Documentation
            </HyperLink>{' '}
            or head back{' '}
            <NextLink href="/">
              <HyperLink>Home</HyperLink>
            </NextLink>
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
          <Image alt="Locked DNA" src={dnaLockedImage} layout="fixed" width={273} height={300} />
        </Col>
      </Row>
    </ErrorLayout>
  );
}
