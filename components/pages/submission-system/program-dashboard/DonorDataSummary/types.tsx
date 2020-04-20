export type DonorSummaryRecord = {
  releaseStatus: DonorDataReleaseState;
  donorId: string;
  submitterDonorId: string;
  submittedCoreDataPercent: number;
  submittedExtendedDataPercent: number;
  registeredNormalSamples: number;
  registeredTumourSamples: number;
  publishedNormalAnalysis: number;
  publishedTumourAnalysis: number;
  alignmentsCompleted: number;
  alignmentsRunning: number;
  alignmentsFailed: number;
  sangerVcsCompleted: number;
  sangerVcsRunning: number;
  sangerVcsFailed: number;
  processingStatus: MolecularProcessingStatus;
  updatedAt: Date | String;
};

export type ProgoramDonorReleasStats = {
  registeredDonorsCount: number;
  fullyReleasedDonorsCount: number;
  partiallyReleasedDonorsCount: number;
  noReleaseDonorsCount: number;
};

export enum DonorDataReleaseState {
  FULLY = 'FULLY_RELEASED',
  PARTIALLY = 'PARTIALLY_RELEASED',
  NO = 'NO_RELEASE',
}
export enum MolecularProcessingStatus {
  COMPLETE = 'COMPLETE',
  PROCESSING = 'PROCESSING',
  REGISTERED = 'REGISTERED',
}

// **** GQL types ****
export type ProgramDonorsSummaryQueryData = {
  programDonorSummaryEntries: DonorSummaryRecord[];
  programDonorSummaryStats: ProgoramDonorReleasStats;
};

export type ProgramDonorsSummaryQueryVariables = {
  programShortName: string;
  first: number;
  offset: number;
  sorts: DonorSummaryEntrySort[];
};

export type DonorSummaryEntrySort = {
  field: DonorSummaryEntrySortField;
  order: DonorSummaryEntrySortOrder;
};

export type DonorSummaryEntrySortField = keyof DonorSummaryRecord;
export type DonorSummaryEntrySortOrder = 'asc' | 'desc';
