import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ToastStack from '.';
import { TOAST_VARIANTS } from '../Toast';
import Button from 'uikit/Button';

const Story = () => {
  const [stack, setStack] = React.useState([
    {
      id: String(Math.random()),
      title: 'Hipster Ipsum',
      content:
        'Lorem ipsum dolor amet iPhone pabst celiac church-key chia intelligentsia meh tousled freegan',
    },
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
  const push = () =>
    setStack(stack => [
      ...stack,
      {
        id: String(Math.random()),
        title: 'Hipster Ipsum',
        content:
          'Lorem ipsum dolor amet iPhone pabst celiac church-key chia intelligentsia meh tousled freegan',
      },
    ]);
  const pop = () => setStack(stack => stack.slice(0, stack.length - 1));
  return (
    <div>
      <ToastStack onInteraction={action('onInteraction')} toastConfigs={stack} />
      <Button onClick={push}>Push</Button>
      <Button onClick={pop}>Pop</Button>
    </div>
  );
};

const ToastStackStories = storiesOf(`${__dirname}`, module).add('Basic', () => <Story />);

export default ToastStackStories;
