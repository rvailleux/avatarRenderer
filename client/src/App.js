import React, { useState } from 'react';
import util from 'util';
import MenuFeatures from './components/MenuFeatures';
import './App.css';
import MenuVersions from './components/MenuVersions';
import MenuVersion from './components/MenuVersion';
import Helper from './helper';
import AllVersions from './possibleVersions.json'
import ButtonGetNft from './components/ButtonGetNFT/ButtonGetNFT';
import { TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from 'wagmi'

import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  infuraProvider({ apiKey: process.env.REACT_APP_INFURA_APIKEY }),
  publicProvider(),
])

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

function App() {

  const queryParams = new URLSearchParams(window.location.search);

  let initialConfiguration = {};

  // Retrieve the initial configuration from the URL params
  initialConfiguration = Helper.queryParamsToVersionsObject(queryParams, AllVersions);

  //Use state to store current configuration
  const [avatarConfiguration, setAvatarConfiguration] = useState(initialConfiguration);


  const changeHandler = (configurationObject) => {
    //Update with newly selected feature
    let newVersion = { ...avatarConfiguration, ...configurationObject };
    setAvatarConfiguration(newVersion);

    //Update query parameter in the URL to provide  a direct link back to this configuration
    window.history.replaceState(null, "Avatar Generator", "/?" + Helper.avatarQueryParamsForge(newVersion));
  };

  const handleOnPolyChange = event => {
    setAvatarConfiguration({ ...avatarConfiguration, ...{ poly: event.target.value } })
  }

  return (
    <WagmiConfig client={client}>
      <div className="App">
        <MenuFeatures onChange={changeHandler}>
          {
            //For each possible Feature
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
          <Stack spacing={2}>
            <img id="avatar-render-zone" src={Helper.avatarURLForge(avatarConfiguration)} alt="Please select a feature on the left" />
            <TextField id="outlined-basic" label="Polygram" variant="outlined" onChange={handleOnPolyChange} inputProps={{
              maxLength: 4, style: { textTransform: "uppercase" }
            }} />
            <ButtonGetNft
              avatarVersion={Helper.queryParamsToVersionsObject(new URLSearchParams(window.location.search), AllVersions)} />
          </Stack>
        </main>
      </div >
    </WagmiConfig>
  );
}

export default App;
