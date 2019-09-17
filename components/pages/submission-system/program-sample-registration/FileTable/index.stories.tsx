
import { storiesOf } from '@storybook/react';
import React from 'react';
import FileTable from '.';

const records = [
  {
    program_id: 'PROGRAM_ID_1',
    donor_submitter_id: 'ICGC_1234',
    gender: 'Female',
    specimen_submitter_id: '12345',
    specimen_type: 'Solid tissue',
    tumour_normal_designation: 'Normal - tissue adjacent to primary tumour',
    sample_submitter_id: '1234567',
    sample_type: 'Total DNA',
  },
  {
    program_id: 'PROGRAM_ID_2',
    donor_submitter_id: 'ICGC_1234',
    gender: 'Female',
    specimen_submitter_id: '67891',
    specimen_type: 'Solid tissue',
    tumour_normal_designation: 'Metastatic tumour - metastasis to distant location',
    sample_submitter_id: '1234567',
    sample_type: 'Total DNA',
  },
];

const FileTableStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => {
    return (
      <FileTable
        records={records}
        submissionInfo={{
          fileName: 'registration_schrodinger.tsv',
          creator: 'Schrodinger Submitter',
          createdAt: 'May 20, 2020',
        }}
        stats={{
          newCount: 2,
          existingCount: 2,
        }}
        records={records.map((record, i) => ({
          ...record,
          row: `${i}`,
          isNew: true,
        }))}
      >
        Skeleton
      </FileTable>
    );
  })
  .add('No data', () => (
    <FileTable submissionInfo={null} stats={null} records={[]}>
      Skeleton
    </FileTable>
  ));

export default FileTableStories;
