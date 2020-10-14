var BTCCapOracle = artifacts.require("./BTCCapOracle.sol");

module.exports = function(deployer) {
  deployer.deploy(BTCCapOracle);
};
