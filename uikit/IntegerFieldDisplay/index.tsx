import React from 'react';
import { MenuItem } from '../SubMenu';
import last from 'lodash/last';

import { css } from '@emotion/core';
import { Input } from 'uikit/form';

import { FieldDescriptionLabel, FieldInputWrapper } from './common';
import Button from 'uikit/Button';

const inputHandler = (
  inputVal: string,
  stateSetter: React.Dispatch<React.SetStateAction<string>>,
) => {
  const validator = new RegExp(/(^$|^\d+$)/);

  if (validator.test(inputVal)) stateSetter(inputVal);
};

const IntegerFieldDisplay = ({ subMenuName }: { subMenuName: string }) => {
  // must be initialized, use string to handle 'backspaces' from input field
  // parse to number upon use
  const [minimumInput, setMinimumInput] = React.useState('');
  const [maximumInput, setMaximumInput] = React.useState('');

  const getRangeValues = () => {
    return {
      min: parseInt(minimumInput),
      max: parseInt(maximumInput),
    };
  };

  const [inputsValid, setInputsValid] = React.useState(false);

  React.useEffect(() => {
    const { min, max } = getRangeValues();

    const atLeastOneProvided = !(isNaN(min) && isNaN(max));

    setInputsValid(atLeastOneProvided);
  }, [minimumInput, maximumInput]);

  const goButtonHandler = () => {
    const { min, max } = getRangeValues();

    if (min > max) {
      console.log('Invalid Range. Max must be larger than Min.');
    } else {
      console.log(`Running search between ${min} and ${max}`);
    }
  };

  const numberSelector = (
    <div
      css={css`
        display: flex;
        align-items: center;
        height: 32px;
      `}
    >
      <FieldDescriptionLabel>Min:</FieldDescriptionLabel>
      <FieldInputWrapper>
        <Input
          aria-label="minimum_input"
          placeholder="e.g. 0"
          size="sm"
          // not using type="number" since it causes problems with minus sign
          // they get registered as empty strings, which are required characters in order to allow backspaces on the input
          value={minimumInput}
          onChange={e => {
            inputHandler(e.target.value, setMinimumInput);
          }}
          getOverrideCss={() =>
            css`
              border-style: none;
            `
          }
        />
      </FieldInputWrapper>

      <FieldDescriptionLabel>Max:</FieldDescriptionLabel>

      <FieldInputWrapper>
        <Input
          aria-label="maximum_input"
          placeholder="e.g. 85"
          size="sm"
          value={maximumInput}
          onChange={e => {
            inputHandler(e.target.value, setMaximumInput);
          }}
          getOverrideCss={() =>
            css`
              border-style: none;
            `
          }
        />
      </FieldInputWrapper>

      <Button
        css={css`
          margin-left: 5px;
        `}
        variant="secondary"
        onClick={e => goButtonHandler()}
        disabled={!inputsValid}
      >
        GO
      </Button>
    </div>
  );

  return (
    <>
      <MenuItem
        content={subMenuName}
        chevronOnLeftSide={true}
        css={css`
          width: 300px;
        `}
      >
        <MenuItem selected={false} level={1} content={numberSelector} contentAs="div" />
      </MenuItem>

      {/* for demonstration purposes only! to be removed upon implementation */}
      <div>{JSON.stringify(getRangeValues())}</div>
    </>
  );
};

export default IntegerFieldDisplay;
