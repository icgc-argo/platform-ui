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

/**
 * Differences to Basic facet (not just tooltip as bad naming implies)
 * - coloring to denote "logged in"
 * - reordering does not happen
 * - tooltip helper
 * - no "select all" option
 */

import React from 'react';
import { MenuItem as MenuItemComp } from '../../SubMenu';
import { css } from '@emotion/core';
import OptionsListComp, { FilterOption } from 'uikit/OptionsList';
import Icon from 'uikit/Icon';
import { styled } from 'uikit';
import Tooltip from 'uikit/Tooltip';

const TooltipFacet = ({
  subMenuName,
  options,
  isExpanded,
  onClick,
  countUnit,
  onOptionToggle,
  onSelectAllOptions,
  parseDisplayValue,
  tooltipContent = null,
}: {
  subMenuName: string;
  options: Array<FilterOption>;
  isExpanded?: boolean;
  onClick?: (e: any) => void;
  countUnit?: string;
  onOptionToggle: (facetValue: string | string[]) => void;
  onSelectAllOptions: (allOptionsSelected: boolean) => void;
  parseDisplayValue?: (inputValue: string) => string;
  tooltipContent: React.ReactNode;
}) => {
  const MenuItem = styled(MenuItemComp)`
    background-color: ${({ theme }) => theme.colors.warning_4};

    .FacetMenu {
      background-color: ${({ theme }) => theme.colors.warning_4};
      &:hover {
        background-color: ${({ theme }) => theme.colors.warning_3};
      }
    }
  `;

  const OptionsList = styled(OptionsListComp)`
    > div:not(:first-of-type):hover {
      background-color: ${({ theme }) => theme.colors.warning_3};
    }
  `;

  return (
    <MenuItem
      className="FacetMenu"
      onClick={onClick}
      selected={isExpanded}
      content={subMenuName}
      chevronOnLeftSide={true}
      RightSideComp={
        <Tooltip position={'right'} html={tooltipContent}>
          <Icon name="question_circle" fill="primary_2" width="18px" height="18px" />
        </Tooltip>
      }
      isFacetVariant={true}
      css={css`
        width: 100%;
      `}
    >
      {/* @ts-ignore*/}
      <OptionsList
        options={options}
        countUnit={countUnit}
        onOptionToggle={onOptionToggle}
        onSelectAllOptions={onSelectAllOptions}
        parseDisplayValue={parseDisplayValue}
        selectAllVisible={false}
      />
    </MenuItem>
  );
};

export default TooltipFacet;
