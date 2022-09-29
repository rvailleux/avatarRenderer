import React from "react";
import { shallow } from "enzyme";
import MenuVersion from "./MenuVersion";

describe("MenuVersion", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MenuVersion />);
    expect(wrapper).toMatchSnapshot();
  });
});
