import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import React from 'react';
import TitleBar from '.';

const createKnobs = () => {
  const className = text('className', undefined);
  const id = text('id', undefined);

  return {
    className,
    id,
  };
};

const TitleBarStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const props = createKnobs();
  return (
    <TitleBar {...props}>
      <>Program Name</>
      <>Subsection</>
    </TitleBar>
  );
});

export default TitleBarStories;
