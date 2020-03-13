import React from 'react';
import { storiesOf } from '@storybook/react';
import useClickAway from '.';
import { action } from '@storybook/addon-actions';

export default storiesOf(`${__dirname}`, module).add(
  'Basic',
  () => {
    const ref = React.createRef<HTMLButtonElement>();
    useClickAway({
      domElementRef: ref,
      onClickAway: action('onClickAway'),
      onElementClick: action('onElementClick'),
    });
    return (
      <button
        ref={ref}
      >{`I have "ref={ref}". click me, then click away while looking at "Action" tab`}</button>
    );
  },
  {
    info: {
      text: `
      This is a convenient hook for implementing clickaways. While using this hook, do not use an \`onClick\` handler on your DOM element. Instead, attach a ref to it, and pass \`useClickAway\` the callback under \`onElementClick\`.

      Observe the *Action* tab to see events from this hook.
      `,
    },
  },
);
