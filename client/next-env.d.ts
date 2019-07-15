declare module '*.gql' {
  import { DocumentNode } from 'graphql';

  const value: DocumentNode;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

/// <reference types="next" />
/// <reference types="next/types/global" />
