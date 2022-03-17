import React, { Component } from "react";
import Helper from "../../helper";


//Props
// categoryText : string
// categoryId : string
// categoryDefaultValue : string
// onChange : ({categoryId: versionId})
class MenuCategory extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (<li id={this.props.categoryName} className="category_item">
    <img src={process.env.REACT_APP_AVATAR_GENERATOR_BASEURL + "?"+this.props.categoryId+"="+this.props.categoryDefaultValue} alt={"tone1"} />
    <ul id="skin_versions" className="menu_versions">
      {Helper.addParentCategoryIdToChildren(this.props.children, { parentCategoryId:this.props.categoryId, onClick: this.props.onChange})}
    </ul>
  </li>);
  }
}

export default MenuCategory;
