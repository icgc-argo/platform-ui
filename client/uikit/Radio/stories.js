import { storiesOf } from "@storybook/react";
import React from "react";
import Radio from ".";

const RadioStories = storiesOf(`${__dirname}`, module).add("Basic", () => (
  <Radio>Skeleton</Radio>
));

export default RadioStories;
