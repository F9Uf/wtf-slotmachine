import Web3 from 'web3'
import WTFERC20 from '../contracts/WTFERC20.json'
import DEX from '../contracts/DEX.json'
import SLOTMACHINE from '../contracts/SlotMachine.json'

export const getWeb3 = () => {
  var web3js = window.web3
  if (typeof web3js !== 'undefined') {
    // there is metamask
    var web3 = new Web3(web3js.currentProvider)
    return web3
  }
  // there is no metamask
  return null
}

export const getAdrress = (contractJson) => {
  return contractJson.networks[5777].address
}

export const getContract = (web3, constractJson) => {
  const contractAddress = getAdrress(constractJson)
  return new web3.eth.Contract(constractJson.abi, contractAddress)
}

export const getWTFAddress = () => {
  return getAdrress(WTFERC20)
}

export const getWTFContract = (web3) => {
  return getContract(web3, WTFERC20)
}

export const getDEXAddress = () => {
  return getAdrress(DEX)
}

export const getDEXContract = (web3) => {
  return getContract(web3, DEX)
}

export const getSlotMachineAddress = () => {
  return getAdrress(SLOTMACHINE)
}

export const getSlotMachineContract = (web3) => {
  return getContract(web3, SLOTMACHINE)
}