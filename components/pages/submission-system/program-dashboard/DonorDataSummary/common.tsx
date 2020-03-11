import { DonorEntityRecord } from './types';

export const dummyDonorData: Array<DonorEntityRecord> = [
  {
    releaseState: 'FULLY',
    donorId: 'DO1 (ICGC_0001)',
    coreFields: 100,
    extendedFields: 23,
    samples: {
      normal: 1,
      tumour: 1,
    },
    rawReads: {
      normal: 1,
      tumour: 1,
    },
    alignment: {
      complete: 2,
      inProgress: 0,
      error: 0,
    },
    sangerVC: {
      complete: 1,
      inProgress: 0,
      error: 0,
    },
    processingStatus: 'Complete',
    lastUpdated: '2020/01/22',
  },
  {
    releaseState: 'FULLY',
    donorId: 'DO3 (ICGC_0003)',
    coreFields: 100,
    extendedFields: 29,
    samples: {
      normal: 2,
      tumour: 3,
    },
    rawReads: {
      normal: 2,
      tumour: 2,
    },
    alignment: {
      complete: 2,
      inProgress: 1,
      error: 1,
    },
    sangerVC: {
      complete: 1,
      inProgress: 0,
      error: 0,
    },
    processingStatus: 'Processing',
    lastUpdated: '2020/04/13',
  },
  {
    releaseState: 'PARTIALLY',
    donorId: 'DO124 (ICGC_5434)',
    coreFields: 100,
    extendedFields: 0,
    samples: {
      normal: 2,
      tumour: 0,
    },
    rawReads: {
      normal: 2,
      tumour: 2,
    },
    alignment: {
      complete: 3,
      inProgress: 1,
      error: 0,
    },
    sangerVC: {
      complete: 2,
      inProgress: 2,
      error: 0,
    },
    processingStatus: 'Processing',
    lastUpdated: '2020/03/20',
  },
  {
    releaseState: 'NO',
    donorId: 'DO129 (ICGC_0123)',
    coreFields: 10,
    extendedFields: 0,
    samples: {
      normal: 1,
      tumour: 1,
    },
    rawReads: {
      normal: 0,
      tumour: 0,
    },
    alignment: {
      complete: 0,
      inProgress: 0,
      error: 0,
    },
    sangerVC: {
      complete: 0,
      inProgress: 0,
      error: 0,
    },
    processingStatus: 'Registered',
    lastUpdated: '2020/02/25',
  },
  {
    releaseState: 'NO',
    donorId: 'DO1245 (ICGC_0124)',
    coreFields: 0,
    extendedFields: 0,
    samples: {
      normal: 1,
      tumour: 1,
    },
    rawReads: {
      normal: 1,
      tumour: 1,
    },
    alignment: {
      complete: 0,
      inProgress: 1,
      error: 1,
    },
    sangerVC: {
      complete: 0,
      inProgress: 0,
      error: 0,
    },
    processingStatus: 'Processing',
    lastUpdated: '2020/03/03',
  },
];
