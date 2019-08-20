// @flow
import { storiesOf } from '@storybook/react';
import React from 'react';
import FilesTable from '.';

const FilesTableStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const records = [
    {
      program_id: 'WP-CPMP-US',
      donor_submitter_id: 'ICGC_0346',
      gender: 'Female',
      specimen_submitter_id: '8068578',
      specimen_type: 'Solid tissue',
      tumour_normal_designation: 'Normal - tissue adjacent to primary tumour',
      sample_submitter_id: '8068578',
      sample_type: 'Total DNA',
    },
    {
      program_id: 'WP-CPMP-US',
      donor_submitter_id: 'ICGC_0346',
      gender: 'Female',
      specimen_submitter_id: '8065643',
      specimen_type: 'Solid tissue',
      tumour_normal_designation: 'Metastatic tumour - metastasis to distant location',
      sample_submitter_id: '8065643',
      sample_type: 'Total DNA',
    },
  ];
  const stats = {
    totalCount: 2,
    newCount: 2,
    existingCount: 2,
  };
  return (
    <FilesTable
      registrationId="string"
      programId="string"
      creator="string"
      createdAt="string"
      updatedAt="string"
      stats={stats}
      data={records.map((record, i) => ({
        ...record,
        row: `${i}`,
        isNew: true,
      }))}
      tableColumns={Object.entries(records[0]).map(([key, value]) => ({
        accessor: key,
        Header: key,
        keyString: key,
      }))}
    >
      Skeleton
    </FilesTable>
  );
});

export default FilesTableStories;
