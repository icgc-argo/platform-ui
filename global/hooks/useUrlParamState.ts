import React from 'react';
import { useRouter } from 'next/router';

export const getParams = (router: ReturnType<typeof useRouter>): { [k: string]: string } | null => {
  const queryString = router.asPath.split('?')[1] || '';
  const currentQueryEntries = [...new URLSearchParams(queryString).entries()];
  return currentQueryEntries.length
    ? currentQueryEntries.reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {})
    : {};
};

const getSanitizedValue = (v: string): null | undefined | string => {
  return (() => {
    switch (v) {
      case 'null':
        return null;
      case 'undefined':
        return undefined;
      case '':
        return undefined;
      default:
        return v;
    }
  })();
};

export const useHook = <T>(
  key: string,
  initialValue: T,
  {
    pushNavigation = false,
    serialize,
    deSerialize,
  }: {
    pushNavigation?: boolean;
    serialize: (val: T) => string;
    deSerialize: (val: string | null | undefined) => T;
  },
) => {
  const router = useRouter();
  const currentQuery = getParams(router);
  const [state, setState] = React.useState({ [key]: serialize(initialValue), ...currentQuery });

  // whether next-router is in sync with this local state
  const isInSync = currentQuery[key] === state[key];

  const setUrlState = (value: T) => {
    setState({
      ...state,
      [key]: serialize(value),
    });
  };

  // syncs state -> Next router
  React.useEffect(() => {
    if (!isInSync) {
      const newPath = `${router.asPath.split('?')[0]}?${new window.URLSearchParams(
        state,
      ).toString()}`;
      if (pushNavigation) {
        router.push(router.pathname, newPath);
      } else {
        router.replace(router.pathname, newPath);
      }
    }
  }, [state]);

  // syncs Next router -> state
  React.useEffect(() => {
    if (!isInSync) {
      setState({ [key]: serialize(initialValue), ...currentQuery });
    }
  }, [router.asPath]);

  const deserializeValue = (v: string) => {
    const sanitized = getSanitizedValue(v);
    return deSerialize(sanitized);
  };

  return [deserializeValue(state[key]), setUrlState] as [T, typeof setUrlState];
};

export default useHook;
