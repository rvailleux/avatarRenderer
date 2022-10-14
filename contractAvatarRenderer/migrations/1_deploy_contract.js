const AvatarRendererLite = artifacts.require("AvatarRendererLite.sol");

module.exports = function(deployer) {
 deployer.deploy(AvatarRendererLite, "AvatarRendererLite", "ART");
};