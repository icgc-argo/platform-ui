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
import { useTheme } from 'uikit/ThemeProvider';
import Typography from 'uikit/Typography';
import { rangeButtons } from './utils';

const RangeButton = ({
  children,
  handleClick,
  isActive,
  label,
}: {
  children: any;
  handleClick: () => void;
  isActive: boolean;
  label: string;
}) => {
  const theme = useTheme();

  const buttonStyle = css`
    background: transparent;
    border: 0 none;
    color: ${theme.colors.grey};
    cursor: pointer;
    display: inline-block;
    padding: 4;
    width: 25px;
  `;

  const buttonActiveStyle = css`
    color: ${theme.colors.secondary_dark};
    font-weight: 600;
  `;

  return (
    <button
      aria-label={label}
      title={label}
      type="button"
      onClick={handleClick}
      css={{...buttonStyle, ...(isActive ? buttonActiveStyle : {})}}
      >
      {children}
    </button>
  );
};

const RangeControlBar = ({ activeBtn, handleBtnClick, rangeArray }) => {
  const theme = useTheme();
  const barStyle = css`
    align-items: center;
    background: ${theme.colors.grey_3};
    box-sizing: border-box;
    display: flex;
    font-family: 'Work Sans, sans-serif';
    font-size: 12px;
    height: 30;
    justify-content: space-between;
    padding: 0 10px 0 5px;
    width: 100%;
  `;

  const rangeStyle = css`
    color: ${theme.colors.black};
  `;

  const rangeToStyle = css`
    color: ${theme.colors.grey};
  `;

  return (
    <div css={barStyle}>
      <div>
        {rangeButtons.map(btn => (
          <RangeButton
            handleClick={() => handleBtnClick(btn.title)}
            isActive={activeBtn === btn.title}
            key={btn.label}
            label={btn.label}
            >
            {btn.title}
          </RangeButton>
        ))}
      </div>
      <Typography as="div" color="primary" variant="data">
        <strong>{rangeArray[0]}</strong>
        <Typography as="span" color="grey" variant="data"> to </Typography>
        <strong>{rangeArray[1]}</strong>
      </Typography>
    </div>
  );
}

export default RangeControlBar;
