import { storiesOf } from '@storybook/react';
import React from 'react';
import SystemAlert, { Alert } from '.';
import { select, boolean } from '@storybook/addon-knobs';
import { find } from 'lodash';

type ModifiedAlert = Omit<Alert, 'dismissable'>;

const mockNotifications: Array<ModifiedAlert> = [
  {
    level: 'error',
    title: 'There is a system error occurring.',
  },
  {
    level: 'warning',
    title: 'There is system maintenance occurring.',
    message:
      'To learn what system maintenance is you can visit this [example link](https://google.com)',
  },
  {
    level: 'info',
    title: 'There is a new version of the dictionary available.',
    message:
      'Version 2.0 of the Data Dictionary was released on Jul. 2, 2020 at 3:12pm. Check out the version differences.',
  },
];

const getNewMessage = {
  original: (input: string) => input,
  short: (input: string) => input?.substring(0, 10),
  long: (
    input: string,
  ) => `${input}. Here is an example of a large message body. Bitters vinyl VHS blog dreamcatcher ramps.
  Readymade squid air plant, chicharrones jean shorts kitsch meggings occupy next level fixie 
  cold-pressed vegan fam intelligentsia gluten-free. Flannel next level schlitz try-hard. Bespoke 
  kickstarter edison bulb, street art taxidermy iPhone pitchfork woke fashion axe leggings af sartorial fanny pack.`,
};

const SystemAlertStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const variant = select('variant', [undefined, 'error', 'warning', 'info'], 'error');
  const dismissable = boolean('dismissable', true);

  const messageSize = select(' message length', ['original', 'short', 'long'], 'original');

  const defaultAlert = find(mockNotifications, (v) => v.level === variant);
  const [currentAlert, setCurrentAlert] = React.useState(defaultAlert);
  return currentAlert ? (
    <SystemAlert
      alert={{
        ...currentAlert,
        dismissable,
        message: getNewMessage[messageSize](currentAlert.message),
      }}
      onClose={() => setCurrentAlert(null)}
    />
  ) : (
    <div />
  );
});

export default SystemAlertStories;
