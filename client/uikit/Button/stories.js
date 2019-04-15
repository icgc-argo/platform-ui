import { storiesOf } from "@storybook/react";
import React from "react";
import Button from ".";

const ButtonStories = storiesOf(`${__dirname}`, module).add(
"Basic", 
()  => <Button>Skeleton</Button>
);

export default ButtonStories;