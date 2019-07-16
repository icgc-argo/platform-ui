import * as React from 'react';
import { PROGRAMS_LIST_PATH } from 'global/constants/pages';

export const getRedirectPathForUser = (egoJwt: string) => {
  /**
   * TODO: actually implement this function
   */
  return PROGRAMS_LIST_PATH;
  // if (isDccMember(egoJwt)) {
  //   return DCC_OVERVIEW_PATH;
  // } else {
  //   return USER_PAGE_PATH;
  // }
};

export type GetInitialPropsContext = {
  pathname: string;
  query: {
    [key: string]: any;
  };
  asPath: string;
  req?: any;
  res?: any;
  err?: Error;
};
export type GetInitialPropsContextWithEgo = GetInitialPropsContext & {
  egoJwt: string;
};
type PageConfigProps = {
  isPublic: boolean;
  isAccessible: ({ egoJwt: string, ctx: GetInitialPropsContext }) => Promise<boolean>;
  getInitialProps: (p: GetInitialPropsContextWithEgo) => Promise<any>;
  getGqlQueriesToPrefetch: (
    p: GetInitialPropsContextWithEgo,
  ) => Promise<Array<{ query: any; variables?: { [key: string]: any } }>>;
};
export type PageWithConfig = PageConfigProps & React.ComponentType<any>;

type CratePageConfig = {
  isPublic?: PageConfigProps['isPublic'];
  isAccessible?: PageConfigProps['isAccessible'];
  getInitialProps?: PageConfigProps['getInitialProps'];
  getGqlQueriesToPrefetch?: PageConfigProps['getGqlQueriesToPrefetch'];
};
export const createPage = ({
  isPublic = false,
  isAccessible = async () => true,
  getInitialProps = async () => ({}),
  getGqlQueriesToPrefetch = async () => [],
}: CratePageConfig) => (
  page: React.ComponentType<any> = () => <div>Here's a page</div>,
): PageWithConfig => {
  const pageWithConfig: typeof page & CratePageConfig = page;
  pageWithConfig.isPublic = isPublic;
  pageWithConfig.isAccessible = isAccessible;
  pageWithConfig.getGqlQueriesToPrefetch = getGqlQueriesToPrefetch;
  pageWithConfig.getInitialProps = getInitialProps;
  return pageWithConfig as PageWithConfig;
};
