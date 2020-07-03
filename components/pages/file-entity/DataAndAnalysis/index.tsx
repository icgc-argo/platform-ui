import { FileCard, TableDiv } from '../common';

import SimpleTable from 'uikit/Table/SimpleTable';

import { DataAnalysisInfo } from '../types';

export default ({ data }: { data: DataAnalysisInfo }) => {
  const tableData = {
    'Experimental Strategy': data.experimentalStrategy,
    'Data Type': data.dataType,
    Platform: data.platform,
    'Genome Build': data.genomeBuild,
    'Workflow Type': data.workflowType,
    Software: data.software,
  };

  return (
    <FileCard cardTitle="Data & Analysis Information">
      <TableDiv>
        <SimpleTable data={tableData} />
      </TableDiv>
    </FileCard>
  );
};
