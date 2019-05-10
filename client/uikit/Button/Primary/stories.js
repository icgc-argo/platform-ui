import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";
import Button from ".";
import { asyncDummyFunc, placeholderImageURLRoot } from "../../testUtil";

const dummyClick = action("Clicked!");

const ButtonStories = storiesOf(`${__dirname}`, module)
  .add("Default", () => <Button onClick={dummyClick}>Primary Button</Button>)
  .add("Disabled Button", () => (
    <Button onClick={dummyClick} disabled>
      Disabled
    </Button>
  ))
  .add("Button with loading", () => (
    <Button onClick={asyncDummyFunc} showLoader>
      Click me to load!
    </Button>
  ))
  .add("Button with left icon", () => (
    <Button onClick={dummyClick}>
      <img src={`${placeholderImageURLRoot}/20/20`} /> Button with left icon
    </Button>
  ))
  .add("Button with multiple child nodes", () => (
    <Button onClick={dummyClick}>
      <img src={`${placeholderImageURLRoot}/12/20`} />
      <span style={{ color: "#64D518" }}>Red Span</span>
      <img src={`${placeholderImageURLRoot}/20/20`} />
      <img src={`${placeholderImageURLRoot}/7/7`} />
    </Button>
  ));

export default ButtonStories;
