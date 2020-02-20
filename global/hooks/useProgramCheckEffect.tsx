import { usePageQuery } from 'global/hooks/usePageContext';
import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ERROR_STATUS_KEY } from 'pages/_error';
import PROGRAM_SHORTNAME from './PROGRAM_SHORTNAME.gql';
import { useGlobalLoadingState } from 'components/ApplicationRoot';
import { sleep } from 'global/utils/common';

export const useProgramCheckEffect = () => {
  const { shortName } = usePageQuery<{ shortName: string }>();
  const { loading: loadingQuery, data: { program = undefined } = {} } = useQuery<{
    program: { name: string; shortName: string };
  }>(PROGRAM_SHORTNAME, {
    variables: {
      shortName: shortName,
    },
  });

  const { setLoading: setLoaderShown, isLoading: isLoaderShown } = useGlobalLoadingState();
  useEffect(() => {
    if (!program && !isLoaderShown) {
      setLoaderShown(true);
    }
    if (!loadingQuery) {
      if (!program) {
        const err = new Error('Program not found') as Error & { statusCode?: number };
        err[ERROR_STATUS_KEY] = 404;
        throw err;
      } else if (isLoaderShown) {
        sleep(1200).then(() => setLoaderShown(false));
      }
    }
  }, [program, loadingQuery]);
};
