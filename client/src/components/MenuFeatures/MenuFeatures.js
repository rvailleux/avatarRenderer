import React, { Component } from "react";
import Helper from "../../helper";


class MenuFeatures extends Component {
  render() {
    return (
      <aside className="container__sidebar">
        <ul className="menu_categories">
          {Helper.addPropertyToChildren(this.props.children, { onChange: this.props.onChange })}
        </ul>
      </aside>
    )
  }
}

export default MenuFeatures;
