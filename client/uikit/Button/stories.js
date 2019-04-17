import { storiesOf } from "@storybook/react";
import React from "react";
import Button from ".";

const ButtonStories = storiesOf(`${__dirname}`, module).add("Basic", () => (
  <Button onClick={() => console.log("Button clicked")}>Skeleton</Button>
));

export default ButtonStories;
