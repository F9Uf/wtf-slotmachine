import Web3 from 'web3'

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