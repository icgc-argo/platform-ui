import { useQuery } from '@apollo/client';
import { useArrangerV3 } from 'components/pages/discovery/useArrangerV3';
import { FileCentricDocumentField } from '../types';
import {
  FILE_CENTRIC_EXTENDED_MAPPING_QUERY,
  FILE_CENTRIC_EXTENDED_MAPPING_QUERY_ARRANGER_V3,
} from './gql/FILE_CENTRIC_EXTENDED_MAPPING_QUERY';

export type ExtendedMapping = {
  displayName: string;
  field: FileCentricDocumentField;
}[];

const resolveData = ({ data, targetArrangerV3 }) => {
  if (targetArrangerV3) {
    return data.file.configs.extended.reduce(
      (acc, { displayName, fieldName }) => ({
        ...acc,
        [fieldName]: displayName,
      }),
      {},
    );
  } else {
    return data.file.extended.reduce(
      (acc, { displayName, field }) => ({
        ...acc,
        [field]: displayName,
      }),
      {},
    );
  }
};

const useFileCentricFieldDisplayName = (): {
  data: { [k in FileCentricDocumentField]: string } | {};
  loading: boolean;
} => {
  const { enabled: targetArrangerV3 } = useArrangerV3();
  const { data, loading } = useQuery<{ file: { extended: ExtendedMapping } }>(
    targetArrangerV3
      ? FILE_CENTRIC_EXTENDED_MAPPING_QUERY_ARRANGER_V3
      : FILE_CENTRIC_EXTENDED_MAPPING_QUERY,
  );

  return {
    // @ts-ignore this will result in unknown fields being present in run time, but that's why we have you Typescript!
    data: data ? resolveData({ data, targetArrangerV3 }) : {},
    loading,
  };
};
export default useFileCentricFieldDisplayName;
