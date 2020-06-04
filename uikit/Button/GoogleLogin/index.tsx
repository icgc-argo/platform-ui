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
import Button from '../index';
import Icon from '../../Icon';
import css from '@emotion/css';
import useTheme from '../../utils/useTheme';
import urlJoin from 'url-join';

/**
 * Social login for Google
 */
const StyledLink = styled('a')`
  font-size: 30px;
  text-decoration: none;
  display: inline-block;
`;

const GoogleLogin: React.ComponentType<{
  id?: string;
  link: string;
  className?: string;
  redirectPath?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}> = ({ link, id, className, onClick, redirectPath = '' }) => {
  const theme = useTheme();
  return (
    <StyledLink id={id} href={urlJoin(link, redirectPath)} className={className} onClick={onClick}>
      <Button
        css={css`
          padding: 10px 13px;
        `}
      >
        <div
          css={css`
            ${css(theme.typography.paragraph as any)}
            display: flex;
            align-items: center;
            text-transform: none;
            font-size: 15px;
            font-weight: bold;
          `}
        >
          <Icon width="20px" height="20px" name="google" fill="none" />
          &nbsp;Log in with Google
        </div>
      </Button>
    </StyledLink>
  );
};

export default GoogleLogin;
