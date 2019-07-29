//@flow
import * as React from 'react';
import type { ClientSideGetInitialPropsContext } from 'global/utils/pages/types';

export const PageContext = React.createContext<ClientSideGetInitialPropsContext>({
  pathname: '',
  query: {},
  asPath: '',
});

export default function usePageContext(): ClientSideGetInitialPropsContext {
  const pageContext = React.useContext(PageContext);
  return pageContext;
}
