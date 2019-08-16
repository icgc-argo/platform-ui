// @flow
import { storiesOf } from '@storybook/react';
import React from 'react';
import Tag from '.';
import Icon from '../Icon';

const TagStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => <Tag>Tag label</Tag>)
  .add('Tag with icon', () => (
    <Tag>
      Tag label&nbsp;&nbsp;
      <Icon width="8px" height="8px" name="times" fill="#fff" />
    </Tag>
  ));

export default TagStories;
