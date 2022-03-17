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
    return (<li id={this.props.categoryId} className="category_item">
    <img src={process.env.REACT_APP_AVATAR_GENERATOR_BASEURL + "?"+this.props.categoryId+"="+this.props.categoryDefaultValue} alt={this.props.categoryId} />
    <p className="category_text">{this.props.categoryText}</p>
    <ul id={this.props.categoryId+"_versions"} className="menu_versions">
      {Helper.addParentCategoryIdToChildren(this.props.children, { parentCategoryId:this.props.categoryId, onClick: this.props.onChange})}
    </ul>
  </li>);
  }
}

export default MenuCategory;
