import BigNumber from 'bignumber.js'

export const BIG_ZERO = new BigNumber(0)
export const BIG_TEN = new BigNumber(10)

/**
 * @param {number} numberOfMoney 
 * @param {number} format 
 * @returns {string}
 */
export const numberToMoney = (numberOfMoney, format = 2) => {
  return new BigNumber(numberOfMoney).toFormat(format)
}

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount, decimals = 18) => {
  return new BigNumber(amount).times(BIG_TEN.pow(decimals))
}

export const getBalanceAmount = (amount, decimals = 18) => {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
}