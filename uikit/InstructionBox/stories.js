// @flow
import { storiesOf } from '@storybook/react';
import React from 'react';
import InstructionBox from '.';
import Typography from 'uikit/Typography';

const InstructionBoxStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <div style={{ background: 'white' }}>
    <InstructionBox
      footer={<Typography variant="paragraph">Footer</Typography>}
      steps={[
        <Typography variant="paragraph">Item 1</Typography>,
        <Typography variant="paragraph">Item 2</Typography>,
        <Typography variant="paragraph">Item 3</Typography>,
      ]}
    />
  </div>
));

export default InstructionBoxStories;
