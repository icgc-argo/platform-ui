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

import React from 'react';
import { SelectTable, TableColumnConfig, useSelectTableSelectionState } from 'uikit/Table';
import {
  FileRepositoryRecord,
  FileRepositoryTableQueryData,
  FileRepositoryTableQueryVariables,
  FileRepositoryRecordSort,
  FileRepositoryRecordSortOrder,
  FileRepositorySortingRule,
} from './types';
import filesize from 'filesize';
import InteractiveIcon from 'uikit/Icon/InteractiveIcon';
import { css } from '@emotion/core';
import DropdownButton from 'uikit/DropdownButton';
import Container from 'uikit/Container';
import Typography from 'uikit/Typography';
import Icon from 'uikit/Icon';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import FILE_REPOSITORY_TABLE_QUERY from './FILE_REPOSITORY_TABLE_QUERY.gql';
import useFiltersContext from '../hooks/useFiltersContext';
import useAuthContext from 'global/hooks/useAuthContext';
import pluralize from 'pluralize';
import { FileRepoFiltersType } from '../utils/types';
import { SortedChangeFunction } from 'react-table';
import { useTheme } from 'uikit/ThemeProvider';
import TsvDownloadButton from './TsvDownloadButton';
import useFileCentricFieldDisplayName from '../hooks/useFileCentricFieldDisplayName';
import { FileCentricDocumentField } from '../types';
import A from 'uikit/Link';
import Link from 'next/link';
import { FILE_ENTITY_ID_PATH, FILE_ENTITY_PATH } from 'global/constants/pages';
import { config } from '@storybook/addon-actions';
import { getConfig } from 'global/config';

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE_OFFSET = 0;
const DEFAULT_SORT = [
  {
    field: FileCentricDocumentField.object_id,
    order: 'asc' as FileRepositoryRecordSortOrder,
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
  return useQuery<FileRepositoryTableQueryData, FileRepositoryTableQueryVariables>(
    FILE_REPOSITORY_TABLE_QUERY,
    {
      ...options,
      variables: {
        first,
        offset,
        filters,
        sort,
      },
    },
  );
};

const useFileRepoPaginationState = () => {
  const [pagingState, setPagingState] = React.useState({
    pageSize: DEFAULT_PAGE_SIZE,
    page: DEFAULT_PAGE_OFFSET,
    sort: DEFAULT_SORT,
  });

  React.useEffect(() => {
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
        return accSort.concat({
          field: sortRule.id as FileCentricDocumentField,
          order: order as FileRepositoryRecordSortOrder,
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

export default () => {
  const { FEATURE_FILE_ENTITY_ENABLED } = getConfig();

  const { token } = useAuthContext();
  const { filters } = useFiltersContext();
  const theme = useTheme();

  const { data: fieldDisplayNames } = useFileCentricFieldDisplayName();

  const {
    pagingState,
    onPageChange,
    onPageSizeChange,
    onSortedChange,
    resetCurrentPage,
  } = useFileRepoPaginationState();
  React.useEffect(() => {
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

  const fileDownloader = (objectId: String) => {
    //todo
  };

  const getDownloadStatus = (isDownloadable: boolean) => {
    const canUserDownload = token && isDownloadable;
    const toolTipText = token
      ? isDownloadable
        ? 'Download file'
        : 'You do not have permission to download this file'
      : 'Please log in to access controlled files';
    return { canUserDownload, toolTipText };
  };
  const tableColumns: Array<
    TableColumnConfig<FileRepositoryRecord> & { id: FileCentricDocumentField }
  > = [
    {
      Header: fieldDisplayNames['object_id'],
      id: FileCentricDocumentField['object_id'],
      accessor: 'objectId',
      width: 260,
      Cell: ({ original }: { original: FileRepositoryRecord }) => {
        return FEATURE_FILE_ENTITY_ENABLED ? (
          <Link
            href={FILE_ENTITY_PATH}
            as={FILE_ENTITY_PATH.replace(FILE_ENTITY_ID_PATH, original.objectId)}
            passHref
          >
            <A>{original.objectId}</A>
          </Link>
        ) : (
          original.objectId
        );
      },
    },
    {
      Header: fieldDisplayNames['donors.donor_id'],
      id: FileCentricDocumentField['donors.donor_id'],
      accessor: 'donorId',
    },
    {
      Header: fieldDisplayNames['donors.submitter_donor_id'],
      id: FileCentricDocumentField['donors.submitter_donor_id'],
      accessor: 'submitterDonorId',
    },
    {
      Header: fieldDisplayNames['study_id'],
      id: FileCentricDocumentField['study_id'],
      accessor: 'programId',
    },
    {
      Header: fieldDisplayNames['data_type'],
      id: FileCentricDocumentField['data_type'],
      accessor: 'dataType',
      width: 180,
    },
    {
      Header: fieldDisplayNames['file_type'],
      id: FileCentricDocumentField['file_type'],
      accessor: 'fileType',
      width: 80,
    },
    {
      Header: fieldDisplayNames['analysis.experiment.experimental_strategy'],
      id: FileCentricDocumentField['analysis.experiment.experimental_strategy'],
      accessor: 'experimentalStrategy',
    },
    {
      Header: fieldDisplayNames['file.size'],
      id: FileCentricDocumentField['file.size'],
      accessor: 'size',
      Cell: ({ original }: { original: FileRepositoryRecord }) => filesize(original.size),
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
  const containerRef = React.createRef<HTMLDivElement>();

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
        fileType: node.file_type,
        size: node.file.size,
        isDownloadable: false, // mocked, column will be temporarily hidden in https://github.com/icgc-argo/platform-ui/issues/1553
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
                {`${startRowDisplay}-${endRowDisplay} of ${pluralize('file', totalEntries, true)}`}
              </Typography>
              <Typography variant="data" color={theme.colors.secondary_dark}>
                {!!selectedRowsCount &&
                  ` (${selectedRowsCount} ${pluralize('file', selectedRowsCount)} selected)`}
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
