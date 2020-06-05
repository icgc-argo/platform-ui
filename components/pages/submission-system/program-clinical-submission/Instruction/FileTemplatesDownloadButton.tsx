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

import * as React from 'react';
import Icon from 'uikit/Icon';
import {
  instructionBoxButtonIconStyle,
  instructionBoxButtonContentStyle,
  instructionBoxButtonStyle,
  downloadTsvFileTemplate,
} from '../../common';
import { css } from 'uikit';
import DropdownButton from 'uikit/DropdownButton';
import { capitalize } from 'global/utils/stringUtils';

export default ({ clinicalTypes }: { clinicalTypes: string[] }) => {
  const onItemClick: React.ComponentProps<typeof DropdownButton>['onItemClick'] = item => {
    if (item.value === 'all') {
      downloadTsvFileTemplate(`all`);
    } else {
      downloadTsvFileTemplate(`${item.value}.tsv`);
    }
  };

  return (
    <DropdownButton
      css={instructionBoxButtonStyle}
      variant="secondary"
      size="sm"
      onItemClick={onItemClick}
      menuItems={[
        {
          display: 'Download All',
          value: 'all',
        },
        ...clinicalTypes.map(clinicalType => ({
          value: clinicalType,
          display: capitalize(clinicalType.split('_').join(' ')),
        })),
      ]}
    >
      <span css={instructionBoxButtonContentStyle}>
        <Icon
          name="download"
          fill="accent2_dark"
          height="12px"
          css={instructionBoxButtonIconStyle}
        />
        File Templates
        <Icon
          name="chevron_down"
          fill="accent2_dark"
          height="9px"
          css={css`
            ${instructionBoxButtonIconStyle}
            margin-left: 5px;
          `}
        />
      </span>
    </DropdownButton>
  );
};
