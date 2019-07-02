//@flow
import * as React from 'react';
import {
  LOCAL_STORAGE_REDIRECT_KEY,
  LOGIN_PAGE_PATH,
  PROGRAMS_LIST_PATH,
  PROGRAM_ENTITY_PATH,
  DCC_OVERVIEW_PATH,
  USER_PAGE_PATH,
} from '../constants';
import { isDccMember } from './egoJwt';

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
  pathname: string,
  query: {
    [key: string]: any,
  },
  asPath: string,
  req?: any,
  res?: any,
  err?: Error,
};
export type GetInitialPropsContextWithEgo = GetInitialPropsContext & {
  egoJwt: string,
};
type PageConfigProps = {
  isPublic: boolean,
  isAccessible: ({
    egoJwt: string,
    ctx: GetInitialPropsContext,
  }) => Promise<boolean>,
  getInitialProps: GetInitialPropsContextWithEgo => Promise<any>,
  getGqlQueriesToPrefetch: GetInitialPropsContextWithEgo => Promise<
    Array<{ query: any, variables?: { [key: string]: any } }>,
  >,
};
export type PageWithConfig = PageConfigProps & React.ComponentType<any>;
export const createPage = ({
  isPublic = false,
  isAccessible = async () => true,
  getInitialProps = async () => ({}),
  getGqlQueriesToPrefetch = async () => [],
}: {
  isPublic?: $PropertyType<PageConfigProps, 'isPublic'>,
  isAccessible?: $PropertyType<PageConfigProps, 'isAccessible'>,
  getInitialProps?: $PropertyType<PageConfigProps, 'getInitialProps'>,
  getGqlQueriesToPrefetch?: $PropertyType<PageConfigProps, 'getGqlQueriesToPrefetch'>,
}) => (page: Function = () => <div>Here's a page</div>): PageWithConfig => {
  page.isPublic = isPublic;
  page.isAccessible = isAccessible;
  page.getGqlQueriesToPrefetch = getGqlQueriesToPrefetch;
  page.getInitialProps = getInitialProps;
  return page;
};
