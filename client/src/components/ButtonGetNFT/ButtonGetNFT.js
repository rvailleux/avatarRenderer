import React from 'react';
import PropTypes from 'prop-types';
import './ButtonGetNFT.css';
import util from 'util';
import Button from '@mui/material/Button';
import { Box, Modal, Typography } from '@mui/material';


const ButtonGetNft = (props) => {


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const [progressStatus, setStatus] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick')
      setOpen(false);
  }

  const handleValidateUploadAvatarToIPFS = event => {

    if (props.avatarVersion === null) {
      setStatus("No Avatar version to upload");
      return
    }
    //Forge Query params to pass in URL
    var searchParamString = "?"
    for (const [key, value] of Object.entries(props.avatarVersion)) {
      if (value != null)
        searchParamString += key + "=" + value + "&";
    };

    var urlIPFS = process.env.REACT_APP_BACKEND_BASEURL + process.env.REACT_APP_AVATAR_PUSHTOIPFS_BASEURL + searchParamString;

    setStatus("Uploading Avatar to IPFS...");

    handleOpen();

    fetch(urlIPFS)
      .then(res => res.text())
      .then(text => {

        setStatus("Minting Avatar...");

      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleUploadAvatarToIPFS = event => {


    if (props.avatarVersion === null) {
      setStatus("No Avatar version to upload");
      return
    }

    setOpen(true);

    setStatus(
      <div>
        <Typography>Are you sure to proceed ?</Typography>
        <Button onClick={() => { setOpen(false) }}>Cancel</Button>
        <Button variant="contained" onClick={handleValidateUploadAvatarToIPFS}>OK</Button>
      </div>
    );



  };


  return (<div className="ButtonGetNFT">
    <Button className='action-button'
      onClick={handleUploadAvatarToIPFS} variant="contained">Upload to IPFS</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Creating your NFT
        </Typography>
        {progressStatus}
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>

        </Typography>
      </Box>
    </Modal>
  </div>);
};

ButtonGetNft.propTypes = {
  avatarVersion: PropTypes.object
};

ButtonGetNft.defaultProps = {
  avatarVersion: null
};

export default ButtonGetNft;
