import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { wrapTheme } from "../testUtil";

import Button from ".";

describe("Button", () => {
  it("should render", () => {
    const wrapper = shallow(wrapTheme(<Button />));
    const find = wrapper.find(Button);
    console.log("find", find, wrapper);
    expect(false).to.be.true;
  });
});
