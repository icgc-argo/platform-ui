// @flow
import { storiesOf } from '@storybook/react';
import React from 'react';
import ClipboardCopyField from '.';
import { text, boolean } from '@storybook/addon-knobs';

const ClipboardCopyFieldStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const knobs = {
    buttonText: text('buttonText', 'copy'),
    value: text('value', 'bf551c13e8bbf551csd42df343wrfwd3w4dfe43wrfe34d03'),
    tagText: text('tagText', 'Expires in: 5 days'),
    disabled: boolean('disabled', false),
    errorText: text('errorText', undefined),
    loading: boolean('loading', false),
  };
  return <ClipboardCopyField {...knobs} />;
});

export default ClipboardCopyFieldStories;
