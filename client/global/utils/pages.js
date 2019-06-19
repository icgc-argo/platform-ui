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
  if (isDccMember(egoJwt)) {
    return DCC_OVERVIEW_PATH;
  } else {
    return USER_PAGE_PATH;
  }
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
  getPreCachedGqlQueries: GetInitialPropsContextWithEgo => Promise<
    Array<{ query: any, variables: { [key: string]: any } }>,
  >,
};
export type PageWithConfig = PageConfigProps & React.ComponentType<any>;
export const createPage = ({
  isPublic = false,
  isAccessible = async () => true,
  getInitialProps = async () => ({}),
  getPreCachedGqlQueries = async () => [],
}: {
  isPublic?: $PropertyType<PageConfigProps, 'isPublic'>,
  isAccessible?: $PropertyType<PageConfigProps, 'isAccessible'>,
  getInitialProps?: $PropertyType<PageConfigProps, 'getInitialProps'>,
  getPreCachedGqlQueries?: $PropertyType<PageConfigProps, 'getPreCachedGqlQueries'>,
}) => (page: Function = () => <div>Here's a page</div>): PageWithConfig => {
  page.isPublic = isPublic;
  page.isAccessible = isAccessible;
  page.getPreCachedGqlQueries = getPreCachedGqlQueries;
  page.getInitialProps = getInitialProps;
  return page;
};
