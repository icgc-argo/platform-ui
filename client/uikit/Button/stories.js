import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { radios, boolean, text } from '@storybook/addon-knobs';
import React from "react";
import Button from ".";
import { asyncDummyFunc, placeholderImageURLRoot } from "../testUtil";

const dummyClick = action("Clicked!");

const createKnobs = () => {
  const variant = radios("variant", {
    primary: "primary",
    secondary: "secondary",
    warning: "warning",
  })
  const size = radios("size", {
    sm: "sm",
    md: "md",
    lg: "lg",
  })
  const disabled=boolean("disabled", false)
  const showLoader=boolean("showLoader", false)
  const children=text("children", "some button")
  return {
    variant,
    size,
    disabled,
    showLoader,
    children,
  }
}

const ButtonStories = storiesOf(`${__dirname}`, module)
  .add("Basic", () => {
    const props = createKnobs()
    return <Button {...props} onClick={props.showLoader ? asyncDummyFunc : dummyClick}/>
  })
  .add("Button with multiple child nodes", () => (
    <Button onClick={dummyClick}>
      <img src={`${placeholderImageURLRoot}/12/20`} />
      <span style={{ color: "#64D518" }}>Red Span</span>
      <img src={`${placeholderImageURLRoot}/20/20`} />
      <img src={`${placeholderImageURLRoot}/7/7`} />
    </Button>
  ));

export default ButtonStories;
