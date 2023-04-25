/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
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

import { QueryHookOptions, useQuery } from '@apollo/client';
import {
  ColumnDef,
  Container,
  css,
  DEFAULT_TABLE_PAGE_SIZE,
  Link,
  OnChangeFn,
  PaginationState,
  SortingState,
  TableCellWrapper,
  TableRowSelectionCheckbox,
  TableV8,
  Typography,
  useTableRowSelection,
  useTheme,
} from '@icgc-argo/uikit';
import filesize from 'filesize';
import { getConfig } from 'global/config';
import {
  DONOR_ENTITY_ID_PATH,
  DONOR_ENTITY_PATH,
  FILE_ENTITY_ID_PATH,
  FILE_ENTITY_PATH,
  PROGRAM_ENTITY_ID_PATH,
  PROGRAM_ENTITY_PATH,
} from 'global/constants/pages';
import NextLink from 'next/link';
import pluralize from 'pluralize';
import { PropsWithChildren, useState } from 'react';

import useFileCentricFieldDisplayName from '../hooks/useFileCentricFieldDisplayName';
import useFiltersContext from '../hooks/useFiltersContext';
import { FileCentricDocumentField } from '../types';
import { FileRepoFiltersType } from '../utils/types';
import FILE_REPOSITORY_TABLE_QUERY from './gql/FILE_REPOSITORY_TABLE_QUERY';
import TsvDownloadButton from './TsvDownloadButton';
import {
  FileRepositoryRecord,
  FileRepositoryRecordSort,
  FileRepositorySortingState,
  FileRepositoryTableQueryData,
  FileRepositoryTableQueryVariables,
} from './types';

const DEFAULT_FILE_REPOSITORY_TABLE_SORT: FileRepositorySortingState[] = [
  {
    id: FileCentricDocumentField.file_number,
    desc: true,
  },
];

const useFileRepositoryTableQuery = ({
  first,
  offset,
  sort,
  filters,
  options = {},
}: {
  options?: Omit<
    QueryHookOptions<FileRepositoryTableQueryData, FileRepositoryTableQueryVariables>,
    'variables'
  >;
  first: number;
  offset: number;
  filters: FileRepoFiltersType;
  sort: FileRepositoryRecordSort[];
}) => {
  const queryResult = useQuery<FileRepositoryTableQueryData, FileRepositoryTableQueryVariables>(
    FILE_REPOSITORY_TABLE_QUERY,
    {
      ...options,
      variables: {
        first,
        offset,
        filters,
        sort,
      },
      errorPolicy: 'all',
    },
  );
  if (queryResult.error) {
    console.error(queryResult.error);
  }
  return queryResult;
};

const formatFileRepositorySortRequest = (sorts: SortingState): FileRepositoryRecordSort[] =>
  sorts.map(({ id, desc }: { id: FileCentricDocumentField; desc: boolean }) => ({
    field: id,
    order: desc ? 'desc' : 'asc',
  }));

const FileTable = () => {
  const { FEATURE_DONOR_ENTITY_ENABLED, FEATURE_PROGRAM_ENTITY_ENABLED } = getConfig();

  const { filters } = useFiltersContext();
  const theme = useTheme();

  const { data: fieldDisplayNames } = useFileCentricFieldDisplayName();

  // pagination
  const [{ pageIndex, pageSize }, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_TABLE_PAGE_SIZE,
  });
  const handlePaginationState = (nextState: Partial<PaginationState>) =>
    setPaginationState({ pageIndex, pageSize, ...nextState });

  // sorting
  const [sortingState, setSortingState] = useState<FileRepositorySortingState[]>(
    DEFAULT_FILE_REPOSITORY_TABLE_SORT,
  );
  const onSortingChange: OnChangeFn<FileRepositorySortingState[]> = (
    getNextSort: () => FileRepositorySortingState[],
  ) => {
    handlePaginationState({ pageIndex: 0 });
    const nextSort = getNextSort();
    setSortingState(nextSort);
  };

  const { data: records, loading = true } = useFileRepositoryTableQuery({
    first: pageSize,
    offset: pageSize * pageIndex,
    sort: formatFileRepositorySortRequest(sortingState),
    filters,
  });

  const totalEntries = records?.file?.hits?.total || 0;

  const {
    allRowsSelected,
    isSelected,
    selectedRows,
    selectedRowsCount,
    selectionKeyField,
    toggleAllHandler,
    toggleHandler,
    unselectedRows,
  } = useTableRowSelection({
    totalEntriesCount: totalEntries,
    selectionKeyField: 'objectId',
  });

  const RowSelectionCellWrapper = ({
    children,
    original,
  }: PropsWithChildren<{ original: FileRepositoryRecord }>) => (
    <TableCellWrapper selected={isSelected(original[selectionKeyField])}>
      {children}
    </TableCellWrapper>
  );

  const tableColumns: ColumnDef<FileRepositoryRecord>[] = [
    // accessorKey corresponds to tableData keys.
    // id is used for sorting.
    {
      header: () => (
        <TableRowSelectionCheckbox
          checked={allRowsSelected}
          id="toggleAll"
          onChange={toggleAllHandler}
        />
      ),
      id: 'checkbox-column',
      enableSorting: false,
      cell: ({ row: { original } }) => {
        const rowId = original[selectionKeyField];
        return (
          <RowSelectionCellWrapper original={original}>
            <TableRowSelectionCheckbox
              checked={isSelected(rowId)}
              id={rowId}
              onChange={() => toggleHandler(rowId)}
            />
          </RowSelectionCellWrapper>
        );
      },
      size: 15,
    },
    {
      header: 'File ID',
      // sorting uses file_number instead of file_id to make
      // numeric sorting work. doesn't affect TSV downloads.
      id: FileCentricDocumentField.file_number,
      accessorKey: 'fileId',
      cell: ({ row: { original } }) => (
        <RowSelectionCellWrapper original={original}>
          <NextLink
            href={FILE_ENTITY_PATH}
            as={FILE_ENTITY_PATH.replace(FILE_ENTITY_ID_PATH, original.fileId)}
            passHref
          >
            <Link>{original.fileId}</Link>
          </NextLink>
        </RowSelectionCellWrapper>
      ),
    },
    {
      header: fieldDisplayNames['donors.donor_id'],
      id: FileCentricDocumentField['donors.donor_id'],
      accessorKey: 'donorId',
      cell: ({ row: { original } }) => (
        <RowSelectionCellWrapper original={original}>
          {FEATURE_DONOR_ENTITY_ENABLED ? (
            <NextLink
              href={DONOR_ENTITY_PATH}
              as={DONOR_ENTITY_PATH.replace(DONOR_ENTITY_ID_PATH, original.donorId)}
              passHref
            >
              <Link>{original.donorId}</Link>
            </NextLink>
          ) : (
            original.donorId
          )}
        </RowSelectionCellWrapper>
      ),
    },
    {
      header: fieldDisplayNames['donors.submitter_donor_id'],
      id: FileCentricDocumentField['donors.submitter_donor_id'],
      accessorKey: 'submitterDonorId',
    },
    {
      header: fieldDisplayNames['study_id'],
      id: FileCentricDocumentField['study_id'],
      accessorKey: 'programId',
      cell: ({ row: { original } }) => (
        <RowSelectionCellWrapper original={original}>
          {FEATURE_PROGRAM_ENTITY_ENABLED ? (
            <NextLink
              href={PROGRAM_ENTITY_PATH}
              as={PROGRAM_ENTITY_PATH.replace(PROGRAM_ENTITY_ID_PATH, original.programId)}
              passHref
            >
              <Link>{original.programId}</Link>
            </NextLink>
          ) : (
            original.programId
          )}
        </RowSelectionCellWrapper>
      ),
    },
    {
      header: fieldDisplayNames['data_type'],
      id: FileCentricDocumentField['data_type'],
      accessorKey: 'dataType',
      size: 180,
    },
    {
      header: fieldDisplayNames['file_type'],
      id: FileCentricDocumentField['file_type'],
      accessorKey: 'fileType',
      size: 80,
    },
    {
      header: fieldDisplayNames['analysis.experiment.experimental_strategy'],
      id: FileCentricDocumentField['analysis.experiment.experimental_strategy'],
      accessorKey: 'experimentalStrategy',
    },
    {
      header: fieldDisplayNames['file.size'],
      id: FileCentricDocumentField['file.size'],
      accessorKey: 'size',
      cell: ({ row: { original } }) => (
        <RowSelectionCellWrapper original={original}>
          {filesize(original.size)}
        </RowSelectionCellWrapper>
      ),
    },
    {
      header: fieldDisplayNames['object_id'],
      id: FileCentricDocumentField['object_id'],
      accessorKey: 'objectId',
      size: 260,
    },
    // disabled for initial File Repo release
    // {
    //   header: 'Actions',
    //   size: 80,
    //   enableSorting: false,
    //   cell: ({row: { original }}) => {
    //     const downloadStatus = getDownloadStatus(original.isDownloadable);

    //     return (
    //      <RowSelectionCellWrapper original={original}>
    //          <div
    //           css={css`
    //             display: flex;
    //             flex-direction: row;
    //             justify-content: center;
    //             align-items: center;
    //           `}
    //         >
    //           <InteractiveIcon
    //             position="left"
    //             html={<span>{downloadStatus.toolTipText}</span>}
    //             disabled={!downloadStatus.canUserDownload}
    //             height="16px"
    //             width="16px"
    //             name={downloadStatus.canUserDownload ? 'download' : 'lock'}
    //             fill={downloadStatus.canUserDownload ? 'accent2_dark' : 'primary_2'}
    //             onClick={e => fileDownloader(original.fileID)}
    //           />
    //         </div>
    //        </RowSelectionCellWrapper>
    //     );
    //   },
    // },
  ].map((column) => ({
    ...column,
    meta: { customCell: true },
    ...(column.cell
      ? {}
      : {
          cell: ({ row: { original }, cell }) => (
            <RowSelectionCellWrapper original={original}>{cell.getValue()}</RowSelectionCellWrapper>
          ),
        }),
  }));

  const tableData: FileRepositoryRecord[] = records?.file?.hits
    ? records.file.hits.edges.map(({ node }) => ({
        objectId: node.object_id,
        donorId: node.donors.hits.edges.map((edge) => edge.node.donor_id).join(', '),
        submitterDonorId: node.donors.hits.edges
          .map((edge) => edge.node.submitter_donor_id)
          .join(', '),
        programId: node.study_id,
        dataType: node.data_type,
        experimentalStrategy: node.analysis.experiment.experimental_strategy,
        fileId: node.file_id,
        fileType: node.file_type,
        size: node.file.size,
        isDownloadable: false, // mocked, column will be temporarily hidden in https://github.com/icgc-argo/platform-ui/issues/1553
      }))
    : [];

  const tableElement = (
    <div
      css={css`
        z-index: 2;
        padding-top: 10px;
      `}
    >
      <TableV8
        columns={tableColumns}
        data={tableData}
        enableSorting
        initialState={{ sorting: DEFAULT_FILE_REPOSITORY_TABLE_SORT }}
        loading={loading}
        manualPagination
        manualSorting
        onPaginationChange={setPaginationState}
        onSortingChange={onSortingChange}
        pageCount={Math.ceil(totalEntries / pageSize)}
        paginationState={{ pageIndex, pageSize }}
        showPageSizeOptions
        sortingState={sortingState}
        withHeaders
        withPagination
        withRowHighlight
        withStripes
      />
    </div>
  );

  const firstRowIndex = pageSize * pageIndex + 1;
  const lastRowIndex = Math.min(pageSize * (pageIndex + 1), totalEntries);

  return (
    <Container
      css={css`
        padding: 10px;
      `}
    >
      {totalEntries > 0 && (
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <div
            css={css`
              margin-left: 10px;
            `}
          >
            <div>
              <Typography variant="data" color="grey">
                {`${firstRowIndex.toLocaleString()}-${lastRowIndex.toLocaleString()} of ${totalEntries.toLocaleString()} ${pluralize(
                  'file',
                  totalEntries,
                )}`}
              </Typography>
              <Typography variant="data" color={theme.colors.secondary_dark}>
                {!!selectedRowsCount &&
                  ` (${selectedRowsCount.toLocaleString()} ${pluralize(
                    'file',
                    selectedRowsCount,
                  )} selected)`}
              </Typography>
            </div>
          </div>
          <div
            css={css`
              display: flex;
            `}
          >
            <TsvDownloadButton
              allFilesSelected={allRowsSelected}
              selectedFilesObjectIds={selectedRows}
              unSelectedFilesObjectIds={unselectedRows}
              selectedFilesCount={selectedRowsCount}
            />
            {/* disabled for initial File Repo release */}
            {/* <DropdownButton
              variant="secondary"
              size="sm"
              onItemClick={item => null}
              menuItems={[
                {
                  display: 'placeholder',
                  value: 'placeholder',
                },
              ]}
            >
              <span css={instructionBoxButtonContentStyle}>
                Columns
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
            </DropdownButton> */}
          </div>
        </div>
      )}
      {tableElement}
    </Container>
  );
};

export default FileTable;
