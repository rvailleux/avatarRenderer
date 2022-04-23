async function main() {
    // We get the contract to deploy
    const AvatarO = await ethers.getContractFactory("AvatarO");
    const avatarO = await AvatarO.deploy();
  
    await avatarO.deployed("AvatarO", "AVTRO");
  
    console.log("AvatarO deployed to:", avatarO.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  