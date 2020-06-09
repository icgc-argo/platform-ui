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
import { SelectTable, TableColumnConfig } from 'uikit/Table';
import Tooltip from 'uikit/Tooltip';
import { FileRepositoryRecord } from './types';
import filesize from 'filesize';
import InteractiveIcon from 'uikit/Table/InteractiveIcon';
import { css } from '@emotion/core';
import DropdownButton from 'uikit/DropdownButton';
import {
  instructionBoxButtonContentStyle,
  instructionBoxButtonIconStyle,
} from '../../submission-system/common';
import Container from 'uikit/Container';
import Typography from 'uikit/Typography';
import Icon from 'uikit/Icon';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import FILE_REPOSITORY_TABLE_QUERY from './FILE_REPOSITORY_TABLE_QUERY.gql';
import useFiltersContext from '../hooks/useFiltersContext';
import useAuthContext from 'global/hooks/useAuthContext';
import pluralize from 'pluralize';
import { FileRepoFiltersType } from '../utils/types';

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE_OFFSET = 0;

const useFileRepoTableQuery = (
  first: number,
  offset: number,
  filters: FileRepoFiltersType,
  // sorts: any[],
  options: Omit<QueryHookOptions<any, any>, 'variables'> = {},
) => {
  const hook = useQuery<any, any>(FILE_REPOSITORY_TABLE_QUERY, {
    ...options,
    variables: {
      first,
      offset,
      filters,
    },
  });

  return {
    ...hook,
    data: hook.data,
  };
};
export default () => {
  const { token } = useAuthContext();
  const { filters } = useFiltersContext();
  const [pagingState, setPagingState] = React.useState({
    pageSize: DEFAULT_PAGE_SIZE,
    page: DEFAULT_PAGE_OFFSET,
    pages: 1,
  });
  const offset = pagingState.pageSize * pagingState.page;
  const first = pagingState.pageSize;
  // const sorts = pagingState.sorts;

  const { data, loading = true } = useQuery<any, any>(FILE_REPOSITORY_TABLE_QUERY, {
    variables: {
      first,
      offset,
      filters,
    },
    onCompleted: () => {
      setPagingState({
        ...pagingState,
        pages: Math.ceil(data.file.hits.total / pagingState.pageSize),
      });
    },
  });

  const totalEntries = data ? data.file.hits.total : 0;
  // const initialPages = !loading ? Math.ceil(totalEntries / DEFAULT_PAGE_SIZE) : 1;

  const handlePagingStateChange = (state: typeof pagingState) => {
    setPagingState(state);
  };

  const onPageChange = (newPageNum: number) => {
    handlePagingStateChange({ ...pagingState, page: newPageNum });
  };

  const onPageSizeChange = (newPageSize: number) => {
    handlePagingStateChange({
      ...pagingState,
      page: 0,
      pageSize: newPageSize,
      pages: Math.ceil(totalEntries / newPageSize),
    });
  };

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [allRowsSelected, setAllRowsSelected] = React.useState(false);
  const toggleHandler = (fileID: String) => {
    if (selectedRows.includes(fileID)) {
      const newSelectionState = selectedRows.filter(selection => selection !== fileID);
      setSelectedRows(newSelectionState);
    } else {
      setSelectedRows(prevSelected => [...prevSelected, fileID]);
    }
  };
  const toggleAllHandler = () => {
    if (!allRowsSelected) {
      const newSelectionState = fileRepoEntries.map(entry => `select-${entry.fileID}`);
      setSelectedRows(newSelectionState);
    } else {
      setSelectedRows([]);
    }
    setAllRowsSelected(!allRowsSelected);
  };
  const fileDownloader = (fileID: String) => {
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
  const tableColumns: Array<TableColumnConfig<FileRepositoryRecord>> = [
    {
      Header: 'File ID',
      accessor: 'fileID',
      Cell: ({ original }: { original: FileRepositoryRecord }) => original.fileID,
    },
    {
      Header: 'Donor ID',
      accessor: 'donorID',
      Cell: ({ original }: { original: FileRepositoryRecord }) => original.donorID,
    },
    {
      Header: 'Program',
      id: 'programShortName',
      accessor: d => d.program.shortName,
      Cell: ({ original }: { original: FileRepositoryRecord }) => original.program.shortName,
    },
    {
      Header: 'Data Type',
      accessor: 'dataType',
      Cell: ({ original }: { original: FileRepositoryRecord }) => original.dataType,
    },
    {
      Header: 'Strategy',
      accessor: 'strategy',
    },
    {
      Header: 'Format',
      accessor: 'format',
    },
    {
      Header: 'Size',
      accessor: 'size',
      Cell: ({ original }: { original: FileRepositoryRecord }) => filesize(original.size),
    },
    {
      Header: 'Actions',
      width: 80,
      sortable: false,
      Cell: ({ original }: { original: FileRepositoryRecord }) => {
        const downloadStatus = getDownloadStatus(original.isDownloadable);

        return (
          <Tooltip
            unmountHTMLWhenHide
            position="left"
            html={<span>{downloadStatus.toolTipText}</span>}
            css={css`
              width: 100%;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
              `}
            >
              <InteractiveIcon
                disabled={!downloadStatus.canUserDownload}
                height="16px"
                width="16px"
                name={downloadStatus.canUserDownload ? 'download' : 'lock'}
                fill={downloadStatus.canUserDownload ? 'accent2_dark' : 'primary_2'}
                onClick={e => fileDownloader(original.fileID)}
              />
            </div>
          </Tooltip>
        );
      },
    },
  ];
  const containerRef = React.createRef<HTMLDivElement>();

  const fileRepoEntries = data
    ? data.file.hits.edges.map(({ node }) => ({
        fileID: node.object_id,
        donorID: node.donors.hits.edges[0].node.donor_id,
        program: { shortName: node.study_id, fullName: node.study_id },
        dataType: node.data_type,
        // TODO: this field name will need to be changed https://github.com/icgc-argo/argo-metadata-schemas/issues/32
        strategy: node.analysis.experiment.library_strategy,
        format: node.file_type,
        size: node.file.size,
        isDownloadable: false, // mocked, column will be temporarily hidden in https://github.com/icgc-argo/platform-ui/issues/1553
      }))
    : [];

  const tableElement = (
    <div
      ref={containerRef}
      css={css`
        z-index: 2;
        padding-top: 10px;
      `}
    >
      <SelectTable
        loading={loading}
        keyField="fileID"
        parentRef={containerRef}
        columns={tableColumns}
        data={fileRepoEntries}
        isSelected={key => {
          // react table prepends the word `select-` to the selected keys
          return selectedRows.includes(`select-${key}`);
        }}
        toggleSelection={fileID => toggleHandler(fileID)}
        toggleAll={() => toggleAllHandler()}
        selectAll={allRowsSelected}
        page={pagingState.page}
        pages={pagingState.pages}
        pageSize={pagingState.pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
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
            </div>
          </div>
          <div
            css={css`
              display: flex;
            `}
          >
            <DropdownButton
              css={css`
                margin-right: 8px;
              `}
              variant="secondary"
              size="sm"
              onItemClick={item => null}
              menuItems={[
                {
                  display: 'Clinical Data',
                  value: 'Clinical Data',
                },
                {
                  display: 'File Manifest',
                  value: 'File Manifest',
                },
                {
                  display: 'File Table',
                  value: 'File Table',
                },
              ]}
            >
              <span css={instructionBoxButtonContentStyle}>
                <Icon
                  name="download"
                  fill="accent2_dark"
                  height="12px"
                  css={instructionBoxButtonIconStyle}
                />
                Download
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
            <DropdownButton
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
            </DropdownButton>
          </div>
        </div>
      )}
      {tableElement}
    </Container>
  );
};
