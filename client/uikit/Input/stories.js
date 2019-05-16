import { storiesOf } from "@storybook/react";
import React from "react";
import Input from ".";

const InputStories = storiesOf(`${__dirname}`, module).add("Basic", () => (
  <Input>Skeleton</Input>
));

export default InputStories;
