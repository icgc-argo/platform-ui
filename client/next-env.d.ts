declare module '*.gql' {
  import { DocumentNode } from 'graphql';

  const value: DocumentNode;
  export default value;
}

/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference path="./graphql.d.ts" />
