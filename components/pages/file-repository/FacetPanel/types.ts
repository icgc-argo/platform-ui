import { FileRepoFiltersType, RecursiveFilter } from '../utils/types';
import { FilterOption } from 'uikit/OptionsList';
import { FileCentricDocumentField } from '../types';

export enum FileFacetPath {
  study_id = 'study_id',
  donors__gender = 'donors__gender',
  analysis__experiment__experimental_strategy = 'analysis__experiment__experimental_strategy',
  data_type = 'data_type',
  file_type = 'file_type',
  analysis__variant_class = 'analysis__variant_class',
  file_access = 'file_access',
  data_category = 'data_category',
  analysis_tools = 'analysis_tools',
  object_id = 'object_id',
  donors__specimens__specimen_type = 'donors__specimens__specimen_type',
  donors__specimens__specimen_tissue_source = 'donors__specimens__specimen_tissue_source',
  analysis__workflow__workflow_name = 'analysis__workflow__workflow_name',
}

type BucketAggregation = {
  key: string;
  doc_count: number;
};

type NumericAggregation = any;

export type FacetDetails = {
  name: string;
  facetPath: FileFacetPath;
  variant: 'Basic' | 'Number' | 'Other';
  esDocumentField: FileCentricDocumentField;
};

export type GetAggregationResult = (queryData: FacetDetails) => FilterOption[];

export type FileRepoFacetsQueryData = {
  file: {
    aggregations: {
      [FileFacetPath.study_id]: {
        buckets: BucketAggregation[];
      };
      [FileFacetPath.donors__gender]: {
        buckets: BucketAggregation[];
      };
      [FileFacetPath.analysis__experiment__experimental_strategy]: {
        buckets: BucketAggregation[];
      };
      [FileFacetPath.data_type]: {
        buckets: BucketAggregation[];
      };
      [FileFacetPath.file_type]: {
        buckets: BucketAggregation[];
      };
      [FileFacetPath.analysis__variant_class]: {
        buckets: BucketAggregation[];
      };
      [FileFacetPath.file_access]: {
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
    object_id: string;
    file: {
      name: string;
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
