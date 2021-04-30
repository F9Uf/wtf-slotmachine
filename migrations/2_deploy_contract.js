const WTFERC20 = artifacts.require("WTFERC20");

module.exports = async function (deployer) {
  // deploy token with name, symbol, total coins
  deployer.deploy(WTFERC20, 'WTF Coin', 'WTF', 1000000)
}