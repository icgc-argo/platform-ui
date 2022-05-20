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

import memoize from 'lodash/memoize';
import React from 'react';
import { css } from 'uikit';
import Table from 'uikit/Table';
import { useTheme } from 'uikit/ThemeProvider';
import Typography from 'uikit/Typography';
import { TableInfoHeaderContainer } from '../../common';
import { ClinicalEntity, ClinicalFilter } from '../common';

export type DonorEntry = {
  row: string;
  isNew: boolean;
  [k: string]: string | number | boolean;
};

const getColumnWidth = memoize<(keyString: string) => number>((keyString) => {
  const minWidth = 90;
  const maxWidth = 230;
  const spacePerChar = 9;
  const margin = 25;
  const targetWidth = keyString.length * spacePerChar + margin;
  return Math.max(Math.min(maxWidth, targetWidth), minWidth);
});

const DataTable = (props: { entityData: ClinicalEntity; filters: ClinicalFilter }) => {
  const theme = useTheme();
  const { entityData, filters } = props;
  const { page, limit } = filters;
  const min = page * limit + 1;
  const max = (page + 1) * limit;
  const containerRef = React.createRef<HTMLDivElement>();

  const records = [];
  entityData.records.forEach((record) => record.forEach((r) => records.push(r)));

  return (
    <div
      ref={containerRef}
      css={css`
        position: relative;
      `}
    >
      <TableInfoHeaderContainer
        left={
          <Typography
            css={css`
              margin: 0px;
            `}
            variant="default"
          >
            Showing {min} - {max} of {limit}
          </Typography>
        }
      />{' '}
      <Table
        withOutsideBorder
        parentRef={containerRef}
        showPagination={true}
        pageSize={Number.MAX_SAFE_INTEGER}
        columns={entityData.entityFields.map((key) => ({
          id: key,
          accessor: key,
          Header: key,
          minWidth: getColumnWidth(key),
        }))}
        data={records}
      />
    </div>
  );
};

export default DataTable;
