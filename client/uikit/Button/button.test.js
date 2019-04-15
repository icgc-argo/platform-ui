import React from "react";
import { shallow } from "enzyme";

import Button from ".";

describe("Button", () => {
  it("should render", () => {
    const wrapper = shallow(<Button />);
    expect(false).to.be.true;
  });
});
