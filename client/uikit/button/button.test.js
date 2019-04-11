import React from "react";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { expect } from "chai";

Enzyme.configure({ adapter: new Adapter() });

import Button from ".";

describe("button", () => {
  it("should render", () => {
    const wrapper = shallow(<Button>BUtton</Button>);
    expect(wrapper.find("button")).to.have.lengthOf(1);
  });
});
