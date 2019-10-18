import * as React from 'react';
import { NextPageContext } from 'next';

export type GetInitialPropsContext = NextPageContext & {
  res?: NextPageContext['res'] & {
    redirect?: (s: string) => void;
  };
};
export type ClientSideGetInitialPropsContext = {
  pathname: GetInitialPropsContext['pathname'];
  query: GetInitialPropsContext['query'];
  asPath?: GetInitialPropsContext['asPath'];
};
type GetInitialPropsContextWithEgo = GetInitialPropsContext & {
  egoJwt?: string;
};
export type PageConfigProps = {
  isPublic: boolean;
  isAccessible: (args: { egoJwt?: string; ctx: GetInitialPropsContext }) => Promise<boolean>;
  getInitialProps: (args: GetInitialPropsContextWithEgo) => Promise<any>;
  getGqlQueriesToPrefetch: (
    args: GetInitialPropsContextWithEgo,
  ) => Promise<Array<{ query: any; variables?: { [key: string]: any } }>>;
};
export type PageWithConfig = PageConfigProps & React.ComponentType<any>;
