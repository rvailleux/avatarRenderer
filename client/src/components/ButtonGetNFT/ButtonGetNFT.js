import React from 'react';
import PropTypes from 'prop-types';
import './ButtonGetNFT.css';
import Helper from '../../helper';

const ButtonGetNft = () => {

  const handleploadAvatarToIPFS = event => {
    fetch(Helper.avatarURLForge())
      .then((response) => response.json())
      .then((data) => {
         console.log(data);
         setPosts(data);
      })
      .catch((err) => {
         console.log(err.message);
      });
  };

  return (<div className="ButtonGetNFT">
   <button className='action-button' onClick={handleploadAvatarToIPFS} >Upload to IPFS</button>
  </div>);
};

ButtonGetNft.propTypes = {};

ButtonGetNft.defaultProps = {};

export default ButtonGetNft;
