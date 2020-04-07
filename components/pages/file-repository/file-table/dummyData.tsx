import { FileRepositoryRecord, FileDataNames, FileStrategyNames, FileFormatNames } from './types';

import { sample } from 'lodash';

const idmaker = () => `FL${Math.floor(1000 + Math.random() * 9000)}`;
export const dummyExamples: Array<FileRepositoryRecord> = [
  {
    fileID: 'FL9951',
    donorID: 'DO9980',
    program: { shortName: 'BRCA-MX', fullName: 'Brain Cancer Mexico' },
    dataType: FileDataNames.ALIGNED_READS,
    strategy: FileStrategyNames.WXS,
    format: FileFormatNames.FASTQ,
    size: 129580000,
  },
  {
    fileID: 'FL9981',
    donorID: 'DO9981',
    program: { shortName: 'BRCA-US', fullName: 'Brain Cancer USA' },
    dataType: FileDataNames.SSM,
    strategy: FileStrategyNames.WGS,
    format: FileFormatNames.FASTQ,
    size: 7695800000,
  },
  {
    fileID: 'FL9980',
    donorID: 'DO9982',
    program: { shortName: 'CESC-US', fullName: 'center for eccentric scientific children' },
    dataType: FileDataNames.ALIGNED_READS,
    strategy: FileStrategyNames.WXS,
    format: FileFormatNames.FASTQ,
    size: 121130000,
  },
];

export let dummyData = [];
for (let i = 0; i < 100; i++) {
  dummyData.push({ ...sample(dummyExamples), fileID: idmaker() });
}
