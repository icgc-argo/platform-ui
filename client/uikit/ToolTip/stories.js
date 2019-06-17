import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { radios, select, boolean, number } from '@storybook/addon-knobs';

import readme from './readme.md';
import Tooltip from '.';
import Icon from '../Icon';

const TooltipStories = storiesOf(`${__dirname}`, module).add(
  'Basic',
  () => {
    const knobs = {
      disabled: boolean('disabled', false),
      open: boolean('open', undefined),
      useContext: boolean('useContext', undefined),
      position: select('position', ['top', 'bottom', 'left', 'right'], 'bottom'),
      trigger: select('trigger', ['mouseenter', 'focus', 'click', 'manual'], undefined),
      tabIndex: number('tabIndex', undefined),
      interactive: boolean('interactive', undefined),
      interactiveBorder: number('interactiveBorder', undefined),
      delay: number('delay', undefined),
      hideDelay: number('hideDelay', undefined),
      animation: select('animation', ['shift', 'perspective', 'fade', 'scale', 'none'], undefined),
      animateFill: boolean('animateFill', undefined),
      duration: number('duration', undefined),
      distance: number('distance', undefined),
      offset: number('offset', undefined),
      hideOnClick: select('hideOnClick', [true, false, 'persistent'], undefined),
      multiple: boolean('multiple', undefined),
      followCursor: boolean('followCursor', undefined),
      inertia: boolean('inertia', undefined),
      transitionFlip: boolean('transitionFlip', undefined),
      unmountHTMLWhenHide: boolean('unmountHTMLWhenHide', undefined),
      sticky: boolean('sticky', undefined),
      stickyDuration: number('stickyDuration', undefined),
      touchHold: boolean('touchHold', undefined),
    };
    return (
      <div style={{ width: 200 }}>
        <div>Hover me!!!</div>
        <Tooltip
          html={<span>Doge~~~!!!!</span>}
          onRequestClose={action('onRequestClose')}
          onShow={action('onShow')}
          onShown={action('onShown')}
          onHide={action('onHide')}
          onHidden={action('onHidden')}
          {...knobs}
        >
          <img
            style={{ width: 50, borderRadius: 100 }}
            src="https://i.pinimg.com/originals/fa/0c/05/fa0c05778206cb2b2dddf89267b7a31c.jpg"
          />
        </Tooltip>
      </div>
    );
  },
  {
    info: {
      text: `${readme}`,
    },
  },
);

export default TooltipStories;
