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

import React, { HtmlHTMLAttributes, HTMLAttributes, ReactNode, MouseEventHandler } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useTheme } from '../ThemeProvider';
import Typography from 'uikit/Typography';
import Tag from 'uikit/Tag';
import FocusWrapper from 'uikit/FocusWrapper';
import useElementDimension from 'uikit/utils/Hook/useElementDimension';
import Tooltip from 'uikit/Tooltip';

type TabStyleType = {
  background: string;
  border: string;
};

const Triangle = styled('div')<{ tabStyle: TabStyleType; contHeight: number }>`
  transition: all 0.25s;
  width: 0px;
  position: absolute;
  text-align: center;
  left: 100%;
  top: 0;
  transform: scaleX(0.5);
  &:after,
  &:before {
    transition: all 0.25s;
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
  }
  &:after {
    border-color: transparent transparent transparent
      ${({ theme, tabStyle }) => (tabStyle ? tabStyle.background : theme.colors.secondary_4)};
    border-width: ${({ contHeight }) => contHeight / 2}px;
    left: -1px;
  }
  &:before {
    top: -1px;
    left: 0px;
    border-color: transparent transparent transparent
      ${({ theme, tabStyle }) => (tabStyle ? tabStyle.border : theme.colors.secondary_2)};
    border-width: ${({ contHeight }) => (contHeight + 2) / 2}px; /* +2 for border around button */
  }
`;

const BaseItemContainer = styled(FocusWrapper)<{ tabStyle: TabStyleType; disabled?: boolean }>`
  width: 100%;
  position: relative;
  transition: all 0.25s;
  min-height: 40px;
  padding: 8px 10px;
  border: solid 1px;
  border-left: solid 3px;
  border-right: none;
  border-color: rgba(0, 0, 0, 0);
  ${({ disabled, theme }) =>
    disabled
      ? `
          &:focus {
            box-shadow: none;
          }

          &:hover {
            cursor: default;
          }
        `
      : `
          &:hover {
            cursor: pointer;
          }
        `}
`;

const ActiveItemContainer = styled(BaseItemContainer)<{ tabStyle: TabStyleType }>`
  border-color: ${({ theme }) => theme.colors.secondary};
  border-top-color: ${({ theme }) => theme.colors.secondary_2};
  border-bottom-color: ${({ theme }) => theme.colors.secondary_2};
  border-right: solid 1px ${({ theme }) => theme.colors.secondary_2};
  background: ${({ theme, tabStyle }) =>
    tabStyle ? tabStyle.background : theme.colors.secondary_4};
  color: ${({ theme }) => theme.colors.secondary_dark};
`;

const VerticalTabsItem: React.ComponentType<
  {
    active?: boolean;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    tabStyle?: TabStyleType;
    tooltip?: ReactNode;
  } & HTMLAttributes<HTMLButtonElement>
> = ({
  active = false,
  children,
  disabled = false,
  onClick = () => {},
  tabStyle,
  tooltip,
  ...rest
}) => {
  const ContainerComponent = active ? ActiveItemContainer : BaseItemContainer;
  const containerRef = React.useRef(null);

  const { height: contHeight } = useElementDimension(containerRef);

  const clickHandler = (event) => disabled || onClick(event);

  return (
    <ContainerComponent
      tabStyle={tabStyle}
      disabled={disabled}
      onClick={clickHandler}
      {...rest}
      ref={containerRef}
    >
      <Tooltip
        css={css`
          // these are applied to the internal container of the tooltip
          max-width: 200px;
        `}
        disabled={!tooltip}
        html={tooltip}
        position="right"
      >
        <Typography
          variant="data"
          as="div"
          css={css`
            width: 100%;
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              text-align: left;
            `}
          >
            {children}
          </div>
        </Typography>
        {active && (
          <Triangle tabStyle={tabStyle} contHeight={contHeight} className="activeTriangle" />
        )}
      </Tooltip>
    </ContainerComponent>
  );
};
VerticalTabsItem.displayName = 'VerticalTabs.Item';

const VerticalTabs: React.ComponentType<HtmlHTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        border-right: solid 1px ${theme.colors.grey_2};
      `}
      {...rest}
    >
      {children}
    </div>
  );
};

const TabsItemTag: typeof Tag = styled(Tag)`
  min-width: 30px;
  justify-content: center;
  text-align: center;
`;
TabsItemTag.displayName = 'VerticalTabs.Tag';

const output: typeof VerticalTabs & {
  Item: typeof VerticalTabsItem;
  Tag: typeof Tag;
} = (() => {
  const output = VerticalTabs as any;
  output.Item = VerticalTabsItem;
  output.Tag = TabsItemTag;
  return output;
})();

export default output;
