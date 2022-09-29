import React, {useState } from 'react';
import util from 'util';
import MenuFeatures from './components/MenuFeatures';
import './App.css';
import MenuVersions from './components/MenuVersions';
import MenuVersion from './components/MenuVersion';
import Helper from './helper';
import AllVersions from './possibleVersions.json'
import ButtonGetNft from './components/ButtonGetNFT/ButtonGetNFT';

function App() {
  
    const queryParams = new URLSearchParams(window.location.search);

    let initialConfiguration = {};

    // Retrieve the initial configuration from the URL params
    initialConfiguration =  Helper.queryParamsToVersionsObject(queryParams,AllVersions);
   
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
        <MenuFeatures onChange={changeHandler}>
          {
            //For reach possible Feature
            Object.entries(AllVersions).map(feature => {
              return <MenuVersions categoryId={feature[0]}
                categoryText={feature[1].text}
                categoryDefaultThumb={feature[1].versions[0]}>
                {
                  feature[1].versions.map(version => {
                    return (<MenuVersion versionId={version} />);
                  })
                }

              </MenuVersions>;

            })
          }
        </MenuFeatures>
        <main className="container__main">
          <img src={Helper.avatarURLForge(avatarConfiguration)} alt="Please select a feature on the left" />
          {<ButtonGetNft 
            avatarVersion={Helper.queryParamsToVersionsObject(new URLSearchParams(window.location.search),AllVersions)} />
        /*<button>Random</button> */}
        </main>
      </div >
    );
}

export default App;
