import { storiesOf } from '@storybook/react';
import React from 'react';
import Container from '.';
import { ClassNames } from '@emotion/core';

const ContainerStories = storiesOf(`${__dirname}`, module).add(
  'Basic',
  () => (
    <ClassNames>
      {({ css }) => (
        <Container
          className={css`
            width: 174px;
            height: 130px;
          `}
        />
      )}
    </ClassNames>
  ),
  {
    info: {},
  },
);

export default ContainerStories;
