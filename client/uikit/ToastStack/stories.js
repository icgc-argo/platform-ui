import { storiesOf } from '@storybook/react';
import React from 'react';
import ToastStack from '.';
import { TOAST_VARIANTS } from '../Toast';
import Button from '../Button';
import { action } from '@storybook/addon-actions';

const ToastStackStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <ToastStack
    onInteraction={action('onInteraction')}
    toastConfigs={[
      {
        title: 'Hipster Ipsum',
        content:
          'Lorem ipsum dolor amet iPhone pabst celiac church-key chia intelligentsia meh tousled freegan',
      },
      {
        variant: TOAST_VARIANTS.SUCCESS,
        title: 'Hipster Ipsum',
        content:
          'Tilde gentrify single-origin coffee lo-fi roof party twee. Chillwave stumptown street art four dollar toast literally cred artisan',
      },
      {
        variant: TOAST_VARIANTS.WARNING,
        title: 'Hipster Ipsum',
        content: 'Cold-pressed beard narwhal ennui',
      },
      {
        variant: TOAST_VARIANTS.ERROR,
        title: 'Hipster Ipsum',
        content:
          'Thundercats la croix microdosing shoreditch, green juice VHS YOLO taxidermy adaptogen literally',
      },
    ]}
  />
));

export default ToastStackStories;
