import { storiesOf } from "@storybook/react";
import React from "react";
import Button from ".";

const ButtonStories = storiesOf(`${__dirname}`, module).add(
  "A basic button",
  () => <Button>Cognito Argo Sum</Button>,
  {
    info: { text: "word" }
  }
);

export default ButtonStories;
