import React from 'react';
import { MenuItem } from '../SubMenu';
import { css } from '@emotion/core';
import NumberRangeField from 'uikit/NumberRangeField';

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

  return (
    <>
      <MenuItem
        content={subMenuName}
        chevronOnLeftSide={true}
        css={css`
          width: 300px;
        `}
      >
        <MenuItem
          selected={false}
          level={1}
          content={
            <NumberRangeField
              min={minimumInput}
              max={maximumInput}
              minSetter={setMinimumInput}
              maxSetter={setMaximumInput}
              goButtonHandler={goButtonHandler}
              goButtonEnabled={inputsValid}
            />
          }
          contentAs="div"
        />
      </MenuItem>

      {/* for demonstration purposes only! to be removed upon implementation */}
      <div>{JSON.stringify(getRangeValues())}</div>
    </>
  );
};

export default IntegerFieldDisplay;
