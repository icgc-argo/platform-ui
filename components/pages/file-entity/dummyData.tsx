import {
  FileSummaryInfo,
  FileAccessState,
  DataAnalysisInfo,
  DonorRecord,
  FileRecord,
} from './types';

export const dummyFileSummaryInfo: FileSummaryInfo = {
  fileId: 'FL9991',
  objectId: '6329334b-dcd5-53c8-98fd-9812ac386d30',
  fileFormat: 'FASTQ',
  size: 7720000,
  access: FileAccessState.CONTROLLED,
  program: 'Pancreatic Cancer - CA (PACA-CA) ',
  checksum: 'f9a309cc2f08e9c5ceead501594f2dfe',
  repoName: 'Collaboratory - Toronto, AWS - Virginia',
  repoCountry: 'Canada, United States',
};

export const dummyDataAnalysisInfo: DataAnalysisInfo = {
  experimentalStrategy: 'WGS',
  dataType: 'Aligned Reads',
  platform: 'Illumina',
  genomeBuild: 'GRCh38',
  workflowType: 'DNA seq alignment',
  software: 'BWA MEM',
};

export const dummyAssociatedDonorsInfo: Array<DonorRecord> = [
  {
    donorId: 'DO9991',
    submitterDonorId: 'ICGC_71',
    primarySite: 'Pancreas',
    cancerType: 'Pancreatic Cancer',
    ageAtDiagnosis: '67 years',
    associations: {
      specimenId: 'SP9991',
      tumourNormalDesignation: 'Tumour',
      sampleId: 'SA9991',
      sampleType: 'Total DNA',
      matchedNormalSampleId: 'SP9934',
    },
  },
  {
    donorId: 'D09996',
    submitterDonorId: 'ICGC_51',
    primarySite: 'Brain',
    cancerType: 'Brain Cancer',
    ageAtDiagnosis: '58 years',
    associations: {
      specimenId: 'SP9996',
      tumourNormalDesignation: 'Normal',
      sampleId: 'SA9996',
      sampleType: 'Total DNA',
      matchedNormalSampleId: 'SP9938',
    },
  },
];

export const dummyFileRecords: Array<FileRecord> = [
  {
    fileId: 'FL10292',
    dataType: 'miRNA Expression Quantification',
    analysisWorkflow: 'BCGSC miRNA Profiling',
    fileFormat: 'TXT',
    fileSize: 50840,
    actions: FileAccessState.CONTROLLED,
  },
  {
    fileId: 'FL10122',
    dataType: 'Isoform Expression Quantification',
    analysisWorkflow: 'VarScan2 Variant Aggregation and Masking',
    fileFormat: 'TXT',
    fileSize: 242830,
    actions: FileAccessState.CONTROLLED,
  },
];
