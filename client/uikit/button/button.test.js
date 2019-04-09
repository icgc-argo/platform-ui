import React from "react";
import { mount } from "enzyme";

import Button from ".";

describe("button", () => {
  it("should render", () => {
    const wrapper = mount(<Button />);
    expect(wrapper.find("button")).toBeTruthy();
  });
});
