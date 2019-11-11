import React from 'react';
import { useRouter } from 'next/router';

const getParams = (router: ReturnType<typeof useRouter>): { [k: string]: string } | null => {
  const queryString = router.asPath.split('?')[1] || '';
  const currentQueryEntries = [...new URLSearchParams(queryString).entries()];
  return currentQueryEntries.length
    ? currentQueryEntries.reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {})
    : {};
};

export default <T extends string>(
  key: string,
  initialValue: T,
  { pushNavigation = false } = {},
) => {
  const router = useRouter();
  const currentQuery = getParams(router);
  const [state, setState] = React.useState({ [key]: initialValue, ...currentQuery });

  // whether next-router is in sync with this local state
  const isInSync = currentQuery[key] === state[key];

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
      setState({ [key]: initialValue, ...currentQuery });
    }
  }, [router.asPath]);

  const setUrlState = (value: T) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  return [state[key], setUrlState] as [T, typeof setUrlState];
};
