// @flow
import * as React from 'react';

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
export type ClientSideGetInitialPropsContext = {
  pathname: $PropertyType<GetInitialPropsContext, 'pathname'>,
  query: $PropertyType<GetInitialPropsContext, 'query'>,
  asPath: $PropertyType<GetInitialPropsContext, 'asPath'>,
};
type GetInitialPropsContextWithEgo = GetInitialPropsContext & {
  egoJwt: string,
};
export type PageConfigProps = {
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
