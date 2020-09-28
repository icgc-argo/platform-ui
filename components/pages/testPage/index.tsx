import React from 'react';
import ReactApp from './reactApp/index';
import SvelteWrapper from './svelte';
import VanillaDomComponent from './vanilla';

export default () => {
  const [version, setVersion] = React.useState<'SVELTE' | 'REACT' | 'VANILLA'>('SVELTE');

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
      {
        ({
          SVELTE: <SvelteWrapper />,
          REACT: <ReactApp />,
          VANILLA: <VanillaDomComponent />,
        } as { [k in typeof version]: any })[version]
      }
    </div>
  );
};
