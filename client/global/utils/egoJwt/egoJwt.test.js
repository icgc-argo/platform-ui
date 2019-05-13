import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { isValidJwt } from "./index";

describe("isValidJwt", () => {
  it("should return false if undefined", () => {
    expect(isValidJwt()).to.be.false;
  });
});
