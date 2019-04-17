import { storiesOf } from "@storybook/react";
import React from "react";
import Button from ".";
import { asyncDummyFunc, placeholderImageURLRoot } from "../testUtil";

const dummyClick = () => console.log("..button..clickity click click..");

const ButtonStories = storiesOf(`${__dirname}`, module)
  .add("Basic", () => <Button onClick={dummyClick}>Skeleton</Button>)
  .add("Disabled Button", () => (
    <Button onClick={dummyClick} disabled>
      Disabled
    </Button>
  ))
  .add("Primary Button", () => (
    <Button onClick={dummyClick} variant="primary">
      Primary Button
    </Button>
  ))
  .add("Secondary Button", () => (
    <Button onClick={dummyClick} variant="secondary">
      Secondary Button
    </Button>
  ))
  .add("Warning Button", () => (
    <Button onClick={dummyClick} variant="warning">
      Warning Button
    </Button>
  ))
  .add("Sized Button", () => (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Button onClick={dummyClick} variant="primary" size="sm">
          Small Primary Button
        </Button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Button onClick={dummyClick} variant="primary">
          Medium Primary Button
        </Button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Button onClick={dummyClick} variant="primary" size="lg">
          Large Primary Button
        </Button>
      </div>
    </div>
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
      <span style={{ color: "red" }}>Red Span</span>
      <img src={`${placeholderImageURLRoot}/20/20`} />
      <img src={`${placeholderImageURLRoot}/7/7`} />
    </Button>
  ));

export default ButtonStories;
