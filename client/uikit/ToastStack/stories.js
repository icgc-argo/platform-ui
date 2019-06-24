import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ToastStack from '.';
import { TOAST_VARIANTS } from '../Toast';
import Button from 'uikit/Button';

const State = ({ children }) => {
  const [stack, setStack] = React.useState([
    {
      id: String(Math.random()),
      variant: TOAST_VARIANTS.SUCCESS,
      title: 'Hipster Ipsum',
      content:
        'Tilde gentrify single-origin coffee lo-fi roof party twee. Chillwave stumptown street art four dollar toast literally cred artisan',
    },
    {
      id: String(Math.random()),
      variant: TOAST_VARIANTS.WARNING,
      title: 'Hipster Ipsum',
      content: 'Cold-pressed beard narwhal ennui',
    },
    {
      id: String(Math.random()),
      variant: TOAST_VARIANTS.ERROR,
      title: 'Hipster Ipsum',
      content:
        'Thundercats la croix microdosing shoreditch, green juice VHS YOLO taxidermy adaptogen literally',
    },
  ]);
  const onInteraction = data => {
    const { id } = data;
    setStack(stack.filter(({ id: _id }) => id !== _id));
    action('onInteraction')(data);
  };
  return React.cloneElement(children, {
    onInteraction,
    toastConfigs: stack,
  });
};

const ToastStackStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <State>
    <ToastStack
      onInteraction="[parent func]"
      toastConfigs={[
        {
          id: String(Math.random()),
          variant: TOAST_VARIANTS.SUCCESS,
          title: 'Hipster Ipsum',
          content:
            'Tilde gentrify single-origin coffee lo-fi roof party twee. Chillwave stumptown street art four dollar toast literally cred artisan',
        },
        {
          id: String(Math.random()),
          variant: TOAST_VARIANTS.WARNING,
          title: 'Hipster Ipsum',
          content: 'Cold-pressed beard narwhal ennui',
        },
        {
          id: String(Math.random()),
          variant: TOAST_VARIANTS.ERROR,
          title: 'Hipster Ipsum',
          content:
            'Thundercats la croix microdosing shoreditch, green juice VHS YOLO taxidermy adaptogen literally',
        },
      ]}
    />
  </State>
));

export default ToastStackStories;
