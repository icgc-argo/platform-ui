export type FileRepositoryRecord = {
  fileID: string;
  donorID: string;
  program: { shortName: string; fullName: string };
  dataType: string;
  strategy: string;
  format: string;
  size: number; //in bytes
  isDownloadable: boolean;
};
