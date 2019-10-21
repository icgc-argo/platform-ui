import { storiesOf } from '@storybook/react';
import { renderToString } from 'react-dom/server';
import { action } from '@storybook/addon-actions';
import { radios, boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import Button, { BUTTON_VARIANTS, BUTTON_SIZES } from '.';
import { asyncDummyFunc, placeholderImageURLRoot } from '../testUtil';

const dummyClick = action('Clicked!');

export const createKnobs = () => {
  const variant = radios('variant', BUTTON_VARIANTS);
  const size = radios('size', BUTTON_SIZES);
  const disabled = boolean('disabled', false);
  const isAsync = boolean('isAsync', false);
  const children = text('children', 'some button');

  const className = text('className', undefined);
  const id = text('id', undefined);

  return {
    variant,
    size,
    disabled,
    isAsync,
    children,
    className,
    id,
  };
};

const ButtonStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => {
    const props = createKnobs();
    return <Button {...props} onClick={props.isAsync ? asyncDummyFunc : dummyClick} />;
  })
  .add('Button with multiple child nodes', () => {
    const props = createKnobs();
    return (
      <Button {...props} onClick={props.isAsync ? asyncDummyFunc : dummyClick}>
        <img src={`${placeholderImageURLRoot}/12/20`} />
        <span style={{ color: '#64D518' }}>Red Span</span>
        <img src={`${placeholderImageURLRoot}/20/20`} />
        <img src={`${placeholderImageURLRoot}/7/7`} />
      </Button>
    );
  });

export default ButtonStories;
