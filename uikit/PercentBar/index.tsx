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

import useTheme from 'uikit/utils/useTheme';
import { css, keyframes } from '@emotion/core';

const PercentBar: React.ComponentType<{
  num: number;
  den: number;
  length?: number;
  fillColor?: string;
}> = ({ num, den, length, fillColor }) => {
  const theme = useTheme();

  // Negative Numbers should be zero, percentages over 100 should be capped
  // A zero denominator should show as 0% fill
  num < 0 ? (num = 0) : { num };
  const fraction = den <= 0 ? 0 : Math.min((num / den) * 100, 100);
  const fill_amount = `${fraction}%`;
  const lengthpx = `${length || 120}px`;

  // Animation
  const grow = keyframes`
      0% {
        width: 0%;
      }
  
      100% {
        width: ${fill_amount};
      }
     `;

  return (
    <div
      css={css`
        padding-bottom: 10px;
      `}
    >
      <div
        css={css`
          background-color: ${theme.colors.grey_2};
          border-radius: 8px;
          width: ${lengthpx};
        `}
      >
        <div
          css={css`
            background-color: ${theme.colors[fillColor] || fillColor || theme.colors.secondary};
            width: ${fill_amount};
            height: 6px;
            border-radius: 8px;
            animation-name: ${grow};
            animation-duration: 1s;
            transition: width 2s ease-in-out;
          `}
        />
      </div>
    </div>
  );
};

export default PercentBar;
