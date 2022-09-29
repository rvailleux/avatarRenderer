import React from "react";
import { shallow } from "enzyme";
import MenuFeatures from "./MenuFeatures";

describe("MenuFeatures", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MenuFeatures />);
    expect(wrapper).toMatchSnapshot();
  });
});
