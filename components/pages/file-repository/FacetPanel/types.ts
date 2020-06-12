import { FileRepoFiltersType } from '../utils/types';
import { FileCentricDocumentField } from '../FileTable/types';
import { FilterOption } from 'uikit/OptionsList';

export enum FileFacetPath {
  study_id = 'study_id',
  donors__gender = 'donors__gender',
  analysis__experiment__experimental_strategy = 'analysis__experiment__experimental_strategy',
  data_type = 'data_type',
  file_type = 'file_type',
  variant_class = 'variant_class',
  file_access = 'file_access',
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
      [FileFacetPath.variant_class]: {
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
