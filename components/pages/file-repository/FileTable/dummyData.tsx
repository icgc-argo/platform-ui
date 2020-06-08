import { FileRepositoryRecord } from './types';

import { sample } from 'lodash';

const idmaker = () => `FL${Math.floor(1000 + Math.random() * 9000)}`;
export const dummyExamples: Array<FileRepositoryRecord> = [
  {
    fileID: 'FL9951',
    donorID: 'DO9980',
    program: { shortName: 'BRCA-MX', fullName: 'Brain Cancer Mexico' },
    dataType: 'Aligned Reads',
    strategy: 'WXS',
    format: 'FASTQ',
    size: 129580000,
    isDownloadable: true,
  },
  {
    fileID: 'FL9981',
    donorID: 'DO9981',
    program: { shortName: 'BRCA-US', fullName: 'Brain Cancer USA' },
    dataType: 'SSM',
    strategy: 'WGS',
    format: 'FASTQ',
    size: 7695800000,
    isDownloadable: false,
  },
  {
    fileID: 'FL9980',
    donorID: 'DO9982',
    program: { shortName: 'CESC-US', fullName: 'center for eccentric scientific children' },
    dataType: 'Aligned Reads',
    strategy: 'WXS',
    format: 'FASTQ',
    size: 121130000,
    isDownloadable: true,
  },
];

export let dummyData = [];
for (let i = 0; i < 100; i++) {
  dummyData.push({ ...sample(dummyExamples), fileID: idmaker() });
}
