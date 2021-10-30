var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var TipCurators = artifacts.require("./Donation.sol");
var Liquidity = artifacts.require("./Liquidity.sol");

module.exports = function (deployer) {
  deployer.deploy(Liquidity);
  deployer.deploy(TipCurators);
};
