import { FileCard, TableDiv, getAccessIcon } from '../common';
import { css } from '@emotion/core';
import SimpleTable from 'uikit/Table/SimpleTable';

import { FileSummaryInfo, FileAccessState } from '../types';
import fileSize from 'filesize';

export default ({ data }: { data: FileSummaryInfo }) => {
  const tableData = {
    'File ID': data.fileId,
    'Object ID': data.objectId,
    'File Format': data.fileFormat,
    Size: fileSize(data.size),
    Access: (
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <>{getAccessIcon(data.access)}</>
        <>{data.access}</>
      </div>
    ),
    Program: data.program,
    'MD5 Checksum': data.checksum,
    'Repository Name': data.repoName,
    'Repository Country': data.repoCountry,
  };

  return (
    <FileCard cardTitle="File Summary">
      <TableDiv>
        <SimpleTable data={tableData} />
      </TableDiv>
    </FileCard>
  );
};
