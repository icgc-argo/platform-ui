import { storiesOf } from "@storybook/react";
import React from "react";
import Button from ".";
import ReadMe from "./readme.md";

const ButtonStories = storiesOf(__dirname, module)
  .add("Intro", () => <div />, {
    info: { text: `${ReadMe}`, inline: true, header: false, source: false }
  })
  .add("A basic button", () => <Button>Cognito Argo Sum</Button>);
export default ButtonStories;
