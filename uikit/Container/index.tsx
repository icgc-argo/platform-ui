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
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';

import color from 'color';
import useTheme from '../utils/useTheme';
import DnaLoader from '../DnaLoader';

const ContainerBackground = styled<'div', { loading?: boolean }>('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'loading',
})`
  border-radius: 8px;
  position: relative;
  overflow: ${(props) => (props.loading ? 'hidden' : 'visible')};
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
  background-color: ${({ theme }) => theme.colors.white};
`;

const LoadingOverlay = () => {
  const theme = useTheme();
  return (
    <div
      css={css`
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        background: ${color(theme.colors.white).alpha(0.7).hsl().string()};
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <DnaLoader />
    </div>
  );
};

const Container: React.ComponentType<
  {
    loading?: boolean;
  } & Partial<React.ComponentProps<typeof ContainerBackground>>
> = ({ children, loading = false, ...props }) => (
  <ContainerBackground loading={loading} {...props}>
    {children}
    {loading && <LoadingOverlay />}
  </ContainerBackground>
);

export default Container;
