import React from 'react';
import { SvelteComponent } from 'svelte/internal';
import SvelteDemo from './app.svelte';

export default () => {
  const [svelteComponent, setSvelteComponent] = React.useState<SvelteComponent>(null);
  const svelteDomNode = React.useRef();
  React.useEffect(() => {
    setSvelteComponent(
      new SvelteDemo({
        target: svelteDomNode.current,
      }),
    );
  }, []);
  console.log(svelteComponent);
  return <div ref={svelteDomNode} />;
};
