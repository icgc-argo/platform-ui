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
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import noDataSvg from 'uikit/assets/noData.svg';
import Typography from '../Typography';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
`;

type ContentPlaceholderProps = {
  title?: string;
  subtitle?: string;
  link?: React.ReactNode;
} & React.ComponentProps<typeof Container>;

const ContentPlaceholder: React.ComponentType<ContentPlaceholderProps> = ({
  children = <img alt="no data found" src={noDataSvg} />,
  title = 'No Data Found.',
  subtitle,
  link,
  ...rest
}) => (
  <Container {...rest}>
    {children}
    <Typography
      css={css`
        margin-top: 14px;
        margin-bottom: 0;
      `}
      color="grey"
      variant="navigation"
      as="p"
      bold
    >
      {title}
    </Typography>
    <Typography
      css={css`
        margin-top: 10px;
        margin-bottom: 0;
      `}
      color="grey"
      variant="data"
      as="p"
    >
      {subtitle}
    </Typography>
    {link}
  </Container>
);

export default ContentPlaceholder;
