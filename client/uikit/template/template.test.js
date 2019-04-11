import React from "react";
import { mount } from "enzyme";

import Template from ".";

describe("button", () => {
  it("should render", () => {
    const wrapper = mount(<Template />);
    expect(wrapper.find(Template)).toBeTruthy();
  });
});
