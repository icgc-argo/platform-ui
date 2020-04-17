import { css } from '@emotion/core';
import { FieldDescriptionLabel, FieldInputWrapper } from './common';

import Input from 'uikit/form/Input';
import Button from 'uikit/Button';

const inputHandler = (
  inputVal: string,
  stateSetter: React.Dispatch<React.SetStateAction<string>>,
) => {
  const validator = new RegExp(/(^$|^\d+$)/);

  if (validator.test(inputVal)) stateSetter(inputVal);
};

// Working example lives inside the Integer Field Display Story

const NumberRangeField: React.ComponentType<{
  min: string;
  onMinChange: React.Dispatch<React.SetStateAction<string>>;
  max: string;
  onMaxChange: React.Dispatch<React.SetStateAction<string>>;
  onGoClick: () => any;
  goButtonEnabled: boolean;
}> = ({ min, onMinChange, max, onMaxChange, onGoClick, goButtonEnabled }) => {
  return (
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
          value={min}
          onChange={e => {
            inputHandler(e.target.value, onMinChange);
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
          value={max}
          onChange={e => {
            inputHandler(e.target.value, onMaxChange);
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
        onClick={e => onGoClick()}
        disabled={!goButtonEnabled}
      >
        GO
      </Button>
    </div>
  );
};

export default NumberRangeField;
