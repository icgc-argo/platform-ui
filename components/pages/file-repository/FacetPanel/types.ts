import { OptionsListFilterOption } from '@icgc-argo/uikit';
import { FileCentricDocumentField } from '../types';
import { FileRepoFiltersType, RecursiveFilter } from '../utils/types';

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
  has_clinical_data = 'has_clinical_data',
}

type BucketAggregation = {
  key: string;
  key_as_string: string;
  doc_count: number;
};

type NumericAggregation = any;

export type SearchMenuDataNode = {
  resultId: string;
  secondaryText: string;
  subText?: string;
};

export type FacetDetails = {
  name: string;
  facetPath: FileFacetPath;
  variant: 'Basic' | 'Number' | 'Tooltip' | 'ClinicalData' | 'Other';
  esDocumentField: FileCentricDocumentField;
  highlight?: boolean;
  placeholderText?: string;
  tooltipContent?: string;
  searchQuery?: (
    searchValue: string,
    excludedIds: string[],
  ) => {
    data: FileIdSearchQueryData | DonorIdSearchQueryData;
    idSearchResults?: SearchMenuDataNode[];
    loading: boolean;
  };
};

export type GetAggregationResult = (queryData: FacetDetails) => OptionsListFilterOption[];

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

export type FileIdSearchQueryData = {
  file: {
    hits: {
      total: number;
      edges: IdSearchQueryDataNode[];
    };
  };
};

type DonorIdSearchQueryDataNode = {
  key: string;
  doc_count: number;
};

export type DonorIdSearchQueryData = {
  file: {
    aggregations: {
      donors__donor_id: {
        buckets: DonorIdSearchQueryDataNode[];
      };
      donors__submitter_donor_id: {
        buckets: DonorIdSearchQueryDataNode[];
      };
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
