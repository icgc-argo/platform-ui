import { storiesOf } from '@storybook/react';
import React from 'react';
import ToolTip from '.';
import Icon from '../Icon';
import Typography from 'uikit/Typography';

const ToolTipStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <ToolTip html={<span>yo</span>}>
    <img src="https://i.pinimg.com/originals/fa/0c/05/fa0c05778206cb2b2dddf89267b7a31c.jpg" />
  </ToolTip>
));

export default ToolTipStories;
