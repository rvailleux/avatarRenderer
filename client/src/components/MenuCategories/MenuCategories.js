import React, { Component } from "react";
import Helper from "../../helper";

//onChange: ({categoryId: versionId}) => void
class MenuCategories extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <aside className="container__sidebar">
        {/* <div className="container__overlay"></div> */}
        <ul className="menu_categories">
          {Helper.addParentCategoryIdToChildren(this.props.children, { onChange: this.props.onChange })}
        </ul>
      </aside>
    )
  }
}

export default MenuCategories;
