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

import useTheme from '../utils/useTheme';
import Typography from '../Typography';
import Icon from '../Icon';

const VAlignedText = (props) => (
  <Typography
    variant="data"
    component="span"
    css={css`
      display: flex;
      align-items: center;
    `}
    {...props}
  />
);

const PercentageBar = ({
  nom,
  denom,
  color = 'secondary_2',
  className,
}: {
  /**
   * the nominator
   */
  nom: number;
  /**
   * the denominator
   */
  denom: number;
  color?: string;
  className?: string;
}) => {
  const theme = useTheme();
  return (
    <div
      className={className}
      css={css`
        position: relative;
        display: flex;
        justify-content: flex-end;
        /* the transform creates a stacking-context so the z-index applies only locally*/
        transform: scale(1);
      `}
    >
      <VAlignedText>
        {nom.toLocaleString()} <Icon name="slash" height="15px" fill="grey_2" />{' '}
        {denom.toLocaleString()}
      </VAlignedText>
      <VAlignedText
        css={css`
          min-width: 65px;
          justify-content: flex-end;
        `}
      >
        ({((nom / denom) * 100).toFixed(2)}%)
      </VAlignedText>
      <div
        css={css`
          position: absolute;
          right: 0px;
          top: 0px;
          bottom: 0px;
          left: ${((denom - nom) / denom) * 100}%;
          background: ${theme.colors[color] || color || theme.colors.secondary_2};
          opacity: 0.3;
          z-index: -1;
        `}
      />
    </div>
  );
};

export default PercentageBar;
