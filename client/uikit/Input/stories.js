import { storiesOf } from "@storybook/react";
import React from "react";
import Input from ".";
import { text, boolean, radios } from "@storybook/addon-knobs";
import Icon from "../Icon";

const createKnobs = () => {
  const error = boolean("error", false);
  const disabled = boolean("disabled", false);
  const placeholder = text("Placeholder", "Start typing here..");
  const errorMessage = text(
    "Error Message",
    "Please fill out the required field."
  );
  const size = radios(
    "size",
    {
      sm: "sm",
      lg: "lg"
    },
    "sm"
  );

  return {
    error,
    errorMessage,
    disabled,
    placeholder,
    size
  };
};

const InputStories = storiesOf(`${__dirname}`, module)
  .add("Basic", () => {
    const props = createKnobs();
    return (
      <div style={{ width: "200px" }}>
        <Input {...props} />
      </div>
    );
  })
  .add("With Icon", () => {
    const props = createKnobs();
    return (
      <div style={{ width: "200px" }}>
        <Input {...props} icon={<Icon name="search" />} />
      </div>
    );
  });

export default InputStories;
