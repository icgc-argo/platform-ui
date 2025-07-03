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

import {
  css,
  Table,
  TableColumnConfig,
  TableDataBase,
  TableV8,
  Typography,
} from '@icgc-argo/uikit';
import { getConfig } from 'global/config';
import { createRef } from 'react';
import { SampleNode } from '../types';
import { formatTableData, formatTableDisplayNames, formatTableHeader } from './util';

const { FEATURE_REACT_TABLE_V8_ENABLED } = getConfig();

const Samples = ({ samples }: { samples: SampleNode[] }) => {
  // react table v6
  const tableData_legacy: TableDataBase = formatTableDisplayNames(samples);
  const tableColumns_legacy: TableColumnConfig<TableDataBase>[] = Object.keys(tableData_legacy).map(
    (key) => ({
      Header: key,
      Cell: tableData_legacy[key],
    }),
  );
  const containerRef = createRef<HTMLDivElement>();

  // react table v8
  const tableColumns = !!samples.length
    ? Object.keys(samples[0]).map((sampleKey) => ({
        accessorKey: sampleKey,
        header: () => formatTableHeader(sampleKey),
        id: sampleKey,
      }))
    : [];

  const tableData = samples.map((sample) =>
    Object.entries(sample).reduce(
      (acc, [key, value]) => ({
        ...acc,
        ...formatTableData(key, value),
      }),
      {},
    ),
  );

  return (
    <div
      css={css`
        margin: 14px 0 4px 0;
        width: 100%;
      `}
    >
      <Typography
        variant="navigation"
        as="div"
        css={css`
          margin-bottom: 4px;
        `}
      >
        Samples from this Specimen ({samples.length.toLocaleString()})
      </Typography>
      <div ref={containerRef}>
        {FEATURE_REACT_TABLE_V8_ENABLED ? (
          <TableV8
            columns={tableColumns}
            data={tableData}
            withHeaders
            withSideBorders
            withStripes
          />
        ) : (
          <Table
            parentRef={containerRef}
            columns={tableColumns_legacy}
            data={samples}
            withOutsideBorder
            stripped
            highlight={false}
            showPagination={false}
            sortable={false}
          />
        )}
      </div>
    </div>
  );
};

export default Samples;
