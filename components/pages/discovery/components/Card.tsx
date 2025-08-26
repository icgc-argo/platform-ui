/*
 *
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *   If not, see <http://www.gnu.org/licenses/>.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 *  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 *  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 *  IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { commonStyles } from './common';

const Card = ({
  title,
  children,
  className,
  Selector,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  Selector?: ReactNode;
}): JSX.Element => (
  <div
    className={className}
    css={css([
      commonStyles.block,
      {
        display: 'flex',
        flexDirection: 'column',
      },
    ])}
  >
    <div
      css={css({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '7px 7px 16px 7px',
      })}
    >
      <h2
        css={css({
          margin: 0,
          color: '#0774D3',
          fontSize: '16px',
          fontWeight: 600,
        })}
      >
        {title}
      </h2>
      <div css={css({ marginLeft: 'auto' })}>{Selector}</div>
    </div>
    {children}
  </div>
);

export default Card;
