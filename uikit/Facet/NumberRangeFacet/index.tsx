import React from 'react';
import { MenuItem } from '../../SubMenu';

import { css } from '@emotion/core';
import NumberRangeField from 'uikit/NumberRangeField';

const NumberRangeFacet = ({
  subMenuName,
  isExpanded,
  onClick,
  onChange,
}: {
  subMenuName: string;
  isExpanded?: boolean;
  onClick?: (e: any) => void;
  onChange: (min: number, max: number) => void;
}) => {
  // must be initialized, use string to handle 'backspaces' from input field
  // parse to number upon use
  const [minimumInput, setMinimumInput] = React.useState('');
  const [maximumInput, setMaximumInput] = React.useState('');

  const getRangeValues = () => {
    return {
      min: parseFloat(minimumInput),
      max: parseFloat(maximumInput),
    };
  };

  const [inputsValid, setInputsValid] = React.useState(false);

  const validator = (i: number) => i >= 0;

  React.useEffect(() => {
    const { min, max } = getRangeValues();
    const atLeastOneProvided = !(isNaN(min) && isNaN(max));
    const validIfProvided = input => (input === '' ? true : validator(input));

    setInputsValid(
      atLeastOneProvided && (validIfProvided(minimumInput) && validIfProvided(maximumInput)),
    );
  }, [minimumInput, maximumInput]);

  const goButtonHandler = () => {
    const { min, max } = getRangeValues();
    onChange(min, max);
    setMinimumInput('');
    setMaximumInput('');
  };

  return (
    <MenuItem
      onClick={onClick}
      selected={isExpanded}
      isFacetVariant={true}
      className="FacetMenu"
      content={subMenuName}
      chevronOnLeftSide={true}
      css={css`
        width: 300px;
      `}
    >
      <MenuItem
        className="FacetContentSlim"
        selected={false}
        level={1}
        content={
          <NumberRangeField
            min={minimumInput}
            max={maximumInput}
            onMinChange={setMinimumInput}
            onMaxChange={setMaximumInput}
            onGoClick={goButtonHandler}
            goButtonEnabled={inputsValid}
            validation={validator}
          />
        }
        contentAs="div"
      />
    </MenuItem>
  );
};

export default NumberRangeFacet;
