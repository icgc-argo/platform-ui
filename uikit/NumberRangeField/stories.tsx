import { storiesOf } from '@storybook/react';
import React from 'react';
import NumberRangeField from '.';
import { boolean } from '@storybook/addon-knobs';

export const createKnobs = () => {
  const goButtonEnabled = boolean('is the go button enabled', false);

  return {
    goButtonEnabled,
  };
};

const NumberRangeFieldStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const props = createKnobs();
  const [minimumInput, setMinimumInput] = React.useState('');
  const [maximumInput, setMaximumInput] = React.useState('');
  console.log(props);
  return (
    <NumberRangeField
      min={minimumInput}
      onMinChange={setMinimumInput}
      max={maximumInput}
      onMaxChange={setMaximumInput}
      onGoClick={() => alert(`You set min to ${minimumInput} and max to ${maximumInput}`)}
      {...props}
    />
  );
});

export default NumberRangeFieldStories;
