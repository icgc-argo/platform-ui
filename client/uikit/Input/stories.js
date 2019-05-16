import { storiesOf } from "@storybook/react";
import React from "react";
import Input from ".";
import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";

const createKnobs = () => {
  const error = boolean("error", error);
  const disabled = boolean("disabled", false);
  const value = text("Value", "I entered some input...");
  const placeholder = text("Placeholder", "State typing here..");
  const size = radios("size", {
    sm: "sm",
    lg: "lg"
  });

  return {
    error,
    disabled,
    value,
    placeholder,
    size
  };
};

const InputStories = storiesOf(`${__dirname}`, module).add("Basic", () => {
  const props = createKnobs();
  return <Input {...props} />;
});

export default InputStories;
