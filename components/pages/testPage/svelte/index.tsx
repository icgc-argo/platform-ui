import React from 'react';
import SvelteComponent from './app.svelte';

export default () => {
  const [svelteComponent, setSvelteComponent] = React.useState<any>(null);
  const svelteDomNode = React.useRef();
  React.useEffect(() => {
    setSvelteComponent(
      new SvelteComponent({
        target: svelteDomNode.current,
      }),
    );
  }, []);
  return <div ref={svelteDomNode} />;
};
