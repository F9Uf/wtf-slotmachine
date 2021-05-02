export const addTokenToMetamask = async (tokenAddress, tokenSymbol, imagePath) => {
  return await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: 18,
        image: imagePath,
      },
    },
  })
}