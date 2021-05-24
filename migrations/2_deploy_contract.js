const WTFERC20 = artifacts.require("WTFERC20");
const SlotMachine = artifacts.require("SlotMachine");
const DEX = artifacts.require("DEX");

module.exports = async function (deployer, network, accounts) {
  // deploy token with name, symbol, total coins (25M)
  await deployer.deploy(WTFERC20, 'WTF Coin', 'WTF', 25000000);
  const wtfToken = await WTFERC20.deployed();

  // deploy SlotMachine contract with pricePerSlot(1wtf), probability of slot, token address
  await deployer.deploy(SlotMachine, '1000000000000000000', [0, 10000, 1000, 100, 10, 5], wtfToken.address);
  const sm = await SlotMachine.deployed();

  // deploy DEX contract with token address
  await deployer.deploy(DEX, wtfToken.address);
  const dex = await DEX.deployed();


  // send 10M token to Slotmachine
  await wtfToken.transfer(sm.address, '100000000000000000000000')
  const smWtfBalance = await wtfToken.balanceOf(sm.address)
  console.log('balance of sm contract', smWtfBalance.toString());

  // send 500,000 token to DEX, send 50 eth to DEX
  await wtfToken.approve(dex.address, '250000000000000000000000000000000000');
  const liquidity = await dex.init('500000000000000000000000', { from: accounts[0], value: '50000000000000000000' });
  console.log('Dex liquidity', liquidity.toString());
}