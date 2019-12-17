import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import React from 'react';
import Tag from '.';
import Icon from '../Icon';

const TagStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => <Tag> {text('Tag label', 'Tag label')}</Tag>)
  .add('Tag with icon', () => (
    <Tag>
      Tag label&nbsp;&nbsp;
      <Icon width="8px" height="8px" name="times" fill="#fff" />
    </Tag>
  ))
  .add('Tag with override style', () => <Tag style={{ backgroundColor: 'red' }}>Tag label</Tag>);

export default TagStories;
