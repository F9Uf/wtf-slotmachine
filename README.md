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

## Architecture
![image](https://user-images.githubusercontent.com/33904716/156925306-748b3b53-f091-47fb-afe4-a40bbddc5174.png)

## Preview
### Dex
![image](https://user-images.githubusercontent.com/33904716/156925373-4d869e22-de24-42a8-9457-f89b0dea2571.png)

### Slot machine
![image](https://user-images.githubusercontent.com/33904716/156925449-19217968-aa1b-4698-a17e-f8c19557f60d.png)
![image](https://user-images.githubusercontent.com/33904716/156925476-6062f6bb-8b7f-4659-89eb-6841505295b5.png)

