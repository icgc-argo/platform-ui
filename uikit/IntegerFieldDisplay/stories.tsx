import { storiesOf } from '@storybook/react';
import React from 'react';
import IntegerFieldDisplay from '.';

const IntegerFieldDisplayStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  return <IntegerFieldDisplay subMenuName="Age at Diagnosis" />;
});

export default IntegerFieldDisplayStories;
