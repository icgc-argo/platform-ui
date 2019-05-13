import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { wrapTheme } from "../testUtil";

import Button from ".";

describe("Button", () => {
  it("should render", () => {
    const wrapper = shallow(
      <div>
        <Button />
      </div>
    );
    expect(wrapper.find(Button)).to.have.lengthOf(1);
  });
});
