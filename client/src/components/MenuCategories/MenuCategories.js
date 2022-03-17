import React, { Component } from "react";
import Helper from "../../helper";

//onChange: ({categoryId: versionId}) => void
class MenuCategories extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <aside className="container__sidebar">
        <div className="container__overlay"></div>
        <ul className="menu_categories">
        {Helper.addParentCategoryIdToChildren(this.props.children, {onChange: this.props.onChange})}
         {/*  <MenuCategory categoryId="skin" categoryText="Peau" categoryDefaultValue="tone1">
            <MenuVersion versionId="tone1"/>
            <MenuVersion versionId="tone2"/>
            <MenuVersion versionId="tone3"/>
            <MenuVersion versionId="tone4"/>
          </MenuCategory> */}
          {/* <li id="eyes" className="category_item">
            <img src={process.env.AVATAR_GENERATOR_BASEURL + "?eyes=dark"} alt={"dark"} />
            <ul id="eyes_versions" className="menu_versions">
              <li id="eyes_dark" className="version_item"><img src={process.env.AVATAR_GENERATOR_BASEURL + "?eyes=dark"} alt={"dark"} /></li>
              <li id="eyes_brown" className="version_item"><img src={process.env.AVATAR_GENERATOR_BASEURL + "?eyes=brown"} alt={"brown"} /></li>
              <li id="eyes_green" className="version_item"><img src={process.env.AVATAR_GENERATOR_BASEURL + "?eyes=green"} alt={"green"} /></li>
              <li id="eyes_blue" className="version_item"><img src={process.env.AVATAR_GENERATOR_BASEURL + "?eyes=blue"} alt={"blue"} /></li>
            </ul>
          </li>
          <li id="hair_style" className="category_item">
            <img src={process.env.AVATAR_GENERATOR_BASEURL + "?hair_style=long_falling"} alt={"long_falling"} />
            <ul id="hair_style_versions" className="menu_versions">
              <li id="hair_style_long_falling" className="version_item"><img src={process.env.AVATAR_GENERATOR_BASEURL + "?hair_style=long_falling"} alt={"long_falling"} /></li>
              <li id="hair_style_ameridian_coiff" className="version_item"><img src={process.env.AVATAR_GENERATOR_BASEURL + "?hair_style=ameridian_coiff"} alt={"ameridian_coiff"} /></li>
              <li id="hair_style_top_notch" className="version_item"><img src={process.env.AVATAR_GENERATOR_BASEURL + "?hair_style=top_notch"} alt={"top_notch"} /></li>
              <li id="hair_style_short_bush" className="version_item"><img src={process.env.AVATAR_GENERATOR_BASEURL + "?hair_style=short_bushy"} alt={"short_bushy"} /></li>
            </ul>
          </li> */}

        </ul>
      </aside>
    )
  }
}

export default MenuCategories;
