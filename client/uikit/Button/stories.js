import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { radios, boolean, text } from "@storybook/addon-knobs";
import React from "react";
import Button from ".";
import { asyncDummyFunc, placeholderImageURLRoot } from "../testUtil";

const dummyClick = action("Clicked!");

const createKnobs = () => {
  const variant = radios("variant", {
    primary: "primary",
    secondary: "secondary"
  });

  const size = radios("size", {
    sm: "sm",
    md: "md"
  });

  const disabled = boolean("disabled", false);
  const isAsync = boolean("isAsync", false);
  const children = text("children", "some button");

  return {
    variant,
    size,
    disabled,
    isAsync,
    children
  };
};

const ButtonStories = storiesOf(`${__dirname}`, module)
  .add("Basic", () => {
    const props = createKnobs();
    return (
      <Button
        {...props}
        onClick={props.isAsync ? asyncDummyFunc : dummyClick}
      />
    );
  })
  .add("Button with multiple child nodes", () => {
    const props = createKnobs();
    return (
      <Button {...props} onClick={props.isAsync ? asyncDummyFunc : dummyClick}>
        <img src={`${placeholderImageURLRoot}/12/20`} />
        <span style={{ color: "#64D518" }}>Red Span</span>
        <img src={`${placeholderImageURLRoot}/20/20`} />
        <img src={`${placeholderImageURLRoot}/7/7`} />
      </Button>
    );
  });

export default ButtonStories;
