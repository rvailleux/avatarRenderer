import React from "react";
import { shallow } from "enzyme";
import MenuCategories from "./MenuCategories";

describe("MenuCategories", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MenuCategories />);
    expect(wrapper).toMatchSnapshot();
  });
});
