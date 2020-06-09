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

import React from 'react';
import ErrorLayout from 'components/pages/error';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import { Row, Col } from 'react-grid-system';
import image from 'static/group-33.svg';

export default () => (
  <ErrorLayout hideApiVersion hideNavbarLinks hideInternalPaths>
    <Row
      nogutter
      css={css`
        padding: 32px;
      `}
    >
      <Col sm={12} md={6}>
        <Typography
          css={css`
            font-size: 44px;
            margin: 10px 0;
            line-height: normal;
          `}
          as="h1"
        >
          Be back soon
        </Typography>
        <Typography
          as="h2"
          variant="subtitle"
          color="secondary"
          css={css`
            margin: 0;
          `}
        >
          Down for Maintenance
        </Typography>
        <Typography variant="subtitle2" as="p">
          We'll be back up and running as quickly as possible. We appreciate your patience.
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
