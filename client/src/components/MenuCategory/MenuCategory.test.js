import React from "react";
import { shallow } from "enzyme";
import MenuCategory from "./MenuCategory";

describe("MenuCategory", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MenuCategory />);
    expect(wrapper).toMatchSnapshot();
  });
});
