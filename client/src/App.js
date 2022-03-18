import React, { Component, useState } from 'react';
import MenuCategories from './components/MenuCategories';
import './App.css';
import MenuVersion from './components/MenuVersion/MenuVersion';
import MenuCategory from './components/MenuCategory/MenuCategory';
import Helper from './helper';
import AllVersions from './possibleVersions.json'

function App() {

  const queryParams = new URLSearchParams(window.location.search);
  let initialConfiguration = {};
  for (var key in AllVersions) {
    if (queryParams.get(key) != null) {
      initialConfiguration[key] = queryParams.get(key);
    }
  }

  //Use state to store current configuration
  const [avatarConfiguration, setAvatarConfiguration] = useState(initialConfiguration);


  var changeHandler = (configurationObject) => {
    //Update with newly selected feature
    let newVersion = { ...avatarConfiguration, ...configurationObject };
    setAvatarConfiguration(newVersion);

    //Update query parameter in the URL to provide  a direct link back to this configuration
    window.history.replaceState(null, "Avatar Generator", "/?" + Helper.avatarQueryParamsForge(newVersion));
  };

  return (
    <div className="App">
      <MenuCategories onChange={changeHandler}>
        {Object.entries(AllVersions).map(entry => {
          return <MenuCategory categoryId={entry[0]}
            categoryText={entry[1].text}
            categoryDefaultThumb={entry[1].versions[0]}>
            {
              entry[1].versions.map(version => {
                return (<MenuVersion versionId={version} />);
              })
            }

          </MenuCategory>;

        })
        }
        {/* <MenuCategory categoryId="skin" categoryText="Peau">
            <MenuVersion versionId="tone1" />
            <MenuVersion versionId="tone2" />
            <MenuVersion versionId="tone3" />
            <MenuVersion versionId="tone4" />
          </MenuCategory>
          <MenuCategory categoryId="eyes" categoryText="Yeux">
            <MenuVersion versionId="dark" />
            <MenuVersion versionId="brown" />
            <MenuVersion versionId="green" />
            <MenuVersion versionId="blue" />
          </MenuCategory>
          <MenuCategory categoryId="hair_style" categoryText="Coiffure">
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
          <MenuCategory categoryId="eyes_style" categoryText="Eyes wear" categoryDefaultValue="brush">
            <MenuVersion versionId="brush" />
          </MenuCategory>
          <MenuCategory categoryId="right_accessories" categoryText="Accessoires" categoryDefaultValue="nabaztag">
            <MenuVersion versionId="phone" />
            <MenuVersion versionId="nabaztag" />
            <MenuVersion versionId="pipe" />
          </MenuCategory>*/}
      </MenuCategories>
      <main className="container__main">
        <img src={Helper.avatarURLForge(avatarConfiguration)} alt="avatar" />
        {/* <button>Télécharger l'avatar en PNG</button>
        <button>Random</button> */}
      </main>
    </div >
  );
}

export default App;
