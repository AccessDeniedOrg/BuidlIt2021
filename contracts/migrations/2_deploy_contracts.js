var ERC721Full = artifacts.require("./ERC721Full.sol");

module.exports = function (deployer) {
  deployer.deploy(ERC721Full);
};
