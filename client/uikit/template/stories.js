import { storiesOf } from "@storybook/react";
import React from "react";
import Template from ".";

const TemplateStories = storiesOf(`${__dirname}`, module).add(
  "Boilerplate template",
  () => <Template>Boilerplate</Template>
);

export default TemplateStories;
