import React from 'react';
import PropTypes from 'prop-types';
import './ButtonGetNFT.css';
import util from 'util';

const ButtonGetNft = (props) => {

  const handleUploadAvatarToIPFS = event => {


    if (props.avatarVersion === null)
      throw new Error("No Avatar version to upload");

    //console.log(util.inspect(Object.entries(props.avatarVersion)))

    var searchParamString = "?"
    for (const [key, value] of Object.entries(props.avatarVersion)) {
      if(value != null)
       searchParamString += key + "=" + value + "&";
    };

    //console.log(queryParams(props.avatarVersion))

    var urlIPFS = "/pushtoIPFS?"+searchParamString;
    console.log(urlIPFS);
    fetch(urlIPFS)
      .then(res => res.text())
      .then(text => console.log(text))
      .catch(err => {
        console.log(err);
      });
  };

  return (<div className="ButtonGetNFT">
    <button className='action-button'
      onClick={handleUploadAvatarToIPFS}>Upload to IPFS</button>
  </div>);
};

ButtonGetNft.propTypes = {
  avatarVersion: PropTypes.object
};

ButtonGetNft.defaultProps = {
  avatarVersion: null
};

export default ButtonGetNft;
