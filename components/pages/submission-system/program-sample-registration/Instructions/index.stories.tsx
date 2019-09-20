import { storiesOf } from '@storybook/react';
import React from 'react';
import Instructions from '.';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

const InstructionsStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <div style={{ background: 'white' }}>
    <Instructions
      registrationEnabled={boolean('registrationEnabled', false)}
<<<<<<< HEAD:components/pages/submission-system/program-sample-registration/Instructions/index.stories.tsx
      onUpload={action('upload')}
      setRegisterState={() => ''}
      shortName={'PROGRAM-SHORTNAME'}
      registrationId={'123456'}
    />
=======
      showError={action('show error')}
    >
      Skeleton
    </Instructions>
>>>>>>> show error banner on invalid file upload:components/pages/submission-system/program-sample-registration/Instructions/index.stories.js
  </div>
));

export default InstructionsStories;
