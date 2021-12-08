const granteStudio = artifacts.require("GranteStudio");

module.exports = function (deployer) {
  deployer.deploy(granteStudio);
};