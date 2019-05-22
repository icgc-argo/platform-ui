import { storiesOf } from "@storybook/react";
import React, { useState } from "react";
import Radio from ".";
import { boolean, button } from "@storybook/addon-knobs";

const createKnobs = () => {
  const checked = boolean("checked", false);

  return {
    checked
  };
};

const RadioStories = storiesOf(`${__dirname}`, module).add("Basic", () => (
  <Radio {...createKnobs()}>My Selection</Radio>
));

export default RadioStories;
