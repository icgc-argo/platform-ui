import * as React from 'react';
import { ClientSideGetInitialPropsContext } from 'global/utils/pages/types';

export const PageContext = React.createContext<ClientSideGetInitialPropsContext>({
  pathname: '',
  query: {},
  asPath: '',
});

export default function usePageContext(): ClientSideGetInitialPropsContext {
  const pageContext = React.useContext(PageContext);
  return pageContext;
}

export const usePageQuery = <T extends { [k: string]: string }>() => {
  const { query } = usePageContext();
  return query as T;
};
