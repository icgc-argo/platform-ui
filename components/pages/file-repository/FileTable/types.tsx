export type FileRepositoryRecord = {
  fileID: String;
  donorID: String;
  program: { shortName: String; fullName: String };
  dataType: FileDataNames;
  strategy: FileStrategyNames;
  format: FileFormatNames;
  size: number; //in bytes
  isDownloadable: boolean;
};

export enum FileDataNames {
  ALIGNED_READS = 'Aligned Reads',
  UNALIGNED_READS = 'Unaligned Reads',
  SSM = 'SSM',
}
export enum FileStrategyNames {
  WXS = 'WXS',
  WGS = 'WGS',
  SSM = 'SSM',
}

export enum FileFormatNames {
  FASTQ = 'FASTQ',
}
