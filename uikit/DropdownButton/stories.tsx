import { storiesOf } from '@storybook/react';
import React from 'react';
import DropdownButton from '.';
import { select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { createKnobs as createButtonKnobs } from 'uikit/Button/stories';
import Button from 'uikit/Button';

const DropdownButtonStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const knobs = createButtonKnobs();
  const menuShown = select('menuShown', {
    undefined: 'undefined',
    true: true,
    false: false,
  });
  return (
    <DropdownButton
      onItemClick={action('onItemClick')}
      menuItems={[
        { display: <strong>Some Text</strong>, value: '1' },
        { display: 'Some Text', value: '2' },
        { display: <Button size="sm">Some Text</Button>, value: '4' },
      ]}
      menuShown={menuShown}
      {...knobs}
    >
      Click me!
    </DropdownButton>
  );
});

export default DropdownButtonStories;
