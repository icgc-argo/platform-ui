import { storiesOf } from "@storybook/react";
import React from "react";
import Icon from ".";

const IconStories = storiesOf(`${__dirname}`, module).add("Basic", () => (
  <Icon>Skeleton</Icon>
));

export default IconStories;
