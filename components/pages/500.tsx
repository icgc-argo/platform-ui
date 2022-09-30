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

import { css, Link, Typography } from '@icgc-argo/uikit';
import ErrorLayout from 'components/pages/error';
import { getConfig } from 'global/config';
import dnaBrokenImage from 'images/dna-broken.svg';
import logoMarkImage from 'images/logomark.svg';
import Image from 'next/image';
import NextLink from 'next/link';
import { Col, Row } from 'react-grid-system';

export default function Error500Page() {
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
            5
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
            0
          </Typography>
          <Typography as="h2" variant="subtitle" color="secondary">
            Internal Server Error
          </Typography>
          <Typography variant="subtitle2">Oops! We cannot handle this request.</Typography>
          <Typography variant="subtitle2">
            Check out our{' '}
            <Link target="_blank" href={DOCS_URL_ROOT}>
              Documentation
            </Link>{' '}
            or head back{' '}
            <NextLink href="/">
              <Link>Home</Link>
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
          <Image alt="Broken DNA" src={dnaBrokenImage} layout="fixed" width={276} height={300} />
        </Col>
      </Row>
    </ErrorLayout>
  );
}
