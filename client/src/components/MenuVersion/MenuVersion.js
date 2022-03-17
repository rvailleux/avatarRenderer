import React, { Component } from "react";
import Helper from "../../helper";

//Props
// versionId : string
// parentCategoryId : string (defined from composition as a child of MenuCategory) 
// onClick : ({categoryId: versionId}) => void (defined from composition as a child of MenuCategory)
class MenuVersion extends Component {

  constructor(props) {
    super(props);
  }

  onClickHandler(e) {
    var versionsObject = {};
    versionsObject[this.props.parentCategoryId] = this.props.versionId;

    if (this.props.onClick != null) {
      this.props.onClick(versionsObject);
    }
  }

  render() {
    var versionsObject = {};
    versionsObject[this.props.parentCategoryId] = this.props.versionId;
    return (
      <li id={this.props.versionId}
        className="version_item"
        onClick={this.onClickHandler.bind(this)}
      >
        <img src={Helper.avatarURLForge(versionsObject)} alt={this.props.versionId} />
      </li>
    )
  }
}

export default MenuVersion;
