
import React from 'react';

import { storiesOf } from '@storybook/react';
import JoinProgramForm from '.';
import { action } from '@storybook/addon-actions';

const FooterStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <JoinProgramForm
    programName="Pancreatic Cancer - AU"
    userRole="Program Administrator"
    onSubmit={action('onSubmit')}
    institutions={['Famous University', 'Some Science Lab']}
  />
));

export default FooterStories;
