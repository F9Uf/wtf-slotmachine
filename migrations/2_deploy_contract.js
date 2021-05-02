const WTFERC20 = artifacts.require("WTFERC20");
const SlotMachine = artifacts.require("SlotMachine");

module.exports = async function (deployer) {
  // deploy token with name, symbol, total coins
  await deployer.deploy(WTFERC20, 'WTF Coin', 'WTF', 2500000);
  const wtfToken = await WTFERC20.deployed();

  // deploy SlotMachine contract with pricePerSlot(1wtf), probability of slot, token address
  await deployer.deploy(SlotMachine, '1000000000000000000', [0,1,2,3,4,5,], wtfToken.address);
  const sm = await SlotMachine.deployed();

  // set 1M token to Slotmachine
  await wtfToken.transfer(sm.address, '10000000000000000000000')
  const smWtfBalance = await wtfToken.balanceOf(sm.address)
  console.log('balance of sm contract', smWtfBalance.toString());
}