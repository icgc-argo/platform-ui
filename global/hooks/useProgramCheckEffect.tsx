import { usePageQuery } from 'global/hooks/usePageContext';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ERROR_STATUS_KEY } from 'pages/_error';
import PROGRAM_SHORTNAME from './PROGRAM_SHORTNAME.gql';

export const useProgramCheckEffect = () => {
  const { shortName } = usePageQuery<{ shortName: string }>();
  console.log(shortName);
  const [programNotExist, setProgramNotExist] = useState(false);

  const { loading, data: { program = undefined } = {} } = useQuery<{
    program: { name: string };
  }>(PROGRAM_SHORTNAME, {
    variables: {
      shortName: shortName,
    },
  });

  useEffect(() => {
    if (loading) {
      setProgramNotExist(false);
    } else {
      setProgramNotExist(!program);
    }
  }, [program, loading]);

  if (programNotExist) {
    const err = new Error('Program not found') as Error & { statusCode?: number };
    err[ERROR_STATUS_KEY] = 404;
    throw err;
  }
};
