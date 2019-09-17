
import { storiesOf } from '@storybook/react';
import React from 'react';
import Instructions from '.';
import { text, boolean } from '@storybook/addon-knobs';

const InstructionsStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <div style={{ background: 'white' }}>
    <Instructions registrationEnabled={boolean('registrationEnabled', false)}>
      Skeleton
    </Instructions>
  </div>
));

export default InstructionsStories;
