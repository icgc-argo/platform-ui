import { Row, Col } from 'react-grid-system';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import FileSummary from './FileSummary';

import DataAndAnalysis from './DataAndAnalysis';
import AssociatedDonors from './AssociatedDonors';
import DownstreamAnalysis from './DownstreamAnalysis';
import { FileEntityData } from './types';

const PaddedRow = styled(Row)`
  padding-bottom: 8px;
`;

const PaddedColumn = styled(Col)`
  padding-bottom: 8px;
`;

const FileCardsLayout: React.ComponentType<{
  fileData: FileEntityData;
}> = ({ fileData }) => {
  return (
    <div
      css={css`
        margin: 0 5%;
      `}
    >
      <PaddedRow>
        <PaddedColumn md={6} sm={12}>
          <FileSummary data={fileData.summary} />
        </PaddedColumn>
        <PaddedColumn md={6} sm={12}>
          <DataAndAnalysis data={fileData.dataAnalysis} />
        </PaddedColumn>
      </PaddedRow>
      <PaddedRow>
        <PaddedColumn>
          <AssociatedDonors donors={fileData.donorRecords} />
        </PaddedColumn>
      </PaddedRow>
      <PaddedRow>
        <PaddedColumn>
          <DownstreamAnalysis data={fileData.fileRecords} />
        </PaddedColumn>
      </PaddedRow>
    </div>
  );
};

export default FileCardsLayout;
