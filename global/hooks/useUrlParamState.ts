import React from 'react';
import { useRouter, Router } from 'next/router';

const isServerSide = () => typeof window === 'undefined';
const getParams = <T extends { [k: string]: string }>(): T | null => {
  const currentQueryEntries = !isServerSide()
    ? [...new URLSearchParams(window.location.search).entries()]
    : [];
  return currentQueryEntries.length
    ? currentQueryEntries.reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {} as T)
    : null;
};

export default <T extends { [key: string]: string }>(initialState: T) => {
  const router = useRouter();
  const currentQuery = getParams();
  const [state, setState] = React.useState(currentQuery || initialState);

  // syncs the Next router with state
  React.useEffect(() => {
    const newPath = `${window.location.pathname}?${new window.URLSearchParams(state).toString()}`;
    if (router.asPath !== newPath) {
      router.push(router.pathname, newPath);
    }
  }, [state]);

  // syncs state with Next router
  React.useEffect(() => {
    setState(getParams<T>() || initialState);
  }, [router.asPath]);
  return [state, setState] as [typeof state, typeof setState];
};
