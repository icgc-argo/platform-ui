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
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Icon from '../Icon';
import icgcLogo from '../assets/icgc_logo.svg';
import css from '@emotion/css';
import { Row, Col } from 'react-grid-system';
import A from '../Link';

const Container = styled('footer')`
  ${({ theme }) => css(theme.typography.paragraph)};
  font-size: 11px;
  min-height: 58px;

  & a + svg {
    margin: 0px 8px;
  }
`;

const Footer = ({
  version = '[version]',
  apiVersion = null,
  links = [],
  className = '',
  ...otherProps
}) => (
  <Container className={`footer ${className}`} {...otherProps}>
    <Row
      css={css`
        min-height: 58px;
      `}
      justify="between"
      nogutter
    >
      <Col
        md={5}
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        © 2020 ICGC ARGO. All rights reserved.
        <br />
        ICGC ARGO Data Platform {version} {apiVersion && `- API ${apiVersion}`}
      </Col>
      <Col
        md={7}
        css={css`
          display: flex;
          align-items: center;
          font-size: 12px;
          justify-content: flex-end;
          padding-left: 22px;
        `}
      >
        <div>
          {links.map(({ displayName, href, target }, idx) => {
            if (idx !== links.length - 1) {
              return (
                <React.Fragment key={displayName}>
                  <A target={target} href={href}>
                    {displayName}
                  </A>
                  <Icon width="12px" height="12px" name="slash" fill="grey_1" />
                </React.Fragment>
              );
            } else {
              return (
                <A key={displayName} href={href} target={target}>
                  {displayName}
                </A>
              );
            }
          })}
        </div>

        <div
          css={css`
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
            line-height: 0;
            margin-left: 16px;
          `}
        >
          <a href="https://www.oicr.on.ca/" target="_blank">
            <img
              alt="Ontario Institute for Cancer Research"
              src={icgcLogo}
              style={{ height: '42px' }}
            />
          </a>
        </div>
      </Col>
    </Row>
  </Container>
);

Footer.propTypes = {
  version: PropTypes.string,
  apiVersion: PropTypes.string,
  links: PropTypes.array,
};

export default Footer;
