import React, { Component, useState } from 'react';
import MenuCategories from './components/MenuCategories';
import './App.css';
import MenuVersion from './components/MenuVersion/MenuVersion';
import MenuCategory from './components/MenuCategory/MenuCategory';
import Helper from './helper';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { skin: "tone1", eyes: "dark" };
  }

  changeHandler = (e) => {
    console.log("e");
    console.dir(e);
    console.log("state");
    console.dir(this.state);
    var newAvatar = this.state;
    this.setState(e);
    //if (e.skin != null) newAvatar.skin = e.skin;
    //this.setState(newAvatar);
  }

  

  render() {

    return (
      <div className="App">
        <div className="container">
          <MenuCategories onChange={this.changeHandler}>
            <MenuCategory categoryId="skin" categoryText="Peau" categoryDefaultValue="tone1">
              <MenuVersion versionId="tone1" />
              <MenuVersion versionId="tone2" />
              <MenuVersion versionId="tone3" />
              <MenuVersion versionId="tone4" />
            </MenuCategory>
            <MenuCategory categoryId="eyes" categoryText="Yeux" categoryDefaultValue="blue">
              <MenuVersion versionId="dark" />
              <MenuVersion versionId="brown" />
              <MenuVersion versionId="green" />
              <MenuVersion versionId="blue" />
            </MenuCategory>
            <MenuCategory categoryId="hair_style" categoryText="Coiffure" categoryDefaultValue="short_bushy">
              <MenuVersion versionId="long_falling" />
              <MenuVersion versionId="ameridian_coiff" />
              <MenuVersion versionId="top_notch" />
              <MenuVersion versionId="short_bushy" />
              <MenuVersion versionId="long_curly" />
              <MenuVersion versionId="short_curly" />
            </MenuCategory>
          </MenuCategories>
        </div>
        <main className="container__main">
          <p></p>
          <img src={Helper.avatarURLForge(this.state)} alt={"tone1"} />
        </main>
      </div >
    );
  }
}

export default App;
