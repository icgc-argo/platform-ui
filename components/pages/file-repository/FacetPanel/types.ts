import { FilterOption } from 'uikit/OptionsList';
import { DonorRecord } from 'components/pages/file-entity/types';
import { FileRepoFiltersType, RecursiveFilter } from '../utils/types';
import { FileCentricDocumentField } from '../types';

export enum FileFacetPath {
  study_id = 'study_id',
  analysis__experiment__experimental_strategy = 'analysis__experiment__experimental_strategy',
  file_id = 'file_id',
  file_type = 'file_type',
  file_access = 'file_access',
  data_category = 'data_category',
  data_type = 'data_type',
  analysis_tools = 'analysis_tools',
  object_id = 'object_id',
  donor_id = 'donor_id',
  donors__specimens__specimen_type = 'donors__specimens__specimen_type',
  donors__specimens__specimen_tissue_source = 'donors__specimens__specimen_tissue_source',
  analysis__workflow__workflow_name = 'analysis__workflow__workflow_name',
  release_state = 'release_state',
  embargo_stage = 'embargo_stage',
}

type BucketAggregation = {
  key: string;
  doc_count: number;
};

type NumericAggregation = any;

export type SearchMenuDataNode = {
  primary: string;
  secondary: string;
  tertiary: string;
};

export type FacetDetails = {
  name: string;
  facetPath: FileFacetPath;
  variant: 'Basic' | 'Number' | 'Tooltip' | 'Other';
  esDocumentField: FileCentricDocumentField;
  highlight?: boolean;
  placeholderText?: string;
  tooltipContent?: string;
  searchQuery?: (
    searchValue: string,
    excludedIds: string[],
  ) => { data: IdSearchQueryData; loading: boolean };
  getNodeData?: (nodes: Array<IdSearchQueryDataNode>) => Array<SearchMenuDataNode>;
};

export type GetAggregationResult = (queryData: FacetDetails) => FilterOption[];

export type FileRepoFacetsQueryData = {
  file: {
    aggregations: {
      [FileFacetPath.study_id]: {
        buckets: BucketAggregation[];
      };
      [FileFacetPath.analysis__experiment__experimental_strategy]: {
        buckets: BucketAggregation[];
      };
      [FileFacetPath.file_type]: {
        buckets: BucketAggregation[];
      };
      [FileFacetPath.file_access]: {
        buckets: BucketAggregation[];
      };
      [FileFacetPath.data_category]: {
        buckets: BucketAggregation[];
      };
      [FileFacetPath.data_type]: {
        buckets: BucketAggregation[];
      };
      [FileFacetPath.analysis_tools]: {
        buckets: BucketAggregation[];
      };
      [FileFacetPath.donors__specimens__specimen_type]: {
        buckets: BucketAggregation[];
      };
      [FileFacetPath.donors__specimens__specimen_tissue_source]: {
        buckets: BucketAggregation[];
      };
      [FileFacetPath.analysis__workflow__workflow_name]: {
        buckets: BucketAggregation[];
      };
      [FileFacetPath.release_state]: {
        buckets: BucketAggregation[];
      };
      [FileFacetPath.embargo_stage]: {
        buckets: BucketAggregation[];
      };
    };
  };
};

export type FileRepoFacetsQueryVariables = {
  filters: FileRepoFiltersType;
};

type IdSearchQueryDataNode = {
  node: {
    file_id: string;
    data_category: string;
    study_id: string;
    donors: {
      hits: {
        edges: Array<{ node: fileDonorsNode }>;
      };
    };
  };
};

export type IdSearchQueryData = {
  file: {
    hits: {
      total: number;
      edges: IdSearchQueryDataNode[];
    };
  };
};

export type IdSearchQueryVariables = {
  filters: RecursiveFilter;
};

export type fileDonorsNode = {
  donor_id: string;
  submitter_donor_id: string;
};
