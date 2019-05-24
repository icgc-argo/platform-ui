import { storiesOf } from "@storybook/react";
import React, { useState } from "react";
import Radio from ".";
import { boolean, button } from "@storybook/addon-knobs";
import RadioCheckbox from ".";

const createKnobs = () => {
  const checked = boolean("checked", false);
  const disabled = boolean("disabled", false);

  return {
    checked,
    disabled
  };
};

const RadioStories = storiesOf(`${__dirname}`, module)
  .add("Radio", () => (
    <RadioCheckbox type="radio" {...createKnobs()}>
      My Selection
    </RadioCheckbox>
  ))
  .add("Checkbox", () => (
    <RadioCheckbox type="checkbox" {...createKnobs()}>
      My Selection
    </RadioCheckbox>
  ));

export default RadioStories;
