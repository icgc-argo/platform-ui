/*
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
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

import { css, Icon, UikitIconNames } from '@icgc-argo/uikit';
import { PropsWithChildren } from 'react';

const SidebarComp = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#04518C',
      })}
    >
      {children}
    </div>
  );
};

const Toggle = ({
  onClick,
  size = '10px',
  direction = 'left',
  className,
}: {
  onClick: () => void;
  size: string;
  direction?: 'left' | 'right'; // valid for UikitIconNames
  className?;
}) => {
  const fill = 'white';

  return (
    <div
      css={css([
        {
          height: '50px',
          backgroundColor: '#04518C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'right',
          '> div': {
            marginRight: '12px',
          },
        },
      ])}
      className={className}
    >
      <div
        onClick={onClick}
        css={css({
          ':hover': {
            cursor: 'pointer',
          },
        })}
      >
        <Icon
          name={`chevron_${direction}` as UikitIconNames}
          width={size}
          height={size}
          fill={fill}
        />
        <Icon
          name={`chevron_${direction}` as UikitIconNames}
          width={size}
          height={size}
          fill={fill}
          css={css({ marginLeft: '-4px' })}
        />
      </div>
    </div>
  );
};

const Sidebar = ({
  toggle,
  open,
  children,
}: PropsWithChildren<{ toggle: () => void; open: boolean }>) => {
  return (
    <SidebarComp>
      {open ? (
        <>
          {children}
          <Toggle onClick={toggle} size="10px" />
        </>
      ) : (
        <Toggle
          onClick={toggle}
          size="10px"
          css={css({
            height: '80px',
            position: 'absolute',
            top: 'calc(50% - 40px)',
            width: '40px',
          })}
        />
      )}
    </SidebarComp>
  );
};

export default Sidebar;
