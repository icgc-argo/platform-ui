import { storiesOf } from '@storybook/react';
import React from 'react';
import SystemAlert, { Alert } from '.';
import { select } from '@storybook/addon-knobs';
import { find } from 'lodash';

const mockNotifications: Array<Alert> = [
  {
    level: 'error',
    title: 'There is a system error occurring.',
    dismissable: false,
  },
  {
    level: 'warning',
    title: 'There is system maintenance occurring.',
    dismissable: true,
  },
  {
    level: 'info',
    title: 'There is a new version of the dictionary available.',
    message:
      'Version 2.0 of the Data Dictionary was released on Jul. 2, 2020 at 3:12pm. Check out the version differences.',
    dismissable: true,
  },
];

const SystemAlertStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const variant = select('variant', [undefined, 'error', 'warning', 'info'], 'error');
  const defaultAlert = find(mockNotifications, (v) => v.level === variant);
  const [currentAlert, setCurrentAlert] = React.useState(defaultAlert);
  return currentAlert ? (
    <SystemAlert alert={currentAlert} onClose={() => setCurrentAlert(null)} />
  ) : (
    <div>No alerts</div>
  );
});

export default SystemAlertStories;
