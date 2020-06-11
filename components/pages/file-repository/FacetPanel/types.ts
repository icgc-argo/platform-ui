import { FileRepoFiltersType } from '../utils/types';
import { FileCentricDocumentField } from '../FileTable/types';

export enum FileFacetPath {
  study_id = 'study_id',
  donors__gender = 'donors__gender',
  analysis__experiment__experimental_strategy = 'analysis__experiment__experimental_strategy',
  data_type = 'data_type',
  file_type = 'file_type',
  variant_class = 'variant_class',
  file_access = 'file_access',
}

export type FacetDetails = {
  name: string;
  facetPath: FileFacetPath;
  variant: 'Basic' | 'Number' | 'Other';
  esDocumentField: FileCentricDocumentField;
  //   getAggregationResult: (queryData: AggregationQueryData) => BucketAggregation | NumericAggregation
};

type FacetBucket = {
  key: string;
  doc_count: number;
};

export type FileRepoFacetsQueryData = {
  file: {
    aggregations: {
      [FileFacetPath.study_id]: {
        buckets: FacetBucket[];
      };
      [FileFacetPath.donors__gender]: {
        buckets: FacetBucket[];
      };
      [FileFacetPath.analysis__experiment__experimental_strategy]: {
        buckets: FacetBucket[];
      };
      [FileFacetPath.data_type]: {
        buckets: FacetBucket[];
      };
      [FileFacetPath.file_type]: {
        buckets: FacetBucket[];
      };
      [FileFacetPath.variant_class]: {
        buckets: FacetBucket[];
      };
      [FileFacetPath.file_access]: {
        buckets: FacetBucket[];
      };
    };
  };
};

export type FileRepoFacetsQueryVariables = {
  filters: FileRepoFiltersType;
};
