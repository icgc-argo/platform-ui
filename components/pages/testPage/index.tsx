import React from 'react';
import ReactApp from './react/index';
import SvelteWrapper from './svelte';

export default () => {
  const [version, setVersion] = React.useState<'SVELTE' | 'REACT' | 'VANILLA'>('VANILLA');

  const onVersionSelect = (v: typeof version) => () => setVersion(v);

  return (
    <div>
      <div>
        <button
          style={{
            color: version === 'SVELTE' ? 'red' : 'black',
          }}
          onClick={onVersionSelect('SVELTE')}
        >
          svelte
        </button>
        <button
          style={{
            color: version === 'REACT' ? 'red' : 'black',
          }}
          onClick={onVersionSelect('REACT')}
        >
          react
        </button>
        <button
          style={{
            color: version === 'VANILLA' ? 'red' : 'black',
          }}
          onClick={onVersionSelect('VANILLA')}
        >
          vanilla
        </button>
      </div>
      <ReactApp />
      {
        ({
          SVELTE: <SvelteWrapper />,
          REACT: <ReactApp />,
          VANILLA: <div>not implemented</div>,
        } as { [k in typeof version]: any })[version]
      }
    </div>
  );
};
