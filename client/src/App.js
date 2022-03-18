import React, { Component } from 'react';
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

  changeHandler = (versionsObject) => {
    this.setState(versionsObject);
  }

  render() {

    return (
      <div className="App">
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
          <MenuCategory categoryId="clothes" categoryText="Vêtements" categoryDefaultValue="suit">
            <MenuVersion versionId="dress_decoltee" />
            <MenuVersion versionId="native_tunique" />
            <MenuVersion versionId="wooly_jumper" />
            <MenuVersion versionId="suit" />
            <MenuVersion versionId="gentle_dress" />
            <MenuVersion versionId="gentle_jumper" />
          </MenuCategory>
          <MenuCategory categoryId="face_decoration" categoryText="Pilosité" categoryDefaultValue="beard">
            <MenuVersion versionId="mustach" />
            <MenuVersion versionId="beard" />
          </MenuCategory>
          <MenuCategory categoryId="eyes_decoration" categoryText="Eyes wear" categoryDefaultValue="brush">
            <MenuVersion versionId="brush" />
          </MenuCategory>
          <MenuCategory categoryId="right_accessories" categoryText="Accessoires" categoryDefaultValue="nabaztag">
            <MenuVersion versionId="phone" />
            <MenuVersion versionId="nabaztag" />
            <MenuVersion versionId="pipe" />
          </MenuCategory>
        </MenuCategories>
        <main className="container__main">
          <img src={Helper.avatarURLForge(this.state)} alt="avatar" />
          <button>Télécharger l'avatar en PNG</button>
          <button>Obtenir le lien</button>
        </main>
      </div >
    );
  }
}

export default App;
