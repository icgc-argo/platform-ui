import { css } from '@emotion/core';
import { FieldDescriptionLabel, FieldInputWrapper } from './common';
import React from 'react';
import Input from 'uikit/form/Input';
import Button from 'uikit/Button';
import { useTheme } from 'uikit/ThemeProvider';
import Typography from 'uikit/Typography';

const NumberRangeField: React.ComponentType<{
  min: string;
  onMinChange: React.Dispatch<React.SetStateAction<string>>;
  max: string;
  onMaxChange: React.Dispatch<React.SetStateAction<string>>;
  onGoClick: () => any;
  goButtonEnabled: boolean;
  validation?: (i: number) => boolean;
}> = ({
  min,
  onMinChange,
  max,
  onMaxChange,
  onGoClick,
  goButtonEnabled,
  validation = i => true,
}) => {
  const theme = useTheme();
  const [minErrorState, setMinErrorState] = React.useState(false);
  const [maxErrorState, setMaxErrorState] = React.useState(false);

  const errorMsg = (
    <Typography variant={'caption'} color={theme.colors.error}>
      Invalid
    </Typography>
  );

  const isInputInvalid = (input: string) => {
    const numberInput = Number(input);
    return isNaN(numberInput) || !validation(numberInput);
  };

  return (
    <div
      css={css`
        ${css(theme.typography.default as any)}
        display: flex;
        align-items: flex-start;
        width: 100%;
      `}
    >
      <FieldDescriptionLabel>Min:</FieldDescriptionLabel>
      <FieldInputWrapper>
        <Input
          error={minErrorState}
          aria-label="minimum_input"
          placeholder="e.g. 0"
          size="sm"
          value={min}
          onChange={e => {
            onMinChange(e.target.value);
          }}
          onBlur={e => {
            setMinErrorState(isInputInvalid(e.target.value));
          }}
          getOverrideCss={() =>
            css`
              border-radius: 0px;
              ${css(theme.typography.data as any)}
            `
          }
        />
        {minErrorState && errorMsg}
      </FieldInputWrapper>

      <FieldDescriptionLabel>Max:</FieldDescriptionLabel>

      <FieldInputWrapper>
        <Input
          error={maxErrorState}
          aria-label="maximum_input"
          placeholder="e.g. 85"
          size="sm"
          value={max}
          onChange={e => {
            onMaxChange(e.target.value);
          }}
          onBlur={e => {
            setMaxErrorState(isInputInvalid(e.target.value));
          }}
          getOverrideCss={() =>
            css`
              border-radius: 0px 8px 8px 0px;
              ${css(theme.typography.data as any)}
            `
          }
        />
        {maxErrorState && errorMsg}
      </FieldInputWrapper>

      <Button
        css={css`
          margin: 2px 0px 0px 5px;
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
