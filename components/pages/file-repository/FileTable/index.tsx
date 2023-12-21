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

import { QueryHookOptions, useQuery } from '@apollo/client';
import {
  Container,
  Link,
  SelectTable,
  TableColumnConfig,
  Typography,
  css,
  useSelectTableSelectionState,
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
import { SortedChangeFunction } from 'global/types/table';
import NextLink from 'next/link';
import pluralize from 'pluralize';
import { createRef, useEffect, useState } from 'react';

import useFileCentricFieldDisplayName from '../hooks/useFileCentricFieldDisplayName';
import useFiltersContext from '../hooks/useFiltersContext';
import { FileCentricDocumentField, FileCentricDocumentFields } from '../types';
import { FileRepoFiltersType } from '../utils/types';
import TsvDownloadButton from './TsvDownloadButton';
import FILE_REPOSITORY_TABLE_QUERY from './gql/FILE_REPOSITORY_TABLE_QUERY';
import {
  FileRepositoryRecord,
  FileRepositoryRecordSort,
  FileRepositoryRecordSortOrder,
  FileRepositorySortingRule,
  FileRepositoryTableQueryData,
  FileRepositoryTableQueryVariables,
} from './types';

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE_OFFSET = 0;
const DEFAULT_SORT = [
  {
    field: FileCentricDocumentFields.file_number,
    order: 'desc' as FileRepositoryRecordSortOrder,
  },
];

const useFileRepoTableQuery = (
  first: number,
  offset: number,
  sort: FileRepositoryRecordSort[],
  filters: FileRepoFiltersType,
  options: Omit<
    QueryHookOptions<FileRepositoryTableQueryData, FileRepositoryTableQueryVariables>,
    'variables'
  > = {},
) => {
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

const useFileRepoPaginationState = () => {
  const [pagingState, setPagingState] = useState({
    pageSize: DEFAULT_PAGE_SIZE,
    page: DEFAULT_PAGE_OFFSET,
    sort: DEFAULT_SORT,
  });

  useEffect(() => {
    resetCurrentPage();
  }, [pagingState.pageSize]);

  const handlePagingStateChange = (state: typeof pagingState) => {
    setPagingState(state);
  };

  const onPageChange = (newPageNum: number) => {
    handlePagingStateChange({ ...pagingState, page: newPageNum });
  };

  const onPageSizeChange = (newPageSize: number) => {
    handlePagingStateChange({
      ...pagingState,
      pageSize: newPageSize,
    });
  };
  const onSortedChange: SortedChangeFunction = async (newSorted: FileRepositorySortingRule[]) => {
    const sort = newSorted.reduce(
      (accSort: Array<FileRepositoryRecordSort>, sortRule: FileRepositorySortingRule) => {
        const order = sortRule.desc ? 'desc' : 'asc';

        // When sorting by file_id, use file_number as the sort field to make the numeric sorting work
        const sortField =
          sortRule.id === FileCentricDocumentFields.file_id
            ? FileCentricDocumentFields.file_number
            : sortRule.id;

        return accSort.concat({
          field: sortField,
          order: order,
        });
      },
      [],
    );
    handlePagingStateChange({ ...pagingState, sort });
  };
  const resetCurrentPage = () => {
    setPagingState({
      ...pagingState,
      page: 0,
    });
  };
  return {
    pagingState,
    onPageChange,
    onPageSizeChange,
    onSortedChange,
    resetCurrentPage,
  };
};

const FileTable = () => {
  const { FEATURE_DONOR_ENTITY_ENABLED, FEATURE_PROGRAM_ENTITY_ENABLED } = getConfig();

  const { filters } = useFiltersContext();
  const theme = useTheme();

  const { data: fieldDisplayNames } = useFileCentricFieldDisplayName();

  const { pagingState, onPageChange, onPageSizeChange, onSortedChange, resetCurrentPage } =
    useFileRepoPaginationState();
  useEffect(() => {
    resetCurrentPage();
  }, [filters]);

  const offset = pagingState.pageSize * pagingState.page;
  const { data: records, loading = true } = useFileRepoTableQuery(
    pagingState.pageSize,
    offset,
    pagingState.sort,
    filters,
  );

  const totalEntries = records ? records.file.hits.total : 0;
  const pageCount = Math.ceil(totalEntries / pagingState.pageSize);

  const tableColumns: Array<
    TableColumnConfig<FileRepositoryRecord> & { id: FileCentricDocumentField }
  > = [
    {
      Header: 'File ID',
      headerClassName: pagingState.sort == DEFAULT_SORT ? '-sort-desc' : '',
      id: FileCentricDocumentFields.file_id,
      accessor: 'fileId',
      Cell: ({ original }: { original: FileRepositoryRecord }) => {
        return (
          <NextLink
            href={FILE_ENTITY_PATH}
            as={FILE_ENTITY_PATH.replace(FILE_ENTITY_ID_PATH, original.fileId)}
            passHref
          >
            <Link>{original.fileId}</Link>
          </NextLink>
        );
      },
    },
    {
      Header: fieldDisplayNames['donors.donor_id'],
      id: FileCentricDocumentFields['donors.donor_id'],
      accessor: 'donorId',
      Cell: ({ original }: { original: FileRepositoryRecord }) => {
        return FEATURE_DONOR_ENTITY_ENABLED ? (
          <NextLink
            href={DONOR_ENTITY_PATH}
            as={DONOR_ENTITY_PATH.replace(DONOR_ENTITY_ID_PATH, original.donorId)}
            passHref
          >
            <Link>{original.donorId}</Link>
          </NextLink>
        ) : (
          original.donorId
        );
      },
    },
    {
      Header: fieldDisplayNames['donors.submitter_donor_id'],
      id: FileCentricDocumentFields['donors.submitter_donor_id'],
      accessor: 'submitterDonorId',
    },
    {
      Header: fieldDisplayNames['study_id'],
      id: FileCentricDocumentFields['study_id'],
      accessor: 'programId',
      Cell: ({ original }: { original: FileRepositoryRecord }) => {
        return FEATURE_PROGRAM_ENTITY_ENABLED ? (
          <NextLink
            href={PROGRAM_ENTITY_PATH}
            as={PROGRAM_ENTITY_PATH.replace(PROGRAM_ENTITY_ID_PATH, original.programId)}
            passHref
          >
            <Link>{original.programId}</Link>
          </NextLink>
        ) : (
          original.programId
        );
      },
    },
    {
      Header: fieldDisplayNames['data_type'],
      id: FileCentricDocumentFields['data_type'],
      accessor: 'dataType',
      width: 180,
    },
    {
      Header: fieldDisplayNames['file_type'],
      id: FileCentricDocumentFields['file_type'],
      accessor: 'fileType',
      width: 80,
    },
    {
      Header: fieldDisplayNames['analysis.experiment.experimental_strategy'],
      id: FileCentricDocumentFields['analysis.experiment.experimental_strategy'],
      accessor: 'experimentalStrategy',
    },
    {
      Header: fieldDisplayNames['file.size'],
      id: FileCentricDocumentFields['file.size'],
      accessor: 'size',
      Cell: ({ original }: { original: FileRepositoryRecord }) => filesize(original.size),
    },
    {
      Header: fieldDisplayNames['object_id'],
      id: FileCentricDocumentFields['object_id'],
      accessor: 'objectId',
      width: 260,
    },
    {
      Header: 'Clinical Data',
      id: FileCentricDocumentFields.has_clinical_data,
      accessor: 'hasClinicalData',
      Cell: ({ original: file }: { original: FileRepositoryRecord }) => {
        return file.hasClinicalData ? 'Available' : 'Not Available';
      },
    },
    // disabled for initial File Repo release
    // {
    //   Header: 'Actions',
    //   width: 80,
    //   sortable: false,
    //   Cell: ({ original }: { original: FileRepositoryRecord }) => {
    //     const downloadStatus = getDownloadStatus(original.isDownloadable);

    //     return (
    //         <div
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
    //     );
    //   },
    // },
  ];
  const containerRef = createRef<HTMLDivElement>();

  const fileRepoEntries: FileRepositoryRecord[] = records
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
        hasClinicalData: node.has_clinical_data,
        access: node.file_access,
      }))
    : [];

  const {
    allRowsSelected,
    isSelected,
    selectedRows,
    unselectedRows,
    toggleAllHandler,
    toggleHandler,
    selectionKeyField,
    selectedRowsCount,
  } = useSelectTableSelectionState<FileRepositoryRecord>({
    totalEntriesCount: totalEntries,
    selectionKeyField: 'objectId',
  });

  // When allRowsSelected is true, selectedRows is empty, so objectIds need to be populated
  const selectedFilesObjectIds = allRowsSelected
    ? fileRepoEntries.map((record) => record['objectId'])
    : selectedRows;

  const tableElement = (
    <div
      ref={containerRef}
      css={css`
        z-index: 2;
        padding-top: 10px;
      `}
    >
      <SelectTable
        manual
        loading={loading}
        keyField={selectionKeyField}
        parentRef={containerRef}
        columns={tableColumns}
        data={fileRepoEntries}
        isSelected={isSelected}
        toggleSelection={toggleHandler}
        toggleAll={toggleAllHandler}
        selectAll={allRowsSelected}
        page={pagingState.page}
        pages={pageCount}
        pageSize={pagingState.pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={onSortedChange}
        showPagination
      />
    </div>
  );

  const startRowDisplay = pagingState.pageSize * pagingState.page + 1;
  const endRowDisplay = Math.min(pagingState.pageSize * (pagingState.page + 1), totalEntries);

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
                {`${startRowDisplay.toLocaleString()}-${endRowDisplay.toLocaleString()} of ${totalEntries.toLocaleString()} ${pluralize(
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
              selectedFilesObjectIds={selectedFilesObjectIds}
              unSelectedFilesObjectIds={unselectedRows}
              selectedFilesCount={selectedRowsCount}
            />
            {/* disabled for initial File Repo release - Allows customization of shown columns */}
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
