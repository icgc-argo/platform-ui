import { useQuery } from '@apollo/react-hooks';
import FILE_CENTRIC_EXTENDED_MAPPING from './FILE_CENTRIC_EXTENDED_MAPPING.gql';
import { FileCentricDocumentField } from '../FileTable/types';

type ExtendedMapping = {
  displayName: string;
  field: FileCentricDocumentField;
}[];

const useFileCentricFieldDisplayName = (): {
  data: { [k in FileCentricDocumentField]: string } | {};
  loading: boolean;
} => {
  const { data, loading } = useQuery<{ file: { extended: ExtendedMapping } }>(
    FILE_CENTRIC_EXTENDED_MAPPING,
  );

  return {
    // @ts-ignore this will result in unknown fields being present in run time, but that's why we have you Typescript!
    data: data
      ? data.file.extended.reduce(
          (acc, { displayName, field }) => ({
            ...acc,
            [field]: displayName,
          }),
          {},
        )
      : {},
    loading,
  };
};
export default useFileCentricFieldDisplayName;
