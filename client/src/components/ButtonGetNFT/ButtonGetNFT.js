import React from 'react';
import PropTypes from 'prop-types';
import './ButtonGetNFT.css';
import util from 'util';
import Button from '@mui/material/Button';
import { Box, Modal, Typography, Link, Stack } from '@mui/material';
import AvatarRendererABI from './AvatarRendererLite.json'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'

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
  const [MAvatarIpsfHash, setMAvatarIpsfHash] = React.useState("");
  const [progressStatus, setStatus] = React.useState("");
  const handleOpen = () => setOpen(true);

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick')
      setOpen(false);
  }

  const { address, connector, isConnected } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: address })
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  const { config } = usePrepareContractWrite({
    address: '0x462E2fD66b06678292b9f51D7eA673e646FE0816',
    abi: AvatarRendererABI.abi,
    functionName: 'mint',
    args: [MAvatarIpsfHash]
  })

  const { data, write } = useContractWrite(config);

  const { isMinting, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleUploadAvatarToIPFS = event => {

    if (props.avatarVersion === null) {
      setStatus("Error : No Avatar version to upload");
    }
    //Forge Query params to pass in URL
    var searchParamString = "?"
    for (const [key, value] of Object.entries(props.avatarVersion)) {
      if (value != null)
        searchParamString += key + "=" + value + "&";
    };

    var urlIPFS = process.env.REACT_APP_BACKEND_BASEURL + process.env.REACT_APP_AVATAR_PUSHTOIPFS_BASEURL + searchParamString;

    setStatus("Uploading Avatar to IPFS...");

    setOpen(true);

    fetch(urlIPFS)
      .then(res => res.json())
      .then(data => {
        console.log("fetching PushToIPFS api")
        console.log(util.inspect(data));
        if (data === undefined || data.IpfsHash === undefined)
          throw "PushToIPFS return undefined or null object";

        setMAvatarIpsfHash(data.IpfsHash);

        setOpen(false);
        setStatus(
          <div>
            <Typography>Avatar Metadata file stored on IPFS <Link href="https://gateway.pinata.cloud/ipfs/{data.IpfsHash}">ipfs://{data.IpfsHash}</Link> </Typography>
            <Button onClick={() => setOpen(false)}>OK</Button>
          </div>
        )
      })
      .catch(err => {
        setStatus(
          <div>
            <Typography>Something went wrong with IPFS : {err}</Typography>
            <Button onClick={() => handleUploadAvatarToIPFS()}>Retry</Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        )

      });
  }

  const handleMintAvatar = event => {
    console.log("Mint handle called");
    write();

  }

  let output = []

  output.push(<Stack>
    <Button className='action-button'
      onClick={handleUploadAvatarToIPFS} disabled={MAvatarIpsfHash !== ""} variant="contained">{MAvatarIpsfHash === "" ? "Upload Avatar on IPFS" : MAvatarIpsfHash}</Button>

    <div className={isConnected ? 'hidden' : undefined}>
      {connectors.map((connector) => (
        <Button
          disabled={!connector.ready || MAvatarIpsfHash === "" || isConnected}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </Button>
      ))}
      {error && <div>{error.message}</div>}
    </div>

    <div className={!isConnected ? 'hidden' : undefined}>{ensName ? `${ensName} (${address})` : address}
      <Button onClick={disconnect}>Disconnect</Button></div>

    <Button className='action-button'
      onClick={handleMintAvatar} variant="contained" disabled={!isConnected || MAvatarIpsfHash === ""}>
      {isMinting ? "Minting..." : "Mint Avatar now"} </Button>
    {isSuccess && (
      <div>
        Successfully minted your NFT!
        <div>
          <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
        </div>
      </div>
    )}
  </Stack>)

  output.push(
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
    </Modal>)

  return [output];
};

ButtonGetNft.propTypes = {
  avatarVersion: PropTypes.object
};

ButtonGetNft.defaultProps = {
  avatarVersion: null
};

export default ButtonGetNft;
