declare module '*.mdx' {
  import * as React from 'react';
  const MDXComponent: React.FC<Record<string, any>>;
  export default MDXComponent;
}