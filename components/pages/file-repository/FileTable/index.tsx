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
import Link from 'next/link';
import HyperLink from 'uikit/Link';
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
import pluralize from 'pluralize';

export default ({
  fileRepoEntries,
  userLoggedIn,
  initialPageSize = 20,
  initalPages,
}: {
  fileRepoEntries: Array<FileRepositoryRecord>;
  userLoggedIn: Boolean;
  initialPageSize?: number;
  initalPages?: number;
}) => {
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
    const canUserDownload = userLoggedIn && isDownloadable;
    const toolTipText = userLoggedIn
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
      Cell: ({ original }: { original: FileRepositoryRecord }) => {
        return (
          <Link href="">
            <HyperLink>{`${original.fileID}`}</HyperLink>
          </Link>
        );
      },
    },
    {
      Header: 'Donor ID',
      accessor: 'donorID',
      Cell: ({ original }: { original: FileRepositoryRecord }) => {
        return (
          <Link href="">
            <HyperLink>{`${original.donorID}`}</HyperLink>
          </Link>
        );
      },
    },
    {
      Header: 'Program',
      id: 'programShortName',
      accessor: d => d.program.shortName,
      Cell: ({ original }: { original: FileRepositoryRecord }) => (
        <Tooltip unmountHTMLWhenHide position="top" html={<span>{original.program.fullName}</span>}>
          {original.program.shortName}
        </Tooltip>
      ),
    },
    {
      Header: 'Data Type',
      accessor: 'dataType',
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

  const numFiles = fileRepoEntries.length;
  const [pagingState, setPagingState] = React.useState({
    pageSize: initialPageSize,
    page: 0,
    pages: initalPages || Math.ceil(numFiles / initialPageSize),
  });

  const handlePagingStateChange = (state: typeof pagingState) => {
    setPagingState(state);
  };

  const onPageChange = (newPageNum: number) => {
    handlePagingStateChange({ ...pagingState, page: newPageNum });
  };

  const onPageSizeChange = (newPageSize: number) => {
    handlePagingStateChange({
      page: 0,
      pageSize: newPageSize,
      pages: Math.ceil(numFiles / newPageSize),
    });
  };

  const tableElement = (
    <div
      ref={containerRef}
      css={css`
        z-index: 2;
        padding-top: 10px;
      `}
    >
      <SelectTable
        keyField="fileID"
        parentRef={containerRef}
        showPagination={true}
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
  const endRowDisplay = Math.min(pagingState.pageSize * (pagingState.page + 1), numFiles);

  return (
    <Container
      css={css`
        padding: 10px;
      `}
    >
      {numFiles > 0 && (
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
                {`${startRowDisplay}-${endRowDisplay} of ${pluralize('file', numFiles, true)}`}
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
