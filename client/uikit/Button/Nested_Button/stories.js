import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "..";

const NestedButtonStories = storiesOf(`${__dirname}`, module).add(
  "a basic nested button",
  () => <Button>I am nested button does folder structure still work?</Button>
);

export default NestedButtonStories;
