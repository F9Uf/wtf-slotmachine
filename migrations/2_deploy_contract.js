const WTFERC20 = artifacts.require("WTFERC20");
const SlotMachine = artifacts.require("SlotMachine");
const DEX = artifacts.require("DEX");

module.exports = async function (deployer, network, accounts) {
  // deploy token with name, symbol, total coins (2.5M)
  await deployer.deploy(WTFERC20, 'WTF Coin', 'WTF', 2500000);
  const wtfToken = await WTFERC20.deployed();

  // deploy SlotMachine contract with pricePerSlot(1wtf), probability of slot, token address
  await deployer.deploy(SlotMachine, '1000000000000000000', [0,1,2,3,4,5,], wtfToken.address);
  const sm = await SlotMachine.deployed();

  // deploy DEX contract with token address
  await deployer.deploy(DEX, wtfToken.address);
  const dex = await DEX.deployed();


  // send 1M token to Slotmachine
  await wtfToken.transfer(sm.address, '10000000000000000000000')
  const smWtfBalance = await wtfToken.balanceOf(sm.address)
  console.log('balance of sm contract', smWtfBalance.toString());

  // send 0.5M token to DEX, send 90 eth to DEX
  await wtfToken.approve(dex.address, '250000000000000000000000000000000000');
  const liquidity = await dex.init('500000000000000000000000', { from: accounts[0], value: '90000000000000000000' });
  console.log('Dex liquidity', liquidity.toString());
}