import { storiesOf } from "@storybook/react";
import ReactJson from "react-json-view";
import defaultTheme from ".";

const ButtonStories = storiesOf(`${__dirname}`, module).add("object", () => {
  return <ReactJson src={defaultTheme} />;
});

export default ButtonStories;
