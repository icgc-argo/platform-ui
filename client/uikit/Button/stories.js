import { storiesOf } from "@storybook/react";
import React from "react";
import Button from ".";
import README from "./readme.md";

const ButtonStories = storiesOf(`${__dirname}`, module)
  .addParameters({ readme: { content: `${README}`, sidebar: `${README}` } })
  .add("A basic button", () => <Button>Cognito Argo Sum</Button>);

export default ButtonStories;
