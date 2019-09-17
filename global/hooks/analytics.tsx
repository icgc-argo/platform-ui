
import React from 'react';
import ReactGA from 'react-ga';
import usePageContext from './usePageContext';

export const useModalViewAnalyticsEffect = (name: string, isShown: boolean) => {
  const pageContext = usePageContext();
  React.useEffect(() => {
    if (isShown) {
      ReactGA.modalview(`${pageContext.asPath}:${name}`);
    }
  }, [isShown]);
};
