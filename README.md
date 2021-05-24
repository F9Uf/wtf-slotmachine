# WTF Slotmachine
The CPE494 Blockchain Technology term project.

## Prerequisite
- node (12.18.4+)
- npm (6.14.6+)
- Ganace
- Metamask Extension
- Truffle `$ npm install -g truffle `

## Setup to develop
1. Clone this repository
2. Open `Ganance` to create local ethereum network
3. Cd into the cloned repository folder
4. Intall library `$ npm install`
5. Deploy Smart contract `$ truffle migrate`
6. Run frontend local development `$ npm run serve`

## Folder structure
```
├ contracts
│  ├ DEX.sol
│  ├ SlotMachine.sol
│  └ WTFERC20.sol
│
├ migrations
│  └ 2_deploy_contract.js
│
└ src
   ├ views
   ├ components
   ├ contracts
   ├ utils
   │  └ web3.js
   └ main.js
```
`/contracts` is the solidity source code folder

`/migrations` is the migration script folder

`/src` is the frontend source code folder

`/src/contracts` is the built smart contract source code folder