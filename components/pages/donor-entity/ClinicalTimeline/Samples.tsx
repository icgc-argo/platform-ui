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
  ColumnDef,
  createColumnHelper,
  css,
  Table,
  TableColumnConfig,
  TableDataBase,
  TableV8,
  Typography,
} from '@icgc-argo/uikit';
import { createRef } from 'react';
import { SampleNode } from '../types';
import { formatTableHeader, formatTableDisplayNames, formatTableData } from './util';
import { getConfig } from 'global/config';
import { usePageQuery } from 'global/hooks/usePageContext';
import NextLink from 'next/link';
import { Link } from '@icgc-argo/uikit';
import urlJoin from 'url-join';
import { FILE_REPOSITORY_PATH } from 'global/constants/pages';
import sqonBuilder from 'sqon-builder';

const { FEATURE_REACT_TABLE_V8_ENABLED } = getConfig();

export type SamplesTableColumns = SampleNode['node'];

const getAvailableFilesLink = ({ getValue, row }) => {
  const { donorId } = usePageQuery<{ donorId: string }>();
  const sampleFilter = sqonBuilder
    .has('donor_id', donorId)
    .has('submitter_sample_id', row.original.submitter_sample_id)
    .build();

  const sampleFilterUrl = urlJoin(
    FILE_REPOSITORY_PATH,
    `?filters=${encodeURIComponent(JSON.stringify(sampleFilter))}`,
  );

  return (
    <NextLink href={sampleFilterUrl} passHref>
      <Link variant="INLINE">{getValue()}</Link>
    </NextLink>
  );
};

const Samples = ({ samples }: { samples: SamplesTableColumns[] }) => {
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
  const tableColumnsSetup = !!samples.length
    ? Object.keys(samples[0]).map((sampleKey: keyof SamplesTableColumns) => ({
        id: sampleKey,
        header: () => formatTableHeader(sampleKey),
      }))
    : [];

  const columnHelper = createColumnHelper<SamplesTableColumns>();
  const tableColumns: ColumnDef<SamplesTableColumns>[] = tableColumnsSetup.map((column) =>
    columnHelper.accessor(column.id, {
      ...column,
      ...(column.id === 'available_files'
        ? {
            cell: ({ row, getValue }) => getAvailableFilesLink({ getValue, row }),
          }
        : {}),
    }),
  );

  const tableData: SamplesTableColumns[] = samples.map((sample) =>
    Object.entries(sample).reduce<SamplesTableColumns>(
      (acc, [key, value]) => ({
        ...acc,
        ...formatTableData(key, value),
      }),
      {} as SamplesTableColumns,
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
            withResize
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
