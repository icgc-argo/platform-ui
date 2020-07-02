import { FileCard, getAccessIcon, DownloadIcon } from '../common';

import { css } from '@emotion/core';
import Button from 'uikit/Button';

import { FileRecord } from '../types';
import fileSize from 'filesize';
import Table, { TableColumnConfig } from 'uikit/Table';
import React from 'react';
import Typography from 'uikit/Typography';
import Link from 'uikit/Link';

export default ({ data }: { data: Array<FileRecord> }) => {
  const containerRef = React.createRef<HTMLDivElement>();

  const tableColumns: Array<TableColumnConfig<FileRecord>> = [
    {
      Header: 'File ID',
      accessor: 'fileId',
      width: 160,
      Cell: ({ original }: { original: FileRecord }) => {
        return <Link href="">{original.fileId}</Link>;
      },
    },
    {
      width: 270,

      Header: 'Data Type',
      accessor: 'dataType',
    },
    {
      width: 270,
      Header: 'Analysis Workflow',
      accessor: 'analysisWorkflow',
    },
    {
      Header: 'File Format',
      accessor: 'fileFormat',
    },
    {
      Header: 'File Size',
      accessor: 'fileSize',
      Cell: ({ original }: { original: FileRecord }) => {
        return fileSize(original.fileSize);
      },
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      width: 90,

      Cell: ({ original }: { original: FileRecord }) => {
        return (
          <div
            css={css`
              display: flex;
              justify-content: center;
              width: 100%;
            `}
          >
            {getAccessIcon(original.actions)}
          </div>
        );
      },
    },
  ];
  return (
    <FileCard>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: center;
        `}
      >
        <Typography color="primary" variant="default" component="span">
          Downstream File Analysis
        </Typography>

        <Button>
          <DownloadIcon />
          MANIFEST
        </Button>
      </div>
      <div
        css={css`
          width: 100%;
          padding: 10px 0;
        `}
      >
        <Table parentRef={containerRef} showPagination={false} data={data} columns={tableColumns} />
      </div>
    </FileCard>
  );
};
