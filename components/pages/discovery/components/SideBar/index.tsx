/*
 * Copyright (c) 2026 The Ontario Institute for Cancer Research. All rights reserved
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
        boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.10), 0px 3px 8px 0px rgba(0, 0, 0, 0.10)',
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
      onClick={onClick}
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
          ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            cursor: 'pointer',
          },
        },
      ])}
      className={className}
    >
      <div
        css={css({
          display: 'flex',
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
          <Toggle onClick={toggle} size="10px" direction="left" />
        </>
      ) : (
        <Toggle
          onClick={toggle}
          direction="right"
          size="10px"
          css={css({
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            '> div': { marginRight: 0 },
          })}
        />
      )}
    </SidebarComp>
  );
};

export default Sidebar;
