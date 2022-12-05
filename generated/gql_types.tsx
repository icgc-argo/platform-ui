export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  JSON: any;
  Upload: any;
};

export type AccessKey = {
  __typename?: 'AccessKey';
  error?: Maybe<Scalars['String']>;
  /** Time till expiry in milliseconds */
  exp?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['String']>;
};

/** ########## QUERY TYPES ########### */
export type AggState = {
  __typename?: 'AggState';
  active?: Maybe<Scalars['Boolean']>;
  field?: Maybe<Scalars['String']>;
  show?: Maybe<Scalars['Boolean']>;
  /** @deprecated This field is deprecated in favour of client-side deduction of the type using the es mapping and @arranger/mapping-utils/esToAggTypeMap. This computation will already be done with @Arranger/components. Projects created with 0.4.6 will return null for this query */
  type?: Maybe<Scalars['String']>;
};

/** ########## INPUT TYPES ########### */
export type AggStateInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  field?: InputMaybe<Scalars['String']>;
  show?: InputMaybe<Scalars['Boolean']>;
};

export type Aggregations = {
  __typename?: 'Aggregations';
  bucket_count?: Maybe<Scalars['Int']>;
  buckets?: Maybe<Array<Maybe<Bucket>>>;
  cardinality?: Maybe<Scalars['Int']>;
};

export type AggregationsBucketsArgs = {
  max?: InputMaybe<Scalars['Int']>;
};

export type AggregationsCardinalityArgs = {
  precision_threshold?: InputMaybe<Scalars['Int']>;
};

export type AggsState = {
  __typename?: 'AggsState';
  state?: Maybe<Array<Maybe<AggState>>>;
  timestamp?: Maybe<Scalars['String']>;
};

/** Date range aggregations for a given donor field. */
export type AnalysisObject = {
  __typename?: 'AnalysisObject';
  buckets?: Maybe<Array<Maybe<DateRangeBucket>>>;
  title?: Maybe<DonorField>;
};

export type Bucket = {
  __typename?: 'Bucket';
  doc_count?: Maybe<Scalars['Int']>;
  filter_by_term?: Maybe<Scalars['JSON']>;
  key?: Maybe<Scalars['String']>;
  key_as_string?: Maybe<Scalars['String']>;
  top_hits?: Maybe<Scalars['JSON']>;
};

export type BucketFilter_By_TermArgs = {
  filter?: InputMaybe<Scalars['JSON']>;
};

export type BucketTop_HitsArgs = {
  _source?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  size?: InputMaybe<Scalars['Int']>;
};

/** Collated Clinical Data Query Response */
export type ClinicalData = {
  __typename?: 'ClinicalData';
  clinicalEntities: Array<Maybe<ClinicalDataEntities>>;
  clinicalErrors?: Maybe<Array<Maybe<ClinicalErrors>>>;
  completionStats?: Maybe<Array<Maybe<CompletionStats>>>;
  programShortName: Scalars['String'];
};

/** Submitted Program Clinical Data arranged by Entity type */
export type ClinicalDataEntities = {
  __typename?: 'ClinicalDataEntities';
  completionStats?: Maybe<Array<Maybe<CompletionStats>>>;
  entityFields?: Maybe<Array<Maybe<Scalars['String']>>>;
  entityName: Scalars['String'];
  records: Array<Maybe<Array<Maybe<ClinicalRecordField>>>>;
  totalDocs: Scalars['Int'];
};

export type ClinicalEntityError = {
  donorId: Scalars['String'];
  field: Scalars['String'];
  message: Scalars['String'];
  row: Scalars['Int'];
  type: Scalars['String'];
  value: Scalars['String'];
};

export type ClinicalErrorInfo = {
  __typename?: 'ClinicalErrorInfo';
  message?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Specific Error Field + Values */
export type ClinicalErrorRecord = {
  __typename?: 'ClinicalErrorRecord';
  entityName?: Maybe<Scalars['String']>;
  errorType?: Maybe<Scalars['String']>;
  fieldName?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  info?: Maybe<ClinicalErrorInfo>;
  message?: Maybe<Scalars['String']>;
};

/** Data Submission / Schema Errors for a given Donor */
export type ClinicalErrors = {
  __typename?: 'ClinicalErrors';
  donorId?: Maybe<Scalars['Int']>;
  errors?: Maybe<Array<Maybe<ClinicalErrorRecord>>>;
  submitterDonorId?: Maybe<Scalars['String']>;
};

/** All schemas below describe clinical errors */
export type ClinicalFileError = {
  __typename?: 'ClinicalFileError';
  code: Scalars['String'];
  fileNames: Array<Maybe<Scalars['String']>>;
  message: Scalars['String'];
};

/** Query Variables for Pagination & Filtering */
export type ClinicalInput = {
  completionState?: InputMaybe<Scalars['String']>;
  donorIds?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  entityTypes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  sort?: InputMaybe<Scalars['String']>;
  submitterDonorIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** Generic schema of clinical tsv records */
export type ClinicalRecord = {
  __typename?: 'ClinicalRecord';
  fields: Array<ClinicalRecordField>;
  row: Scalars['Int'];
};

export type ClinicalRecordField = {
  __typename?: 'ClinicalRecordField';
  name: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

/**
 * It is possible for there to be no available ClinicalRegistrationData for a program,
 *   in this case the object will return with id and creator equal to null, and an empty records list.
 */
export type ClinicalRegistrationData = {
  __typename?: 'ClinicalRegistrationData';
  alreadyRegistered: ClinicalRegistrationStats;
  createdAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  errors: Array<Maybe<ClinicalRegistrationError>>;
  fileErrors?: Maybe<Array<Maybe<ClinicalFileError>>>;
  fileName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  newDonors: ClinicalRegistrationStats;
  newSamples: ClinicalRegistrationStats;
  newSpecimens: ClinicalRegistrationStats;
  programShortName?: Maybe<Scalars['ID']>;
  records: Array<Maybe<ClinicalRecord>>;
};

export type ClinicalRegistrationError = ClinicalEntityError & {
  __typename?: 'ClinicalRegistrationError';
  donorId: Scalars['String'];
  field: Scalars['String'];
  message: Scalars['String'];
  row: Scalars['Int'];
  sampleId?: Maybe<Scalars['String']>;
  specimenId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  value: Scalars['String'];
};

export type ClinicalRegistrationStatValue = {
  __typename?: 'ClinicalRegistrationStatValue';
  name: Scalars['String'];
  rows: Array<Maybe<Scalars['Int']>>;
};

export type ClinicalRegistrationStats = {
  __typename?: 'ClinicalRegistrationStats';
  count: Scalars['Int'];
  names: Array<Maybe<Scalars['String']>>;
  rows: Array<Maybe<Scalars['Int']>>;
  values: Array<Maybe<ClinicalRegistrationStatValue>>;
};

/** Clinical Data DonorId Search Query Response */
export type ClinicalSearchData = {
  __typename?: 'ClinicalSearchData';
  programShortName: Scalars['String'];
  searchResults: Array<Maybe<ClinicalSearchResults>>;
  totalResults: Scalars['Int'];
};

/** Clinical Data DonorId Search Result Record */
export type ClinicalSearchResults = {
  __typename?: 'ClinicalSearchResults';
  donorId: Scalars['Int'];
  submitterDonorId?: Maybe<Scalars['String']>;
};

export type ClinicalSubmissionData = {
  __typename?: 'ClinicalSubmissionData';
  clinicalEntities: Array<Maybe<ClinicalSubmissionEntity>>;
  fileErrors?: Maybe<Array<Maybe<ClinicalFileError>>>;
  id?: Maybe<Scalars['ID']>;
  programShortName?: Maybe<Scalars['ID']>;
  state?: Maybe<SubmissionState>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type ClinicalSubmissionDataError = ClinicalEntityError & {
  __typename?: 'ClinicalSubmissionDataError';
  donorId: Scalars['String'];
  field: Scalars['String'];
  message: Scalars['String'];
  row: Scalars['Int'];
  type: Scalars['String'];
  value: Scalars['String'];
};

export type ClinicalSubmissionEntity = {
  __typename?: 'ClinicalSubmissionEntity';
  batchName?: Maybe<Scalars['String']>;
  clinicalType: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  dataErrors: Array<Maybe<ClinicalSubmissionDataError>>;
  dataUpdates: Array<Maybe<ClinicalSubmissionUpdate>>;
  dataWarnings: Array<Maybe<ClinicalSubmissionSchemaError>>;
  records: Array<Maybe<ClinicalRecord>>;
  schemaErrors: Array<Maybe<ClinicalSubmissionSchemaError>>;
  stats?: Maybe<ClinicalSubmissionStats>;
};

export type ClinicalSubmissionSchemaError = ClinicalEntityError & {
  __typename?: 'ClinicalSubmissionSchemaError';
  clinicalType: Scalars['String'];
  donorId: Scalars['String'];
  field: Scalars['String'];
  message: Scalars['String'];
  row: Scalars['Int'];
  type: Scalars['String'];
  value: Scalars['String'];
};

/** Each field is an array of row index referenced in ClinicalSubmissionRecord */
export type ClinicalSubmissionStats = {
  __typename?: 'ClinicalSubmissionStats';
  errorsFound: Array<Maybe<Scalars['Int']>>;
  new: Array<Maybe<Scalars['Int']>>;
  noUpdate: Array<Maybe<Scalars['Int']>>;
  updated: Array<Maybe<Scalars['Int']>>;
};

export type ClinicalSubmissionUpdate = {
  __typename?: 'ClinicalSubmissionUpdate';
  donorId: Scalars['String'];
  field: Scalars['String'];
  newValue: Scalars['String'];
  oldValue: Scalars['String'];
  row: Scalars['Int'];
};

export type Column = {
  __typename?: 'Column';
  accessor?: Maybe<Scalars['String']>;
  canChangeShow?: Maybe<Scalars['Boolean']>;
  field?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  jsonPath?: Maybe<Scalars['String']>;
  query?: Maybe<Scalars['String']>;
  show?: Maybe<Scalars['Boolean']>;
  sortable?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};

/** ########## INPUT TYPES ########### */
export type ColumnInput = {
  accessor?: InputMaybe<Scalars['String']>;
  canChangeShow?: InputMaybe<Scalars['Boolean']>;
  field?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  jsonPath?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  show?: InputMaybe<Scalars['Boolean']>;
  sortable?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Scalars['String']>;
};

/** ########## QUERY TYPES ########### */
export type ColumnSort = {
  __typename?: 'ColumnSort';
  desc?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
};

export type ColumnSortInput = {
  desc?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
};

export type ColumnState = {
  __typename?: 'ColumnState';
  columns?: Maybe<Array<Maybe<Column>>>;
  defaultSorted?: Maybe<Array<Maybe<ColumnSort>>>;
  keyField?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ColumnStateInput = {
  columns?: InputMaybe<Array<InputMaybe<ColumnInput>>>;
  defaultSorted?: InputMaybe<Array<InputMaybe<ColumnSortInput>>>;
  keyField?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type ColumnsState = {
  __typename?: 'ColumnsState';
  state?: Maybe<ColumnState>;
  timestamp?: Maybe<Scalars['String']>;
};

export type ColumnsStates = {
  __typename?: 'ColumnsStates';
  index?: Maybe<Scalars['String']>;
  states?: Maybe<Array<Maybe<ColumnsState>>>;
};

/** Completion Data for a given Donor */
export type CompletionStats = {
  __typename?: 'CompletionStats';
  coreCompletion?: Maybe<CoreCompletionFields>;
  coreCompletionDate?: Maybe<Scalars['String']>;
  coreCompletionPercentage?: Maybe<Scalars['Float']>;
  donorId?: Maybe<Scalars['Int']>;
  overriddenCoreCompletion?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Specific Entity Completion Values */
export type CoreCompletionFields = {
  __typename?: 'CoreCompletionFields';
  donor: Scalars['Float'];
  familyHistory?: Maybe<Scalars['Float']>;
  followUps: Scalars['Float'];
  normalSpecimens?: Maybe<Scalars['Float']>;
  primaryDiagnosis: Scalars['Float'];
  specimens: Scalars['Float'];
  treatments: Scalars['Float'];
  tumourSpecimens?: Maybe<Scalars['Float']>;
};

export type CoreCompletionStatusCount = {
  __typename?: 'CoreCompletionStatusCount';
  completed: Scalars['Int'];
  incomplete: Scalars['Int'];
  noData: Scalars['Int'];
};

export type DataSubmissionStatus = {
  __typename?: 'DataSubmissionStatus';
  dataSubmitted: Scalars['Int'];
  noDataSubmitted: Scalars['Int'];
};

export type DateRangeBucket = {
  __typename?: 'DateRangeBucket';
  /** This date is the last day in this date range bucket. */
  date?: Maybe<Scalars['DateTime']>;
  /** Number of donors with data published for the relevant analysis, from the beginning of time to this date. */
  donors?: Maybe<Scalars['Int']>;
};

export enum DonorField {
  /** Timestamp of when this donor first had alignment data published */
  AlignmentFirstPublishedDate = 'alignmentFirstPublishedDate',
  /** Timestamp of when this donor first had core clinical data completed */
  CoreCompletionDate = 'coreCompletionDate',
  /** Timestamp of when this donor first had Mutect2 variant callings data published */
  MutectFirstPublishedDate = 'mutectFirstPublishedDate',
  /** Timestamp of when this donor first had Open Access data published */
  OpenAccessFirstPublishedDate = 'openAccessFirstPublishedDate',
  /** Timestamp of when this donor first had raw reads data published */
  RawReadsFirstPublishedDate = 'rawReadsFirstPublishedDate',
  /** Timestamp of when this donor first had RNA alignment data published */
  RnaAlignmentFirstPublishedDate = 'rnaAlignmentFirstPublishedDate',
  /** Timestamp of when this donor first had RNA raw reads data published */
  RnaRawReadsFirstPublishedDate = 'rnaRawReadsFirstPublishedDate',
  /** Timestamp of when this donor first had Sanger VC data published */
  SangerVcsFirstPublishedDate = 'sangerVcsFirstPublishedDate',
}

export enum DonorMolecularDataProcessingStatus {
  Complete = 'COMPLETE',
  Processing = 'PROCESSING',
  Registered = 'REGISTERED',
}

export enum DonorMolecularDataReleaseStatus {
  FullyReleased = 'FULLY_RELEASED',
  NoRelease = 'NO_RELEASE',
  PartiallyReleased = 'PARTIALLY_RELEASED',
}

export type DonorSummary = {
  __typename?: 'DonorSummary';
  entries?: Maybe<Array<DonorSummaryEntry>>;
  stats: ProgramDonorSummaryStats;
};

/** Includes status summary of clinical and molecular data processing for the given donor */
export type DonorSummaryEntry = {
  __typename?: 'DonorSummaryEntry';
  /** Number of DNA alignments completed for this donor */
  alignmentsCompleted: Scalars['Int'];
  /** Number of DNA alignments that is failing for this donor */
  alignmentsFailed: Scalars['Int'];
  /** Number of DNA alignments currently running for this donor */
  alignmentsRunning: Scalars['Int'];
  /** Timestamp of when this donor was first registered */
  createdAt: Scalars['DateTime'];
  /** Donor id of the donor within the program */
  donorId: Scalars['String'];
  /** Unique object ID for this summary object */
  id: Scalars['ID'];
  /** Number of matched normal/tumour DNA sample pairs registered for this donor */
  matchedTNPairsDNA: Scalars['Int'];
  /** Number of DNA Mutect2 completed for this donor */
  mutectCompleted: Scalars['Int'];
  /** Number of DNA Mutect2 that is failed for this donor */
  mutectFailed: Scalars['Int'];
  /** Number of DNA Mutect2 currently running for this donor */
  mutectRunning: Scalars['Int'];
  /** Number of Open Access completed for this donor */
  openAccessCompleted: Scalars['Int'];
  /** Number of DNA Open Access that is failed for this donor */
  openAccessFailed: Scalars['Int'];
  /** Number of DNA Open Access currently running for this donor */
  openAccessRunning: Scalars['Int'];
  /** Molecular data processing status of this donor */
  processingStatus: DonorMolecularDataProcessingStatus;
  /** Short name of the program in which this donor is registered */
  programShortName: Scalars['String'];
  /** Number of normal DNA sample analysis that has been published for this donor */
  publishedNormalAnalysis: Scalars['Int'];
  /** Number of tumour DNA sample analysis that has been published for this donor */
  publishedTumourAnalysis: Scalars['Int'];
  /** Number of normal DNA samples registered for this donor */
  registeredNormalSamples: Scalars['Int'];
  /** Number of tumour DNA samples registered for this donor */
  registeredTumourSamples: Scalars['Int'];
  /** Release status of the donor's molecular data */
  releaseStatus: DonorMolecularDataReleaseStatus;
  /** Number of RNA alignments that are failing for this donor */
  rnaAlignmentFailed: Scalars['Int'];
  /** Number of RNA alignments completed for this donor */
  rnaAlignmentsCompleted: Scalars['Int'];
  /** Number of RNA alignments currently running for this donor */
  rnaAlignmentsRunning: Scalars['Int'];
  /** Number of normal RNA sample analysis that has been published for this donor */
  rnaPublishedNormalAnalysis: Scalars['Int'];
  /** Number of tumour RNA sample analysis that has been published for this donor */
  rnaPublishedTumourAnalysis: Scalars['Int'];
  /** Number of normal RNA samples registered for this donor */
  rnaRegisteredNormalSamples: Scalars['Int'];
  /** Number of tumour RNA samples registered for this donor */
  rnaRegisteredTumourSamples: Scalars['Int'];
  /** Number of DNA Sanger VCs completed for this donor */
  sangerVcsCompleted: Scalars['Int'];
  /** Number of DNA Sanger VCs that is failing for this donor */
  sangerVcsFailed: Scalars['Int'];
  /** Number of DNA Sanger VCs currently running for this donor */
  sangerVcsRunning: Scalars['Int'];
  /** Percentage of core clinical data fields that has been submitted for this donor. All core fields are listed at: https://docs.icgc-argo.org/dictionary */
  submittedCoreDataPercent: Scalars['Float'];
  /** Percentage of extended clinical data fields that has been submitted for this donor. All extended fields are listed at: https://docs.icgc-argo.org/dictionary */
  submittedExtendedDataPercent: Scalars['Float'];
  submitterDonorId: Scalars['String'];
  /** Timestamp of the latest update applied to this donor's clinical data */
  updatedAt: Scalars['DateTime'];
  /** Whether the donor submitted donor is valid according to the latest data dictionary layed out at: https://docs.icgc-argo.org/dictionary */
  validWithCurrentDictionary: Scalars['Boolean'];
};

export type DonorSummaryEntrySort = {
  field: ProgramDonorSummaryEntryField;
  order?: InputMaybe<SortOrder>;
};

export enum EsRefresh {
  False = 'FALSE',
  True = 'TRUE',
  WaitFor = 'WAIT_FOR',
}

export type FileSize = {
  __typename?: 'FileSize';
  value?: Maybe<Scalars['Float']>;
};

export enum InviteStatus {
  Accepted = 'ACCEPTED',
  Expired = 'EXPIRED',
  Pending = 'PENDING',
  Revoked = 'REVOKED',
}

export type InviteUserInput = {
  programShortName: Scalars['String'];
  userEmail: Scalars['String'];
  userFirstName: Scalars['String'];
  userLastName: Scalars['String'];
  userRole: UserRole;
};

export enum JiraTicketCategory {
  ApplyingAccess = 'APPLYING_ACCESS',
  DataDownload = 'DATA_DOWNLOAD',
  DataQuery = 'DATA_QUERY',
  DataSubmission = 'DATA_SUBMISSION',
  MediaQuery = 'MEDIA_QUERY',
  Other = 'OTHER',
  PublicationQuery = 'PUBLICATION_QUERY',
}

export type JoinProgramInput = {
  department: Scalars['String'];
  institute: Scalars['String'];
  invitationId: Scalars['ID'];
  piFirstName: Scalars['String'];
  piLastName: Scalars['String'];
};

export type JoinProgramInvite = {
  __typename?: 'JoinProgramInvite';
  acceptedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  emailSent: Scalars['Boolean'];
  expiresAt: Scalars['DateTime'];
  id: Scalars['ID'];
  program: Program;
  status: InviteStatus;
  user: ProgramUser;
};

export type MatchBoxField = {
  __typename?: 'MatchBoxField';
  displayName?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  keyField?: Maybe<Scalars['String']>;
  searchFields?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type MatchBoxState = {
  __typename?: 'MatchBoxState';
  state?: Maybe<Array<Maybe<MatchBoxField>>>;
  timestamp?: Maybe<Scalars['String']>;
};

export type MatchBoxStates = {
  __typename?: 'MatchBoxStates';
  index?: Maybe<Scalars['String']>;
  states?: Maybe<Array<Maybe<MatchBoxState>>>;
};

export enum MembershipType {
  Associate = 'ASSOCIATE',
  Full = 'FULL',
}

export enum Missing {
  First = 'first',
  Last = 'last',
}

export enum Mode {
  Avg = 'avg',
  Max = 'max',
  Min = 'min',
  Sum = 'sum',
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Available for DCC members to approve a clinical submission */
  approveClinicalSubmission: Scalars['Boolean'];
  /** Remove the Clinical Registration data currently uploaded and not committed */
  clearClinicalRegistration: Scalars['Boolean'];
  /**
   * Clear Clinical Submission
   * fileType is optional, if it is not provided all fileTypes will be cleared. The values for fileType are the same as the file names from each template (ex. donor, specimen)
   */
  clearClinicalSubmission: ClinicalSubmissionData;
  /**
   * Complete registration of the currently uploaded Clinical Registration data
   * On Success, returns a list of the new sample IDs that were committed
   */
  commitClinicalRegistration: Array<Maybe<Scalars['String']>>;
  /**
   * - If there is update: makes a clinical submission ready for approval by a DCC member,
   * returning submission data with updated state
   * - If there is NO update: merges clinical data to system, returning an empty submission
   */
  commitClinicalSubmission: ClinicalSubmissionData;
  createJiraTicketWithReCaptcha: TicketCreationResponse;
  /**
   * Create new program
   * For lists (Cancer Type, Primary Site, Institution, Regions, Countries) the entire new value must be provided, not just values being added.
   * Returns Program object details of created program
   */
  createProgram?: Maybe<Program>;
  /** Generate Ego access key */
  generateAccessKey: AccessKey;
  /**
   * Invite a user to join a program
   * Returns the email of the user if the invite is successfully sent
   */
  inviteUser?: Maybe<Scalars['String']>;
  /**
   * Join a program by accepting an invitation
   * Returns the user data
   */
  joinProgram?: Maybe<ProgramUser>;
  /**
   * Remove a user from a program
   * Returns message from server
   */
  removeUser?: Maybe<Scalars['String']>;
  /** Available for DCC members to reopen a clinical submission */
  reopenClinicalSubmission: ClinicalSubmissionData;
  saveSet?: Maybe<Set>;
  /**
   * Update Program
   * Returns shortName of the program if succesfully updated
   */
  updateProgram?: Maybe<Scalars['String']>;
  /**
   * Update a user's role in a prgoram
   * Returns the user data
   */
  updateUser?: Maybe<Scalars['Boolean']>;
  /** Upload a Registration file */
  uploadClinicalRegistration: ClinicalRegistrationData;
  /** Upload Clinical Submission files */
  uploadClinicalSubmissions: ClinicalSubmissionData;
  /** Validate the uploaded clinical files */
  validateClinicalSubmissions: ClinicalSubmissionData;
};

export type MutationApproveClinicalSubmissionArgs = {
  programShortName: Scalars['String'];
  version: Scalars['String'];
};

export type MutationClearClinicalRegistrationArgs = {
  registrationId: Scalars['String'];
  shortName: Scalars['String'];
};

export type MutationClearClinicalSubmissionArgs = {
  fileType?: InputMaybe<Scalars['String']>;
  programShortName: Scalars['String'];
  version: Scalars['String'];
};

export type MutationCommitClinicalRegistrationArgs = {
  registrationId: Scalars['String'];
  shortName: Scalars['String'];
};

export type MutationCommitClinicalSubmissionArgs = {
  programShortName: Scalars['String'];
  version: Scalars['String'];
};

export type MutationCreateJiraTicketWithReCaptchaArgs = {
  displayName?: InputMaybe<Scalars['String']>;
  emailAddress: Scalars['String'];
  messageCategory: JiraTicketCategory;
  reCaptchaResponse: Scalars['String'];
  requestText: Scalars['String'];
};

export type MutationCreateProgramArgs = {
  program: ProgramInput;
};

export type MutationInviteUserArgs = {
  invite: InviteUserInput;
};

export type MutationJoinProgramArgs = {
  join: JoinProgramInput;
};

export type MutationRemoveUserArgs = {
  programShortName: Scalars['String'];
  userEmail: Scalars['String'];
};

export type MutationReopenClinicalSubmissionArgs = {
  programShortName: Scalars['String'];
  version: Scalars['String'];
};

export type MutationSaveSetArgs = {
  path: Scalars['String'];
  refresh?: InputMaybe<EsRefresh>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
  sqon: Scalars['JSON'];
  type: ProjectType;
  userId?: InputMaybe<Scalars['String']>;
};

export type MutationUpdateProgramArgs = {
  shortName: Scalars['String'];
  updates: UpdateProgramInput;
};

export type MutationUpdateUserArgs = {
  programShortName: Scalars['String'];
  userEmail: Scalars['String'];
  userRole: UserRole;
};

export type MutationUploadClinicalRegistrationArgs = {
  registrationFile: Scalars['Upload'];
  shortName: Scalars['String'];
};

export type MutationUploadClinicalSubmissionsArgs = {
  clinicalFiles?: InputMaybe<Array<Scalars['Upload']>>;
  programShortName: Scalars['String'];
};

export type MutationValidateClinicalSubmissionsArgs = {
  programShortName: Scalars['String'];
  version: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type NumericAggregations = {
  __typename?: 'NumericAggregations';
  histogram?: Maybe<Aggregations>;
  stats?: Maybe<Stats>;
};

export type NumericAggregationsHistogramArgs = {
  interval?: InputMaybe<Scalars['Float']>;
};

export enum Order {
  Asc = 'asc',
  Desc = 'desc',
}

export type Profile = {
  __typename?: 'Profile';
  apiKey?: Maybe<AccessKey>;
  isDacoApproved?: Maybe<Scalars['Boolean']>;
};

export type Program = {
  __typename?: 'Program';
  cancerTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  commitmentDonors?: Maybe<Scalars['Int']>;
  countries?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  genomicDonors?: Maybe<Scalars['Int']>;
  institutions?: Maybe<Array<Maybe<Scalars['String']>>>;
  membershipType?: Maybe<MembershipType>;
  name?: Maybe<Scalars['String']>;
  primarySites?: Maybe<Array<Maybe<Scalars['String']>>>;
  regions?: Maybe<Array<Maybe<Scalars['String']>>>;
  shortName: Scalars['String'];
  submittedDonors?: Maybe<Scalars['Int']>;
  users?: Maybe<Array<Maybe<ProgramUser>>>;
  website?: Maybe<Scalars['String']>;
};

export enum ProgramDonorSummaryEntryField {
  /**
   * use this field to filter donor entries by 4 enum values: COMPLETED, IN_PROGRESS, FAILED, NO_DATA.
   * COMPLETED = donor has more than 1 completed alignment workflow;
   * IN_PROGRESS = donor has more than 1 running alignment workflow;
   * FAILED = donor has more than 1 failed alignment workflow;
   * NO_DATA = donor has 0 of all the above alignment workflow.
   */
  AlignmentStatus = 'alignmentStatus',
  AlignmentsCompleted = 'alignmentsCompleted',
  AlignmentsFailed = 'alignmentsFailed',
  AlignmentsRunning = 'alignmentsRunning',
  /** use this field to filter donor entries by partially matching donorId or submitterDonorId, e.g.: "donor", "donor5" */
  CombinedDonorId = 'combinedDonorId',
  /**
   * use this field to filter donor entries by 3 aggregations of submittedCoreDataPercent,
   * 3 enum options to filter by: NO_DATA, COMPLETE, INCOMPLETE.
   */
  CoreDataPercentAggregation = 'coreDataPercentAggregation',
  CreatedAt = 'createdAt',
  /**
   * use this field to filter donor entries by 4 enum values: TUMOR_NORMAL_MATCHED_PAIR, TUMOR_NORMAL_NO_MATCHED_PAIR, NO_DATA.
   * TUMOR_NORMAL_MATCHED_PAIR = donor has at least 1 tumor/normal matched pair.
   * TUMOR_NORMAL_NO_MATCHED_PAIR = donor has at least 1 registered tumour or 1 normal DNA sample, but no matched pairs.
   * NO_DATA = donor has not registered any tumour or normal DNA samples.
   */
  DnaTnMatchedPair = 'dnaTNMatchedPair',
  /**
   * use this field to filter donor entries by 3 enum values: TUMOR_AND_NORMAL, TUMOR_OR_NORMAL, NO_DATA.
   * TUMOR_AND_NORMAL = donor has at least 1 registered tumour and 1 normal DNA sample.
   * TUMOR_OR_NORMAL = donor has at least 1 registered tumour or 1 normal DNA sample, but not both.
   * NO_DATA = donor has not registered any tumour or normal DNA samples.
   */
  DnaTnRegistered = 'dnaTNRegistered',
  DonorId = 'donorId',
  MatchedTnPairsDna = 'matchedTNPairsDNA',
  MutectCompleted = 'mutectCompleted',
  MutectFailed = 'mutectFailed',
  MutectRunning = 'mutectRunning',
  /**
   * use this field to filter donor entries by 4 enum values: COMPLETED, IN_PROGRESS, FAILED, NO_DATA.
   * COMPLETED = donor has more than 1 completed Mutect 2 workflow;
   * IN_PROGRESS = donor has more than 1 running Mutect 2 workflow;
   * FAILED = donor has more than 1 failed Mutect 2 workflow;
   * NO_DATA = donor has 0 of all the above Mutect 2 workflow.
   */
  MutectStatus = 'mutectStatus',
  OpenAccessCompleted = 'openAccessCompleted',
  OpenAccessFailed = 'openAccessFailed',
  OpenAccessRunning = 'openAccessRunning',
  /**
   * use this field to filter donor entries by 4 enum values: COMPLETED, IN_PROGRESS, FAILED, NO_DATA.
   * COMPLETED = donor has 1 or more completed Open Access workflow;
   * IN_PROGRESS = donor has 1 or more running Open Access workflow;
   * FAILED = donor has 1 or more failed Open Access workflow;
   * NO_DATA = donor has 0 of all the above Open Access workflow.
   */
  OpenAccessStatus = 'openAccessStatus',
  ProcessingStatus = 'processingStatus',
  ProgramShortName = 'programShortName',
  PublishedNormalAnalysis = 'publishedNormalAnalysis',
  PublishedTumourAnalysis = 'publishedTumourAnalysis',
  /**
   * use this field to filter donor entries by 2 enum values: VALID, INVALID.
   * VALID means the donor has at least 1 submitted tumour/normal sequencing reads.
   * INVALID means the donor has not registered any tumour or sequencing reads.
   */
  RawReads = 'rawReads',
  RegisteredNormalSamples = 'registeredNormalSamples',
  /**
   * use this field to filter donor entries by 2 enum values: VALID, INVALID.
   * VALID means the donor has at least 1 registered tumour/normal sample pair.
   * INVALID means the donor has not registered any tumour or normal samples.
   */
  RegisteredSamplePairs = 'registeredSamplePairs',
  RegisteredTumourSamples = 'registeredTumourSamples',
  ReleaseStatus = 'releaseStatus',
  RnaAlignmentFailed = 'rnaAlignmentFailed',
  /**
   * use this field to filter donor entries by 4 enum values: COMPLETED, IN_PROGRESS, FAILED, NO_DATA.
   * COMPLETED = donor has more than 1 completed RNA alignment workflow;
   * IN_PROGRESS = donor has more than 1 running RNA alignment workflow;
   * FAILED = donor has more than 1 failed RNA alignment workflow;
   * NO_DATA = donor has 0 of all the above RNA alignment workflow.
   */
  RnaAlignmentStatus = 'rnaAlignmentStatus',
  RnaAlignmentsCompleted = 'rnaAlignmentsCompleted',
  RnaAlignmentsRunning = 'rnaAlignmentsRunning',
  RnaPublishedNormalAnalysis = 'rnaPublishedNormalAnalysis',
  RnaPublishedTumourAnalysis = 'rnaPublishedTumourAnalysis',
  /**
   * use this field to filter donor entries by 2 enum values: DATA_SUBMITTED, NO_DATA.
   * DATA_SUBMITTED means the donor has at least 1 published tumour or 1 published normal RNA raw reads.
   * NO_DATA means the donor has no tumour and normal RNA raw reads.
   */
  RnaRawReads = 'rnaRawReads',
  RnaRegisteredNormalSamples = 'rnaRegisteredNormalSamples',
  /**
   * use this field to filter donor entries by 2 enum values: DATA_SUBMITTED, NO_DATA.
   * DATA_SUBMITTED means the donor has at least 1 registered tumour or 1 normal RNA sample.
   * NO_DATA means the donor has not registered any tumour or normal RNA samples.
   */
  RnaRegisteredSample = 'rnaRegisteredSample',
  RnaRegisteredTumourSamples = 'rnaRegisteredTumourSamples',
  /**
   * use this field to filter donor entries by 4 enum values: COMPLETED, IN_PROGRESS, FAILED, NO_DATA.
   * COMPLETED = donor has more than 1 completed sanger VC workflow;
   * IN_PROGRESS = donor has more than 1 running sanger VC workflow;
   * FAILED = donor has more than 1 failed sanger VC workflow;
   * NO_DATA = donor has 0 of all the above sanger VC workflow.
   */
  SangerVcStatus = 'sangerVCStatus',
  SangerVcsCompleted = 'sangerVcsCompleted',
  SangerVcsFailed = 'sangerVcsFailed',
  SangerVcsRunning = 'sangerVcsRunning',
  SubmittedCoreDataPercent = 'submittedCoreDataPercent',
  SubmittedExtendedDataPercent = 'submittedExtendedDataPercent',
  SubmitterDonorId = 'submitterDonorId',
  UpdatedAt = 'updatedAt',
  ValidWithCurrentDictionary = 'validWithCurrentDictionary',
}

export type ProgramDonorSummaryFilter = {
  field: ProgramDonorSummaryEntryField;
  values: Array<Scalars['String']>;
};

/** Contains summary of aggregate clinical and molecular data processing status for the given program */
export type ProgramDonorSummaryStats = {
  __typename?: 'ProgramDonorSummaryStats';
  /** Number of donors that have COMPLETED/IN_PROGRESS/FAILED/NO_DATA as alignment workflow status */
  alignmentStatusCount: WorkflowStatusCount;
  /** Total number of genomic files associated with this program */
  allFilesCount: Scalars['Int'];
  /** Number of donors whose initiated workflows are all complete */
  completedWorkflowRuns: Scalars['Int'];
  /** Number of donors that are clinically completed/incomplete/no core fields */
  coreCompletion: CoreCompletionStatusCount;
  /** Number of donors that have tumor & normal matched pairs submitted */
  dnaTNMatchedPairStatus: TumorNormalMatchedPairStatusCount;
  /** Number of donors that have tumor and normal data registered */
  dnaTNRegisteredStatus: TumorNormalStatusCount;
  /** Number of donors invalidated with current data dictionary version */
  donorsInvalidWithCurrentDictionaryCount: Scalars['Int'];
  /** Number of donors whose molecular data is being processed */
  donorsProcessingMolecularDataCount: Scalars['Int'];
  /** Number of donors whose files have been released */
  donorsWithReleasedFilesCount: Scalars['Int'];
  /** Number of donors with workflow runs that have failed */
  failedWorkflowRuns: Scalars['Int'];
  /** Number of files to QC */
  filesToQcCount: Scalars['Int'];
  /** Number of donors whose genomic files have been fully released */
  fullyReleasedDonorsCount: Scalars['Int'];
  /** Unique ID of this summary object */
  id: Scalars['ID'];
  /** Number of donors with workflow runs that are currently running */
  inProgressWorkflowRuns: Scalars['Int'];
  /** Date of the most recent update to the donor summary index for this program. Can be null if no documents for this program */
  lastUpdate?: Maybe<Scalars['DateTime']>;
  /** Number of donors that have COMPLETED/IN_PROGRESS/FAILED/NO_DATA as mutect2 workflow status */
  mutectStatusCount: WorkflowStatusCount;
  /** Number of donors registered to the program who currently has no released genomic file */
  noReleaseDonorsCount: Scalars['Int'];
  /** Number of donors that have COMPLETED/IN_PROGRESS/FAILED/NO_DATA as Open Access workflow status */
  openAccessStatusCount: WorkflowStatusCount;
  /** Number of donors who only have some genomic files that have been released */
  partiallyReleasedDonorsCount: Scalars['Int'];
  /** Percentage of core clinical data fields submitted over total core clinical data fields */
  percentageCoreClinical: Scalars['Float'];
  /** Percentage of donors with at least 1 matched tumour/normal DNA raw reads pair */
  percentageTumourAndNormal: Scalars['Float'];
  /** Short name of the program which this summary object is associated with */
  programShortName: Scalars['String'];
  /** Number of donors that have VALID/INVALID raw reads */
  rawReadsStatus: SamplePairsStatusCount;
  /** Total number of donors registered for this program */
  registeredDonorsCount: Scalars['Int'];
  /** Number of donors that have COMPLETED/IN_PROGRESS/FAILED/NO_DATA as RNA alignment workflow status */
  rnaAlignmentStatusCount: WorkflowStatusCount;
  /** Number of donors that have submitted RNA published raw reads */
  rnaRawReadStatus: DataSubmissionStatus;
  /** Number of donors that have submitted RNA samples */
  rnaSampleStatus: DataSubmissionStatus;
  /** Number of donors that have VALID/INVALID sample pairs */
  sampleStatus: SamplePairsStatusCount;
  /** Number of donors that have COMPLETED/IN_PROGRESS/FAILED/NO_DATA as Sanger VC workflow status */
  sangerStatusCount: WorkflowStatusCount;
};

export type ProgramInput = {
  admins: Array<ProgramUserInput>;
  cancerTypes: Array<InputMaybe<Scalars['String']>>;
  commitmentDonors: Scalars['Int'];
  countries: Array<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  institutions: Array<Scalars['String']>;
  membershipType: MembershipType;
  name: Scalars['String'];
  primarySites: Array<InputMaybe<Scalars['String']>>;
  regions: Array<Scalars['String']>;
  shortName: Scalars['String'];
  website: Scalars['String'];
};

export type ProgramOptions = {
  __typename?: 'ProgramOptions';
  cancerTypes: Array<Maybe<Scalars['String']>>;
  countries: Array<Maybe<Scalars['String']>>;
  institutions: Array<Maybe<Scalars['String']>>;
  primarySites: Array<Maybe<Scalars['String']>>;
  regions: Array<Maybe<Scalars['String']>>;
};

export type ProgramUser = {
  __typename?: 'ProgramUser';
  email: Scalars['String'];
  firstName: Scalars['String'];
  inviteAcceptedAt?: Maybe<Scalars['String']>;
  inviteStatus?: Maybe<InviteStatus>;
  isDacoApproved?: Maybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
  role: UserRole;
};

export type ProgramUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  role: UserRole;
};

export enum ProjectType {
  File = 'file',
  Sets = 'sets',
}

export type Query = {
  __typename?: 'Query';
  _jiraRootQuery: Scalars['String'];
  /** Retrieve all stored Clinical Entity and Donor Completion data for a program */
  clinicalData: ClinicalData;
  /** Retrieve all stored Clinical Migration Errors for a program */
  clinicalErrors: ClinicalData;
  /** Retrieve current stored Clinical Registration data for a program */
  clinicalRegistration: ClinicalRegistrationData;
  /** Retrieve DonorIds + Submitter Donor Ids for given Clinical Entity and Program */
  clinicalSearchResults: ClinicalSearchData;
  /** Retrieve current stored Clinical Submission Data Dictionary Schema version */
  clinicalSubmissionSchemaVersion: Scalars['String'];
  /** Retrieve current Clinical Submission disabled state for both sample_registration and clinical entity files */
  clinicalSubmissionSystemDisabled: Scalars['Boolean'];
  /** Retrieve current stored Clinical Submission Types list */
  clinicalSubmissionTypesList?: Maybe<Array<Scalars['String']>>;
  /** Retrieve current stored Clinical Submission data for a program */
  clinicalSubmissions: ClinicalSubmissionData;
  file?: Maybe<File>;
  /** retrieve join program invitation by id */
  joinProgramInvite?: Maybe<JoinProgramInvite>;
  node?: Maybe<Node>;
  /** retrieve Program data by id */
  program?: Maybe<Program>;
  /** This query is for finding out how many donors for a given program had data of given types (donorFields) published for the first time before the end of the given date range. The donor count is aggregated into buckets (bucketCount) by date. There must be at least one day per bucket, i.e. the number of days between dateRangeFrom and dateRangeTo must be greater than or equal to bucketCount. */
  programDonorPublishedAnalysisByDateRange: Array<Maybe<AnalysisObject>>;
  /** Paginated list of donor data summary given a program */
  programDonorSummary: DonorSummary;
  programOptions: ProgramOptions;
  /** retrieve all Programs */
  programs?: Maybe<Array<Maybe<Program>>>;
  query?: Maybe<QueryResults>;
  /** retrive user profile data */
  self?: Maybe<Profile>;
  sets?: Maybe<Sets>;
  systemAlerts?: Maybe<Array<Maybe<SystemAlert>>>;
  /** retrieve User data by id */
  user?: Maybe<User>;
  /** retrieve paginated list of user data */
  users?: Maybe<Array<Maybe<User>>>;
};

export type QueryClinicalDataArgs = {
  filters: ClinicalInput;
  programShortName: Scalars['String'];
};

export type QueryClinicalErrorsArgs = {
  filters: ClinicalInput;
  programShortName: Scalars['String'];
};

export type QueryClinicalRegistrationArgs = {
  shortName: Scalars['String'];
};

export type QueryClinicalSearchResultsArgs = {
  filters: ClinicalInput;
  programShortName: Scalars['String'];
};

export type QueryClinicalSubmissionsArgs = {
  programShortName: Scalars['String'];
};

export type QueryJoinProgramInviteArgs = {
  id: Scalars['ID'];
};

export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type QueryProgramArgs = {
  shortName: Scalars['String'];
};

export type QueryProgramDonorPublishedAnalysisByDateRangeArgs = {
  bucketCount?: InputMaybe<Scalars['Int']>;
  dateRangeFrom: Scalars['DateTime'];
  dateRangeTo: Scalars['DateTime'];
  donorFields: Array<InputMaybe<DonorField>>;
  programShortName: Scalars['String'];
};

export type QueryProgramDonorSummaryArgs = {
  filters?: InputMaybe<Array<ProgramDonorSummaryFilter>>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  programShortName: Scalars['String'];
  sorts?: InputMaybe<Array<InputMaybe<DonorSummaryEntrySort>>>;
};

export type QueryQueryArgs = {
  query?: InputMaybe<Scalars['String']>;
  types?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryUserArgs = {
  id: Scalars['String'];
};

export type QueryUsersArgs = {
  groups?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  pageNum?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};

export type QueryResults = {
  __typename?: 'QueryResults';
  hits?: Maybe<Array<Maybe<Node>>>;
  total?: Maybe<Scalars['Int']>;
};

export type SamplePairsStatusCount = {
  __typename?: 'SamplePairsStatusCount';
  invalid: Scalars['Int'];
  valid: Scalars['Int'];
};

export type Set = {
  __typename?: 'Set';
  createdAt?: Maybe<Scalars['Date']>;
  ids?: Maybe<Array<Maybe<Scalars['String']>>>;
  path?: Maybe<Scalars['String']>;
  setId?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  sqon?: Maybe<Scalars['JSON']>;
  type?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type Sort = {
  field: Scalars['String'];
  missing?: InputMaybe<Missing>;
  mode?: InputMaybe<Mode>;
  order?: InputMaybe<Order>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type Stats = {
  __typename?: 'Stats';
  avg?: Maybe<Scalars['Float']>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

export enum SubmissionState {
  Invalid = 'INVALID',
  InvalidByMigration = 'INVALID_BY_MIGRATION',
  Open = 'OPEN',
  PendingApproval = 'PENDING_APPROVAL',
  Valid = 'VALID',
}

export type SystemAlert = {
  __typename?: 'SystemAlert';
  dismissable: Scalars['Boolean'];
  id: Scalars['ID'];
  level: Scalars['String'];
  message?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type TicketCreationResponse = {
  __typename?: 'TicketCreationResponse';
  _links?: Maybe<TicketLink>;
  issueId?: Maybe<Scalars['String']>;
  issueKey?: Maybe<Scalars['String']>;
};

export type TicketLink = {
  __typename?: 'TicketLink';
  web?: Maybe<Scalars['String']>;
};

export type TumorNormalMatchedPairStatusCount = {
  __typename?: 'TumorNormalMatchedPairStatusCount';
  noData: Scalars['Int'];
  tumorNormalMatchedPair: Scalars['Int'];
  tumorNormalNoMatchedPair: Scalars['Int'];
};

export type TumorNormalStatusCount = {
  __typename?: 'TumorNormalStatusCount';
  noData: Scalars['Int'];
  tumorAndNormal: Scalars['Int'];
  tumorOrNormal: Scalars['Int'];
};

export type UpdateProgramInput = {
  cancerTypes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  commitmentDonors?: InputMaybe<Scalars['Int']>;
  countries?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description?: InputMaybe<Scalars['String']>;
  institutions?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  membershipType?: InputMaybe<MembershipType>;
  name?: InputMaybe<Scalars['String']>;
  primarySites?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  regions?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  website?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  applications?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** ISO Formatted DateTime: */
  createdAt?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  groups?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  /** ISO Formatted DateTime: */
  lastLogin?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  preferredLanguage?: Maybe<Scalars['String']>;
  scopes?: Maybe<Array<Maybe<Scalars['String']>>>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export enum UserRole {
  Admin = 'ADMIN',
  Banned = 'BANNED',
  Collaborator = 'COLLABORATOR',
  Curator = 'CURATOR',
  Submitter = 'SUBMITTER',
}

export type WorkflowStatusCount = {
  __typename?: 'WorkflowStatusCount';
  completed: Scalars['Int'];
  failed: Scalars['Int'];
  inProgress: Scalars['Int'];
  noData: Scalars['Int'];
};

export type File = {
  __typename?: 'file';
  aggregations?: Maybe<FileAggregations>;
  aggsState?: Maybe<AggsState>;
  columnsState?: Maybe<ColumnsState>;
  extended?: Maybe<Scalars['JSON']>;
  hits?: Maybe<FileConnection>;
  mapping?: Maybe<Scalars['JSON']>;
  matchBoxState?: Maybe<MatchBoxState>;
};

export type FileAggregationsArgs = {
  aggregations_filter_themselves?: InputMaybe<Scalars['Boolean']>;
  filters?: InputMaybe<Scalars['JSON']>;
  include_missing?: InputMaybe<Scalars['Boolean']>;
};

export type FileExtendedArgs = {
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FileHitsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSON']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['String']>;
  searchAfter?: InputMaybe<Scalars['JSON']>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
  trackTotalHits?: InputMaybe<Scalars['Boolean']>;
};

export type FileAggregations = {
  __typename?: 'fileAggregations';
  analysis__analysis_id?: Maybe<Aggregations>;
  analysis__analysis_state?: Maybe<Aggregations>;
  analysis__analysis_type?: Maybe<Aggregations>;
  analysis__analysis_version?: Maybe<NumericAggregations>;
  analysis__experiment__experimental_strategy?: Maybe<Aggregations>;
  analysis__experiment__platform?: Maybe<Aggregations>;
  analysis__first_published_at?: Maybe<NumericAggregations>;
  analysis__published_at?: Maybe<NumericAggregations>;
  analysis__updated_at?: Maybe<NumericAggregations>;
  analysis__variant_class?: Maybe<Aggregations>;
  analysis__workflow__workflow_name?: Maybe<Aggregations>;
  analysis__workflow__workflow_version?: Maybe<Aggregations>;
  analysis_tools?: Maybe<Aggregations>;
  clinical__donor__age_at_menarche?: Maybe<NumericAggregations>;
  clinical__donor__bmi?: Maybe<NumericAggregations>;
  clinical__donor__cause_of_death?: Maybe<Aggregations>;
  clinical__donor__donor_id?: Maybe<Aggregations>;
  clinical__donor__height?: Maybe<NumericAggregations>;
  clinical__donor__menopause_status?: Maybe<Aggregations>;
  clinical__donor__number_of_children?: Maybe<NumericAggregations>;
  clinical__donor__number_of_pregnancies?: Maybe<NumericAggregations>;
  clinical__donor__primary_site?: Maybe<Aggregations>;
  clinical__donor__submitter_donor_id?: Maybe<Aggregations>;
  clinical__donor__survival_time?: Maybe<NumericAggregations>;
  clinical__donor__vital_status?: Maybe<Aggregations>;
  clinical__donor__weight?: Maybe<NumericAggregations>;
  clinical__follow_ups__anatomic_site_progression_or_recurrences?: Maybe<Aggregations>;
  clinical__follow_ups__disease_status_at_followup?: Maybe<Aggregations>;
  clinical__follow_ups__follow_up_id?: Maybe<Aggregations>;
  clinical__follow_ups__interval_of_followup?: Maybe<NumericAggregations>;
  clinical__follow_ups__is_primary_treatment?: Maybe<Aggregations>;
  clinical__follow_ups__method_of_progression_status?: Maybe<Aggregations>;
  clinical__follow_ups__posttherapy_m_category?: Maybe<Aggregations>;
  clinical__follow_ups__posttherapy_n_category?: Maybe<Aggregations>;
  clinical__follow_ups__posttherapy_stage_group?: Maybe<Aggregations>;
  clinical__follow_ups__posttherapy_t_category?: Maybe<Aggregations>;
  clinical__follow_ups__posttherapy_tumour_staging_system?: Maybe<Aggregations>;
  clinical__follow_ups__primary_diagnosis_id?: Maybe<Aggregations>;
  clinical__follow_ups__recurrence_m_category?: Maybe<Aggregations>;
  clinical__follow_ups__recurrence_n_category?: Maybe<Aggregations>;
  clinical__follow_ups__recurrence_stage_group?: Maybe<Aggregations>;
  clinical__follow_ups__recurrence_t_category?: Maybe<Aggregations>;
  clinical__follow_ups__recurrence_tumour_staging_system?: Maybe<Aggregations>;
  clinical__follow_ups__relapse_interval?: Maybe<NumericAggregations>;
  clinical__follow_ups__relapse_type?: Maybe<Aggregations>;
  clinical__follow_ups__submitter_follow_up_id?: Maybe<Aggregations>;
  clinical__follow_ups__submitter_primary_diagnosis_id?: Maybe<Aggregations>;
  clinical__follow_ups__submitter_treatment_id?: Maybe<Aggregations>;
  clinical__follow_ups__treatment_id?: Maybe<Aggregations>;
  clinical__follow_ups__treatment_type?: Maybe<Aggregations>;
  clinical__follow_ups__weight_at_followup?: Maybe<NumericAggregations>;
  clinical__primary_diagnosis__age_at_diagnosis?: Maybe<NumericAggregations>;
  clinical__primary_diagnosis__basis_of_diagnosis?: Maybe<Aggregations>;
  clinical__primary_diagnosis__cancer_type_additional_information?: Maybe<Aggregations>;
  clinical__primary_diagnosis__cancer_type_code?: Maybe<Aggregations>;
  clinical__primary_diagnosis__clinical_m_category?: Maybe<Aggregations>;
  clinical__primary_diagnosis__clinical_n_category?: Maybe<Aggregations>;
  clinical__primary_diagnosis__clinical_stage_group?: Maybe<Aggregations>;
  clinical__primary_diagnosis__clinical_t_category?: Maybe<Aggregations>;
  clinical__primary_diagnosis__clinical_tumour_staging_system?: Maybe<Aggregations>;
  clinical__primary_diagnosis__number_lymph_nodes_examined?: Maybe<NumericAggregations>;
  clinical__primary_diagnosis__number_lymph_nodes_positive?: Maybe<NumericAggregations>;
  clinical__primary_diagnosis__performance_status?: Maybe<Aggregations>;
  clinical__primary_diagnosis__presenting_symptoms?: Maybe<Aggregations>;
  clinical__primary_diagnosis__primary_diagnosis_id?: Maybe<Aggregations>;
  clinical__primary_diagnosis__submitter_primary_diagnosis_id?: Maybe<Aggregations>;
  clinical__specimens__pathological_m_category?: Maybe<Aggregations>;
  clinical__specimens__pathological_n_category?: Maybe<Aggregations>;
  clinical__specimens__pathological_stage_group?: Maybe<Aggregations>;
  clinical__specimens__pathological_t_category?: Maybe<Aggregations>;
  clinical__specimens__pathological_tumour_staging_system?: Maybe<Aggregations>;
  clinical__specimens__percent_inflammatory_tissue?: Maybe<NumericAggregations>;
  clinical__specimens__percent_necrosis?: Maybe<NumericAggregations>;
  clinical__specimens__percent_proliferating_cells?: Maybe<NumericAggregations>;
  clinical__specimens__percent_stromal_cells?: Maybe<NumericAggregations>;
  clinical__specimens__percent_tumour_cells?: Maybe<NumericAggregations>;
  clinical__specimens__primary_diagnosis_id?: Maybe<Aggregations>;
  clinical__specimens__reference_pathology_confirmed?: Maybe<Aggregations>;
  clinical__specimens__specimen_acquisition_interval?: Maybe<NumericAggregations>;
  clinical__specimens__specimen_anatomic_location?: Maybe<Aggregations>;
  clinical__specimens__specimen_id?: Maybe<Aggregations>;
  clinical__specimens__specimen_processing?: Maybe<Aggregations>;
  clinical__specimens__specimen_storage?: Maybe<Aggregations>;
  clinical__specimens__submitter_primary_diagnosis_id?: Maybe<Aggregations>;
  clinical__specimens__submitter_specimen_id?: Maybe<Aggregations>;
  clinical__specimens__tumour_grade?: Maybe<Aggregations>;
  clinical__specimens__tumour_grading_system?: Maybe<Aggregations>;
  clinical__specimens__tumour_histological_type?: Maybe<Aggregations>;
  clinical__treatments__adverse_events?: Maybe<Aggregations>;
  clinical__treatments__anatomical_site_irradiated?: Maybe<Aggregations>;
  clinical__treatments__chemotherapy_dosage_units?: Maybe<Aggregations>;
  clinical__treatments__clinical_trial_number?: Maybe<Aggregations>;
  clinical__treatments__clinical_trials_database?: Maybe<Aggregations>;
  clinical__treatments__cumulative_drug_dosage?: Maybe<NumericAggregations>;
  clinical__treatments__days_per_cycle?: Maybe<NumericAggregations>;
  clinical__treatments__drug_name?: Maybe<Aggregations>;
  clinical__treatments__drug_rxnormcui?: Maybe<Aggregations>;
  clinical__treatments__hemotological_toxicity?: Maybe<Aggregations>;
  clinical__treatments__hormone_drug_dosage_units?: Maybe<Aggregations>;
  clinical__treatments__is_primary_treatment?: Maybe<Aggregations>;
  clinical__treatments__line_of_treatment?: Maybe<NumericAggregations>;
  clinical__treatments__number_of_cycles?: Maybe<NumericAggregations>;
  clinical__treatments__outcome_of_treatment?: Maybe<Aggregations>;
  clinical__treatments__primary_diagnosis_id?: Maybe<Aggregations>;
  clinical__treatments__radiation_therapy_dosage?: Maybe<NumericAggregations>;
  clinical__treatments__radiation_therapy_fractions?: Maybe<NumericAggregations>;
  clinical__treatments__radiation_therapy_modality?: Maybe<Aggregations>;
  clinical__treatments__radiation_therapy_type?: Maybe<Aggregations>;
  clinical__treatments__response_to_treatment?: Maybe<Aggregations>;
  clinical__treatments__submitter_primary_diagnosis_id?: Maybe<Aggregations>;
  clinical__treatments__submitter_treatment_id?: Maybe<Aggregations>;
  clinical__treatments__toxicity_type?: Maybe<Aggregations>;
  clinical__treatments__treatment_duration?: Maybe<NumericAggregations>;
  clinical__treatments__treatment_id?: Maybe<Aggregations>;
  clinical__treatments__treatment_intent?: Maybe<Aggregations>;
  clinical__treatments__treatment_setting?: Maybe<Aggregations>;
  clinical__treatments__treatment_start_interval?: Maybe<NumericAggregations>;
  clinical__treatments__treatment_type?: Maybe<Aggregations>;
  data_category?: Maybe<Aggregations>;
  data_type?: Maybe<Aggregations>;
  donors__donor_id?: Maybe<Aggregations>;
  donors__gender?: Maybe<Aggregations>;
  donors__specimens__samples__matched_normal_submitter_sample_id?: Maybe<Aggregations>;
  donors__specimens__samples__sample_id?: Maybe<Aggregations>;
  donors__specimens__samples__sample_type?: Maybe<Aggregations>;
  donors__specimens__samples__submitter_sample_id?: Maybe<Aggregations>;
  donors__specimens__specimen_id?: Maybe<Aggregations>;
  donors__specimens__specimen_tissue_source?: Maybe<Aggregations>;
  donors__specimens__specimen_type?: Maybe<Aggregations>;
  donors__specimens__submitter_specimen_id?: Maybe<Aggregations>;
  donors__specimens__tumour_normal_designation?: Maybe<Aggregations>;
  donors__submitter_donor_id?: Maybe<Aggregations>;
  embargo_stage?: Maybe<Aggregations>;
  file__index_file__file_type?: Maybe<Aggregations>;
  file__index_file__md5sum?: Maybe<Aggregations>;
  file__index_file__name?: Maybe<Aggregations>;
  file__index_file__object_id?: Maybe<Aggregations>;
  file__index_file__size?: Maybe<NumericAggregations>;
  file__md5sum?: Maybe<Aggregations>;
  file__name?: Maybe<Aggregations>;
  file__size?: Maybe<NumericAggregations>;
  file_access?: Maybe<Aggregations>;
  file_autocomplete?: Maybe<Aggregations>;
  file_id?: Maybe<Aggregations>;
  file_number?: Maybe<NumericAggregations>;
  file_type?: Maybe<Aggregations>;
  meta__embargo_stage?: Maybe<Aggregations>;
  meta__release_state?: Maybe<Aggregations>;
  meta__study_id?: Maybe<Aggregations>;
  metrics__average_insert_size?: Maybe<NumericAggregations>;
  metrics__average_length?: Maybe<NumericAggregations>;
  metrics__duplicated_bases?: Maybe<NumericAggregations>;
  metrics__error_rate?: Maybe<NumericAggregations>;
  metrics__mapped_bases_cigar?: Maybe<NumericAggregations>;
  metrics__mapped_reads?: Maybe<NumericAggregations>;
  metrics__mismatch_bases?: Maybe<NumericAggregations>;
  metrics__paired_reads?: Maybe<NumericAggregations>;
  metrics__pairs_on_different_chromosomes?: Maybe<NumericAggregations>;
  metrics__properly_paired_reads?: Maybe<NumericAggregations>;
  metrics__total_bases?: Maybe<NumericAggregations>;
  metrics__total_reads?: Maybe<NumericAggregations>;
  object_id?: Maybe<Aggregations>;
  program_access_date?: Maybe<NumericAggregations>;
  release_state?: Maybe<Aggregations>;
  repositories__code?: Maybe<Aggregations>;
  repositories__country?: Maybe<Aggregations>;
  repositories__name?: Maybe<Aggregations>;
  repositories__organization?: Maybe<Aggregations>;
  repositories__url?: Maybe<Aggregations>;
  study_id?: Maybe<Aggregations>;
};

export type FileAnalysis = {
  __typename?: 'fileAnalysis';
  analysis_id?: Maybe<Scalars['String']>;
  analysis_state?: Maybe<Scalars['String']>;
  analysis_type?: Maybe<Scalars['String']>;
  analysis_version?: Maybe<Scalars['Float']>;
  experiment?: Maybe<FileAnalysisExperiment>;
  first_published_at?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  variant_class?: Maybe<Scalars['String']>;
  workflow?: Maybe<FileAnalysisWorkflow>;
};

export type FileAnalysisExperiment = {
  __typename?: 'fileAnalysisExperiment';
  experimental_strategy?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
};

export type FileAnalysisWorkflow = {
  __typename?: 'fileAnalysisWorkflow';
  workflow_name?: Maybe<Scalars['String']>;
  workflow_version?: Maybe<Scalars['String']>;
};

export type FileClinical = {
  __typename?: 'fileClinical';
  donor?: Maybe<FileClinicalDonor>;
  follow_ups?: Maybe<FileClinicalFollow_Ups>;
  primary_diagnosis?: Maybe<FileClinicalPrimary_Diagnosis>;
  specimens?: Maybe<FileClinicalSpecimens>;
  treatments?: Maybe<FileClinicalTreatments>;
};

export type FileClinicalDonor = {
  __typename?: 'fileClinicalDonor';
  age_at_menarche?: Maybe<Scalars['Float']>;
  bmi?: Maybe<Scalars['Float']>;
  cause_of_death?: Maybe<Scalars['String']>;
  donor_id?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  menopause_status?: Maybe<Scalars['String']>;
  number_of_children?: Maybe<Scalars['Float']>;
  number_of_pregnancies?: Maybe<Scalars['Float']>;
  primary_site?: Maybe<Scalars['String']>;
  submitter_donor_id?: Maybe<Scalars['String']>;
  survival_time?: Maybe<Scalars['Float']>;
  vital_status?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
};

export type FileClinicalFollow_Ups = {
  __typename?: 'fileClinicalFollow_ups';
  aggregations?: Maybe<FileClinicalFollow_UpsAggregations>;
  aggsState?: Maybe<AggsState>;
  columnsState?: Maybe<ColumnsState>;
  extended?: Maybe<Scalars['JSON']>;
  hits?: Maybe<FileClinicalFollow_UpsConnection>;
  mapping?: Maybe<Scalars['JSON']>;
  matchBoxState?: Maybe<MatchBoxState>;
};

export type FileClinicalFollow_UpsAggregationsArgs = {
  aggregations_filter_themselves?: InputMaybe<Scalars['Boolean']>;
  filters?: InputMaybe<Scalars['JSON']>;
  include_missing?: InputMaybe<Scalars['Boolean']>;
};

export type FileClinicalFollow_UpsExtendedArgs = {
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FileClinicalFollow_UpsHitsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSON']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['String']>;
  searchAfter?: InputMaybe<Scalars['JSON']>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
  trackTotalHits?: InputMaybe<Scalars['Boolean']>;
};

export type FileClinicalFollow_UpsAggregations = {
  __typename?: 'fileClinicalFollow_upsAggregations';
  anatomic_site_progression_or_recurrences?: Maybe<Aggregations>;
  disease_status_at_followup?: Maybe<Aggregations>;
  follow_up_id?: Maybe<Aggregations>;
  interval_of_followup?: Maybe<NumericAggregations>;
  is_primary_treatment?: Maybe<Aggregations>;
  method_of_progression_status?: Maybe<Aggregations>;
  posttherapy_m_category?: Maybe<Aggregations>;
  posttherapy_n_category?: Maybe<Aggregations>;
  posttherapy_stage_group?: Maybe<Aggregations>;
  posttherapy_t_category?: Maybe<Aggregations>;
  posttherapy_tumour_staging_system?: Maybe<Aggregations>;
  primary_diagnosis_id?: Maybe<Aggregations>;
  recurrence_m_category?: Maybe<Aggregations>;
  recurrence_n_category?: Maybe<Aggregations>;
  recurrence_stage_group?: Maybe<Aggregations>;
  recurrence_t_category?: Maybe<Aggregations>;
  recurrence_tumour_staging_system?: Maybe<Aggregations>;
  relapse_interval?: Maybe<NumericAggregations>;
  relapse_type?: Maybe<Aggregations>;
  submitter_follow_up_id?: Maybe<Aggregations>;
  submitter_primary_diagnosis_id?: Maybe<Aggregations>;
  submitter_treatment_id?: Maybe<Aggregations>;
  treatment_id?: Maybe<Aggregations>;
  treatment_type?: Maybe<Aggregations>;
  weight_at_followup?: Maybe<NumericAggregations>;
};

export type FileClinicalFollow_UpsConnection = {
  __typename?: 'fileClinicalFollow_upsConnection';
  edges?: Maybe<Array<Maybe<FileClinicalFollow_UpsEdge>>>;
  total: Scalars['Int'];
};

export type FileClinicalFollow_UpsEdge = {
  __typename?: 'fileClinicalFollow_upsEdge';
  node?: Maybe<FileClinicalFollow_UpsNode>;
  searchAfter?: Maybe<Scalars['JSON']>;
};

export type FileClinicalFollow_UpsNode = Node & {
  __typename?: 'fileClinicalFollow_upsNode';
  anatomic_site_progression_or_recurrences?: Maybe<Scalars['String']>;
  disease_status_at_followup?: Maybe<Scalars['String']>;
  follow_up_id?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  interval_of_followup?: Maybe<Scalars['Float']>;
  is_primary_treatment?: Maybe<Scalars['String']>;
  method_of_progression_status?: Maybe<Scalars['String']>;
  posttherapy_m_category?: Maybe<Scalars['String']>;
  posttherapy_n_category?: Maybe<Scalars['String']>;
  posttherapy_stage_group?: Maybe<Scalars['String']>;
  posttherapy_t_category?: Maybe<Scalars['String']>;
  posttherapy_tumour_staging_system?: Maybe<Scalars['String']>;
  primary_diagnosis_id?: Maybe<Scalars['String']>;
  recurrence_m_category?: Maybe<Scalars['String']>;
  recurrence_n_category?: Maybe<Scalars['String']>;
  recurrence_stage_group?: Maybe<Scalars['String']>;
  recurrence_t_category?: Maybe<Scalars['String']>;
  recurrence_tumour_staging_system?: Maybe<Scalars['String']>;
  relapse_interval?: Maybe<Scalars['Float']>;
  relapse_type?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  submitter_follow_up_id?: Maybe<Scalars['String']>;
  submitter_primary_diagnosis_id?: Maybe<Scalars['String']>;
  submitter_treatment_id?: Maybe<Scalars['String']>;
  treatment_id?: Maybe<Scalars['String']>;
  treatment_type?: Maybe<Scalars['String']>;
  weight_at_followup?: Maybe<Scalars['Float']>;
};

export type FileClinicalPrimary_Diagnosis = {
  __typename?: 'fileClinicalPrimary_diagnosis';
  aggregations?: Maybe<FileClinicalPrimary_DiagnosisAggregations>;
  aggsState?: Maybe<AggsState>;
  columnsState?: Maybe<ColumnsState>;
  extended?: Maybe<Scalars['JSON']>;
  hits?: Maybe<FileClinicalPrimary_DiagnosisConnection>;
  mapping?: Maybe<Scalars['JSON']>;
  matchBoxState?: Maybe<MatchBoxState>;
};

export type FileClinicalPrimary_DiagnosisAggregationsArgs = {
  aggregations_filter_themselves?: InputMaybe<Scalars['Boolean']>;
  filters?: InputMaybe<Scalars['JSON']>;
  include_missing?: InputMaybe<Scalars['Boolean']>;
};

export type FileClinicalPrimary_DiagnosisExtendedArgs = {
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FileClinicalPrimary_DiagnosisHitsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSON']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['String']>;
  searchAfter?: InputMaybe<Scalars['JSON']>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
  trackTotalHits?: InputMaybe<Scalars['Boolean']>;
};

export type FileClinicalPrimary_DiagnosisAggregations = {
  __typename?: 'fileClinicalPrimary_diagnosisAggregations';
  age_at_diagnosis?: Maybe<NumericAggregations>;
  basis_of_diagnosis?: Maybe<Aggregations>;
  cancer_type_additional_information?: Maybe<Aggregations>;
  cancer_type_code?: Maybe<Aggregations>;
  clinical_m_category?: Maybe<Aggregations>;
  clinical_n_category?: Maybe<Aggregations>;
  clinical_stage_group?: Maybe<Aggregations>;
  clinical_t_category?: Maybe<Aggregations>;
  clinical_tumour_staging_system?: Maybe<Aggregations>;
  number_lymph_nodes_examined?: Maybe<NumericAggregations>;
  number_lymph_nodes_positive?: Maybe<NumericAggregations>;
  performance_status?: Maybe<Aggregations>;
  presenting_symptoms?: Maybe<Aggregations>;
  primary_diagnosis_id?: Maybe<Aggregations>;
  submitter_primary_diagnosis_id?: Maybe<Aggregations>;
};

export type FileClinicalPrimary_DiagnosisConnection = {
  __typename?: 'fileClinicalPrimary_diagnosisConnection';
  edges?: Maybe<Array<Maybe<FileClinicalPrimary_DiagnosisEdge>>>;
  total: Scalars['Int'];
};

export type FileClinicalPrimary_DiagnosisEdge = {
  __typename?: 'fileClinicalPrimary_diagnosisEdge';
  node?: Maybe<FileClinicalPrimary_DiagnosisNode>;
  searchAfter?: Maybe<Scalars['JSON']>;
};

export type FileClinicalPrimary_DiagnosisNode = Node & {
  __typename?: 'fileClinicalPrimary_diagnosisNode';
  age_at_diagnosis?: Maybe<Scalars['Float']>;
  basis_of_diagnosis?: Maybe<Scalars['String']>;
  cancer_type_additional_information?: Maybe<Scalars['String']>;
  cancer_type_code?: Maybe<Scalars['String']>;
  clinical_m_category?: Maybe<Scalars['String']>;
  clinical_n_category?: Maybe<Scalars['String']>;
  clinical_stage_group?: Maybe<Scalars['String']>;
  clinical_t_category?: Maybe<Scalars['String']>;
  clinical_tumour_staging_system?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  number_lymph_nodes_examined?: Maybe<Scalars['Float']>;
  number_lymph_nodes_positive?: Maybe<Scalars['Float']>;
  performance_status?: Maybe<Scalars['String']>;
  presenting_symptoms?: Maybe<Scalars['String']>;
  primary_diagnosis_id?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  submitter_primary_diagnosis_id?: Maybe<Scalars['String']>;
};

export type FileClinicalSpecimens = {
  __typename?: 'fileClinicalSpecimens';
  aggregations?: Maybe<FileClinicalSpecimensAggregations>;
  aggsState?: Maybe<AggsState>;
  columnsState?: Maybe<ColumnsState>;
  extended?: Maybe<Scalars['JSON']>;
  hits?: Maybe<FileClinicalSpecimensConnection>;
  mapping?: Maybe<Scalars['JSON']>;
  matchBoxState?: Maybe<MatchBoxState>;
};

export type FileClinicalSpecimensAggregationsArgs = {
  aggregations_filter_themselves?: InputMaybe<Scalars['Boolean']>;
  filters?: InputMaybe<Scalars['JSON']>;
  include_missing?: InputMaybe<Scalars['Boolean']>;
};

export type FileClinicalSpecimensExtendedArgs = {
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FileClinicalSpecimensHitsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSON']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['String']>;
  searchAfter?: InputMaybe<Scalars['JSON']>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
  trackTotalHits?: InputMaybe<Scalars['Boolean']>;
};

export type FileClinicalSpecimensAggregations = {
  __typename?: 'fileClinicalSpecimensAggregations';
  pathological_m_category?: Maybe<Aggregations>;
  pathological_n_category?: Maybe<Aggregations>;
  pathological_stage_group?: Maybe<Aggregations>;
  pathological_t_category?: Maybe<Aggregations>;
  pathological_tumour_staging_system?: Maybe<Aggregations>;
  percent_inflammatory_tissue?: Maybe<NumericAggregations>;
  percent_necrosis?: Maybe<NumericAggregations>;
  percent_proliferating_cells?: Maybe<NumericAggregations>;
  percent_stromal_cells?: Maybe<NumericAggregations>;
  percent_tumour_cells?: Maybe<NumericAggregations>;
  primary_diagnosis_id?: Maybe<Aggregations>;
  reference_pathology_confirmed?: Maybe<Aggregations>;
  specimen_acquisition_interval?: Maybe<NumericAggregations>;
  specimen_anatomic_location?: Maybe<Aggregations>;
  specimen_id?: Maybe<Aggregations>;
  specimen_processing?: Maybe<Aggregations>;
  specimen_storage?: Maybe<Aggregations>;
  submitter_primary_diagnosis_id?: Maybe<Aggregations>;
  submitter_specimen_id?: Maybe<Aggregations>;
  tumour_grade?: Maybe<Aggregations>;
  tumour_grading_system?: Maybe<Aggregations>;
  tumour_histological_type?: Maybe<Aggregations>;
};

export type FileClinicalSpecimensConnection = {
  __typename?: 'fileClinicalSpecimensConnection';
  edges?: Maybe<Array<Maybe<FileClinicalSpecimensEdge>>>;
  total: Scalars['Int'];
};

export type FileClinicalSpecimensEdge = {
  __typename?: 'fileClinicalSpecimensEdge';
  node?: Maybe<FileClinicalSpecimensNode>;
  searchAfter?: Maybe<Scalars['JSON']>;
};

export type FileClinicalSpecimensNode = Node & {
  __typename?: 'fileClinicalSpecimensNode';
  id: Scalars['ID'];
  pathological_m_category?: Maybe<Scalars['String']>;
  pathological_n_category?: Maybe<Scalars['String']>;
  pathological_stage_group?: Maybe<Scalars['String']>;
  pathological_t_category?: Maybe<Scalars['String']>;
  pathological_tumour_staging_system?: Maybe<Scalars['String']>;
  percent_inflammatory_tissue?: Maybe<Scalars['Float']>;
  percent_necrosis?: Maybe<Scalars['Float']>;
  percent_proliferating_cells?: Maybe<Scalars['Float']>;
  percent_stromal_cells?: Maybe<Scalars['Float']>;
  percent_tumour_cells?: Maybe<Scalars['Float']>;
  primary_diagnosis_id?: Maybe<Scalars['String']>;
  reference_pathology_confirmed?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  specimen_acquisition_interval?: Maybe<Scalars['Float']>;
  specimen_anatomic_location?: Maybe<Scalars['String']>;
  specimen_id?: Maybe<Scalars['String']>;
  specimen_processing?: Maybe<Scalars['String']>;
  specimen_storage?: Maybe<Scalars['String']>;
  submitter_primary_diagnosis_id?: Maybe<Scalars['String']>;
  submitter_specimen_id?: Maybe<Scalars['String']>;
  tumour_grade?: Maybe<Scalars['String']>;
  tumour_grading_system?: Maybe<Scalars['String']>;
  tumour_histological_type?: Maybe<Scalars['String']>;
};

export type FileClinicalTreatments = {
  __typename?: 'fileClinicalTreatments';
  aggregations?: Maybe<FileClinicalTreatmentsAggregations>;
  aggsState?: Maybe<AggsState>;
  columnsState?: Maybe<ColumnsState>;
  extended?: Maybe<Scalars['JSON']>;
  hits?: Maybe<FileClinicalTreatmentsConnection>;
  mapping?: Maybe<Scalars['JSON']>;
  matchBoxState?: Maybe<MatchBoxState>;
};

export type FileClinicalTreatmentsAggregationsArgs = {
  aggregations_filter_themselves?: InputMaybe<Scalars['Boolean']>;
  filters?: InputMaybe<Scalars['JSON']>;
  include_missing?: InputMaybe<Scalars['Boolean']>;
};

export type FileClinicalTreatmentsExtendedArgs = {
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FileClinicalTreatmentsHitsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSON']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['String']>;
  searchAfter?: InputMaybe<Scalars['JSON']>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
  trackTotalHits?: InputMaybe<Scalars['Boolean']>;
};

export type FileClinicalTreatmentsAggregations = {
  __typename?: 'fileClinicalTreatmentsAggregations';
  adverse_events?: Maybe<Aggregations>;
  anatomical_site_irradiated?: Maybe<Aggregations>;
  chemotherapy_dosage_units?: Maybe<Aggregations>;
  clinical_trial_number?: Maybe<Aggregations>;
  clinical_trials_database?: Maybe<Aggregations>;
  cumulative_drug_dosage?: Maybe<NumericAggregations>;
  days_per_cycle?: Maybe<NumericAggregations>;
  drug_name?: Maybe<Aggregations>;
  drug_rxnormcui?: Maybe<Aggregations>;
  hemotological_toxicity?: Maybe<Aggregations>;
  hormone_drug_dosage_units?: Maybe<Aggregations>;
  is_primary_treatment?: Maybe<Aggregations>;
  line_of_treatment?: Maybe<NumericAggregations>;
  number_of_cycles?: Maybe<NumericAggregations>;
  outcome_of_treatment?: Maybe<Aggregations>;
  primary_diagnosis_id?: Maybe<Aggregations>;
  radiation_therapy_dosage?: Maybe<NumericAggregations>;
  radiation_therapy_fractions?: Maybe<NumericAggregations>;
  radiation_therapy_modality?: Maybe<Aggregations>;
  radiation_therapy_type?: Maybe<Aggregations>;
  response_to_treatment?: Maybe<Aggregations>;
  submitter_primary_diagnosis_id?: Maybe<Aggregations>;
  submitter_treatment_id?: Maybe<Aggregations>;
  toxicity_type?: Maybe<Aggregations>;
  treatment_duration?: Maybe<NumericAggregations>;
  treatment_id?: Maybe<Aggregations>;
  treatment_intent?: Maybe<Aggregations>;
  treatment_setting?: Maybe<Aggregations>;
  treatment_start_interval?: Maybe<NumericAggregations>;
  treatment_type?: Maybe<Aggregations>;
};

export type FileClinicalTreatmentsConnection = {
  __typename?: 'fileClinicalTreatmentsConnection';
  edges?: Maybe<Array<Maybe<FileClinicalTreatmentsEdge>>>;
  total: Scalars['Int'];
};

export type FileClinicalTreatmentsEdge = {
  __typename?: 'fileClinicalTreatmentsEdge';
  node?: Maybe<FileClinicalTreatmentsNode>;
  searchAfter?: Maybe<Scalars['JSON']>;
};

export type FileClinicalTreatmentsNode = Node & {
  __typename?: 'fileClinicalTreatmentsNode';
  adverse_events?: Maybe<Scalars['String']>;
  anatomical_site_irradiated?: Maybe<Scalars['String']>;
  chemotherapy_dosage_units?: Maybe<Scalars['String']>;
  clinical_trial_number?: Maybe<Scalars['String']>;
  clinical_trials_database?: Maybe<Scalars['String']>;
  cumulative_drug_dosage?: Maybe<Scalars['Float']>;
  days_per_cycle?: Maybe<Scalars['Float']>;
  drug_name?: Maybe<Scalars['String']>;
  drug_rxnormcui?: Maybe<Scalars['String']>;
  hemotological_toxicity?: Maybe<Scalars['String']>;
  hormone_drug_dosage_units?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  is_primary_treatment?: Maybe<Scalars['String']>;
  line_of_treatment?: Maybe<Scalars['Float']>;
  number_of_cycles?: Maybe<Scalars['Float']>;
  outcome_of_treatment?: Maybe<Scalars['String']>;
  primary_diagnosis_id?: Maybe<Scalars['String']>;
  radiation_therapy_dosage?: Maybe<Scalars['Float']>;
  radiation_therapy_fractions?: Maybe<Scalars['Float']>;
  radiation_therapy_modality?: Maybe<Scalars['String']>;
  radiation_therapy_type?: Maybe<Scalars['String']>;
  response_to_treatment?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  submitter_primary_diagnosis_id?: Maybe<Scalars['String']>;
  submitter_treatment_id?: Maybe<Scalars['String']>;
  toxicity_type?: Maybe<Scalars['String']>;
  treatment_duration?: Maybe<Scalars['Float']>;
  treatment_id?: Maybe<Scalars['String']>;
  treatment_intent?: Maybe<Scalars['String']>;
  treatment_setting?: Maybe<Scalars['String']>;
  treatment_start_interval?: Maybe<Scalars['Float']>;
  treatment_type?: Maybe<Scalars['String']>;
};

export type FileConnection = {
  __typename?: 'fileConnection';
  edges?: Maybe<Array<Maybe<FileEdge>>>;
  total: Scalars['Int'];
};

export type FileDonors = {
  __typename?: 'fileDonors';
  aggregations?: Maybe<FileDonorsAggregations>;
  aggsState?: Maybe<AggsState>;
  columnsState?: Maybe<ColumnsState>;
  extended?: Maybe<Scalars['JSON']>;
  hits?: Maybe<FileDonorsConnection>;
  mapping?: Maybe<Scalars['JSON']>;
  matchBoxState?: Maybe<MatchBoxState>;
};

export type FileDonorsAggregationsArgs = {
  aggregations_filter_themselves?: InputMaybe<Scalars['Boolean']>;
  filters?: InputMaybe<Scalars['JSON']>;
  include_missing?: InputMaybe<Scalars['Boolean']>;
};

export type FileDonorsExtendedArgs = {
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FileDonorsHitsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSON']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['String']>;
  searchAfter?: InputMaybe<Scalars['JSON']>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
  trackTotalHits?: InputMaybe<Scalars['Boolean']>;
};

export type FileDonorsAggregations = {
  __typename?: 'fileDonorsAggregations';
  donor_id?: Maybe<Aggregations>;
  gender?: Maybe<Aggregations>;
  specimens__samples__matched_normal_submitter_sample_id?: Maybe<Aggregations>;
  specimens__samples__sample_id?: Maybe<Aggregations>;
  specimens__samples__sample_type?: Maybe<Aggregations>;
  specimens__samples__submitter_sample_id?: Maybe<Aggregations>;
  specimens__specimen_id?: Maybe<Aggregations>;
  specimens__specimen_tissue_source?: Maybe<Aggregations>;
  specimens__specimen_type?: Maybe<Aggregations>;
  specimens__submitter_specimen_id?: Maybe<Aggregations>;
  specimens__tumour_normal_designation?: Maybe<Aggregations>;
  submitter_donor_id?: Maybe<Aggregations>;
};

export type FileDonorsConnection = {
  __typename?: 'fileDonorsConnection';
  edges?: Maybe<Array<Maybe<FileDonorsEdge>>>;
  total: Scalars['Int'];
};

export type FileDonorsEdge = {
  __typename?: 'fileDonorsEdge';
  node?: Maybe<FileDonorsNode>;
  searchAfter?: Maybe<Scalars['JSON']>;
};

export type FileDonorsNode = Node & {
  __typename?: 'fileDonorsNode';
  donor_id?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  score?: Maybe<Scalars['Int']>;
  specimens?: Maybe<FileDonorsSpecimens>;
  submitter_donor_id?: Maybe<Scalars['String']>;
};

export type FileDonorsSpecimens = {
  __typename?: 'fileDonorsSpecimens';
  aggregations?: Maybe<FileDonorsSpecimensAggregations>;
  aggsState?: Maybe<AggsState>;
  columnsState?: Maybe<ColumnsState>;
  extended?: Maybe<Scalars['JSON']>;
  hits?: Maybe<FileDonorsSpecimensConnection>;
  mapping?: Maybe<Scalars['JSON']>;
  matchBoxState?: Maybe<MatchBoxState>;
};

export type FileDonorsSpecimensAggregationsArgs = {
  aggregations_filter_themselves?: InputMaybe<Scalars['Boolean']>;
  filters?: InputMaybe<Scalars['JSON']>;
  include_missing?: InputMaybe<Scalars['Boolean']>;
};

export type FileDonorsSpecimensExtendedArgs = {
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FileDonorsSpecimensHitsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSON']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['String']>;
  searchAfter?: InputMaybe<Scalars['JSON']>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
  trackTotalHits?: InputMaybe<Scalars['Boolean']>;
};

export type FileDonorsSpecimensAggregations = {
  __typename?: 'fileDonorsSpecimensAggregations';
  samples__matched_normal_submitter_sample_id?: Maybe<Aggregations>;
  samples__sample_id?: Maybe<Aggregations>;
  samples__sample_type?: Maybe<Aggregations>;
  samples__submitter_sample_id?: Maybe<Aggregations>;
  specimen_id?: Maybe<Aggregations>;
  specimen_tissue_source?: Maybe<Aggregations>;
  specimen_type?: Maybe<Aggregations>;
  submitter_specimen_id?: Maybe<Aggregations>;
  tumour_normal_designation?: Maybe<Aggregations>;
};

export type FileDonorsSpecimensConnection = {
  __typename?: 'fileDonorsSpecimensConnection';
  edges?: Maybe<Array<Maybe<FileDonorsSpecimensEdge>>>;
  total: Scalars['Int'];
};

export type FileDonorsSpecimensEdge = {
  __typename?: 'fileDonorsSpecimensEdge';
  node?: Maybe<FileDonorsSpecimensNode>;
  searchAfter?: Maybe<Scalars['JSON']>;
};

export type FileDonorsSpecimensNode = Node & {
  __typename?: 'fileDonorsSpecimensNode';
  id: Scalars['ID'];
  samples?: Maybe<FileDonorsSpecimensSamples>;
  score?: Maybe<Scalars['Int']>;
  specimen_id?: Maybe<Scalars['String']>;
  specimen_tissue_source?: Maybe<Scalars['String']>;
  specimen_type?: Maybe<Scalars['String']>;
  submitter_specimen_id?: Maybe<Scalars['String']>;
  tumour_normal_designation?: Maybe<Scalars['String']>;
};

export type FileDonorsSpecimensSamples = {
  __typename?: 'fileDonorsSpecimensSamples';
  aggregations?: Maybe<FileDonorsSpecimensSamplesAggregations>;
  aggsState?: Maybe<AggsState>;
  columnsState?: Maybe<ColumnsState>;
  extended?: Maybe<Scalars['JSON']>;
  hits?: Maybe<FileDonorsSpecimensSamplesConnection>;
  mapping?: Maybe<Scalars['JSON']>;
  matchBoxState?: Maybe<MatchBoxState>;
};

export type FileDonorsSpecimensSamplesAggregationsArgs = {
  aggregations_filter_themselves?: InputMaybe<Scalars['Boolean']>;
  filters?: InputMaybe<Scalars['JSON']>;
  include_missing?: InputMaybe<Scalars['Boolean']>;
};

export type FileDonorsSpecimensSamplesExtendedArgs = {
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FileDonorsSpecimensSamplesHitsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSON']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['String']>;
  searchAfter?: InputMaybe<Scalars['JSON']>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
  trackTotalHits?: InputMaybe<Scalars['Boolean']>;
};

export type FileDonorsSpecimensSamplesAggregations = {
  __typename?: 'fileDonorsSpecimensSamplesAggregations';
  matched_normal_submitter_sample_id?: Maybe<Aggregations>;
  sample_id?: Maybe<Aggregations>;
  sample_type?: Maybe<Aggregations>;
  submitter_sample_id?: Maybe<Aggregations>;
};

export type FileDonorsSpecimensSamplesConnection = {
  __typename?: 'fileDonorsSpecimensSamplesConnection';
  edges?: Maybe<Array<Maybe<FileDonorsSpecimensSamplesEdge>>>;
  total: Scalars['Int'];
};

export type FileDonorsSpecimensSamplesEdge = {
  __typename?: 'fileDonorsSpecimensSamplesEdge';
  node?: Maybe<FileDonorsSpecimensSamplesNode>;
  searchAfter?: Maybe<Scalars['JSON']>;
};

export type FileDonorsSpecimensSamplesNode = Node & {
  __typename?: 'fileDonorsSpecimensSamplesNode';
  id: Scalars['ID'];
  matched_normal_submitter_sample_id?: Maybe<Scalars['String']>;
  sample_id?: Maybe<Scalars['String']>;
  sample_type?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  submitter_sample_id?: Maybe<Scalars['String']>;
};

export type FileEdge = {
  __typename?: 'fileEdge';
  node?: Maybe<FileNode>;
  searchAfter?: Maybe<Scalars['JSON']>;
};

export type FileFile = {
  __typename?: 'fileFile';
  index_file?: Maybe<FileFileIndex_File>;
  md5sum?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
};

export type FileFileIndex_File = {
  __typename?: 'fileFileIndex_file';
  file_type?: Maybe<Scalars['String']>;
  md5sum?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  object_id?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
};

export type FileMeta = {
  __typename?: 'fileMeta';
  embargo_stage?: Maybe<Scalars['String']>;
  release_state?: Maybe<Scalars['String']>;
  study_id?: Maybe<Scalars['String']>;
};

export type FileMetrics = {
  __typename?: 'fileMetrics';
  average_insert_size?: Maybe<Scalars['Float']>;
  average_length?: Maybe<Scalars['Float']>;
  duplicated_bases?: Maybe<Scalars['Float']>;
  error_rate?: Maybe<Scalars['Float']>;
  mapped_bases_cigar?: Maybe<Scalars['Float']>;
  mapped_reads?: Maybe<Scalars['Float']>;
  mismatch_bases?: Maybe<Scalars['Float']>;
  paired_reads?: Maybe<Scalars['Float']>;
  pairs_on_different_chromosomes?: Maybe<Scalars['Float']>;
  properly_paired_reads?: Maybe<Scalars['Float']>;
  total_bases?: Maybe<Scalars['Float']>;
  total_reads?: Maybe<Scalars['Float']>;
};

export type FileNode = Node & {
  __typename?: 'fileNode';
  analysis?: Maybe<FileAnalysis>;
  analysis_tools?: Maybe<Array<Maybe<Scalars['String']>>>;
  clinical?: Maybe<FileClinical>;
  data_category?: Maybe<Scalars['String']>;
  data_type?: Maybe<Scalars['String']>;
  donors?: Maybe<FileDonors>;
  embargo_stage?: Maybe<Scalars['String']>;
  file?: Maybe<FileFile>;
  file_access?: Maybe<Scalars['String']>;
  file_autocomplete?: Maybe<Array<Maybe<Scalars['String']>>>;
  file_id?: Maybe<Scalars['String']>;
  file_number?: Maybe<Scalars['Float']>;
  file_type?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  meta?: Maybe<FileMeta>;
  metrics?: Maybe<FileMetrics>;
  object_id?: Maybe<Scalars['String']>;
  program_access_date?: Maybe<Scalars['String']>;
  release_state?: Maybe<Scalars['String']>;
  repositories?: Maybe<FileRepositories>;
  score?: Maybe<Scalars['Int']>;
  study_id?: Maybe<Scalars['String']>;
};

export type FileRepositories = {
  __typename?: 'fileRepositories';
  aggregations?: Maybe<FileRepositoriesAggregations>;
  aggsState?: Maybe<AggsState>;
  columnsState?: Maybe<ColumnsState>;
  extended?: Maybe<Scalars['JSON']>;
  hits?: Maybe<FileRepositoriesConnection>;
  mapping?: Maybe<Scalars['JSON']>;
  matchBoxState?: Maybe<MatchBoxState>;
};

export type FileRepositoriesAggregationsArgs = {
  aggregations_filter_themselves?: InputMaybe<Scalars['Boolean']>;
  filters?: InputMaybe<Scalars['JSON']>;
  include_missing?: InputMaybe<Scalars['Boolean']>;
};

export type FileRepositoriesExtendedArgs = {
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FileRepositoriesHitsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSON']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['String']>;
  searchAfter?: InputMaybe<Scalars['JSON']>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
  trackTotalHits?: InputMaybe<Scalars['Boolean']>;
};

export type FileRepositoriesAggregations = {
  __typename?: 'fileRepositoriesAggregations';
  code?: Maybe<Aggregations>;
  country?: Maybe<Aggregations>;
  name?: Maybe<Aggregations>;
  organization?: Maybe<Aggregations>;
  url?: Maybe<Aggregations>;
};

export type FileRepositoriesConnection = {
  __typename?: 'fileRepositoriesConnection';
  edges?: Maybe<Array<Maybe<FileRepositoriesEdge>>>;
  total: Scalars['Int'];
};

export type FileRepositoriesEdge = {
  __typename?: 'fileRepositoriesEdge';
  node?: Maybe<FileRepositoriesNode>;
  searchAfter?: Maybe<Scalars['JSON']>;
};

export type FileRepositoriesNode = Node & {
  __typename?: 'fileRepositoriesNode';
  code?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  organization?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

export type Sets = {
  __typename?: 'sets';
  aggregations?: Maybe<SetsAggregations>;
  extended?: Maybe<Scalars['JSON']>;
  hits?: Maybe<SetsConnection>;
  mapping?: Maybe<Scalars['JSON']>;
};

export type SetsAggregationsArgs = {
  aggregations_filter_themselves?: InputMaybe<Scalars['Boolean']>;
  filters?: InputMaybe<Scalars['JSON']>;
  include_missing?: InputMaybe<Scalars['Boolean']>;
};

export type SetsExtendedArgs = {
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type SetsHitsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSON']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['String']>;
  searchAfter?: InputMaybe<Scalars['JSON']>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
  trackTotalHits?: InputMaybe<Scalars['Boolean']>;
};

export type SetsAggregations = {
  __typename?: 'setsAggregations';
  createdAt?: Maybe<NumericAggregations>;
  ids?: Maybe<Aggregations>;
  path?: Maybe<Aggregations>;
  setId?: Maybe<Aggregations>;
  size?: Maybe<NumericAggregations>;
  sqon?: Maybe<Aggregations>;
  type?: Maybe<Aggregations>;
  userId?: Maybe<Aggregations>;
};

export type SetsConnection = {
  __typename?: 'setsConnection';
  edges?: Maybe<Array<Maybe<SetsEdge>>>;
  total: Scalars['Int'];
};

export type SetsEdge = {
  __typename?: 'setsEdge';
  node?: Maybe<SetsNode>;
  searchAfter?: Maybe<Scalars['JSON']>;
};

export type SetsNode = Node & {
  __typename?: 'setsNode';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  ids?: Maybe<Array<Maybe<Scalars['String']>>>;
  path?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  setId?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  sqon?: Maybe<Scalars['JSON']>;
  type?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};
