import { storiesOf } from '@storybook/react';
import React from 'react';
import Checkbox, { STYLEDCHECKBOX_SIZES } from '.';
import { boolean, radios } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

const createKnobs = () => {
  const checked = boolean('checked', false);
  const disabled = boolean('disabled', false);
  const size = radios('size', STYLEDCHECKBOX_SIZES);

  return {
    checked,
    disabled,
    size,
  };
};

const CheckboxStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <Checkbox
    value="example"
    {...createKnobs()}
    onChange={action('onchange')}
    aria-label="checkbox"
  />
));

export default CheckboxStories;
