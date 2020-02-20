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

  const { setLoading, isLoading } = useGlobalLoadingState();
  useEffect(() => {
    // Generate a new loading modal ONLY if the program's existence is unknown
    if (!program && !isLoading) {
      setLoading(true);
    }
    // Check if the query to check for program existence has finished
    if (!loadingQuery) {
      // Now that loading is finished, the program must not exist. Break and send to 404.
      if (!program) {
        const err = new Error('Program not found') as Error & { statusCode?: number };
        err[ERROR_STATUS_KEY] = 404;
        throw err;
      }

      // Otherwise, the query result is back and the program does exist.
      // Wait for a small buffer time so the loading modal animation has enough time.
      else if (isLoading) {
        sleep(1200).then(() => setLoading(false));
      }
    }
  }, [program, loadingQuery]);
};
