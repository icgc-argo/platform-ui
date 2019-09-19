/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.md' {
  const content: string;
  export default content;
}
