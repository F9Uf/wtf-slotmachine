/**
 * @param {number} numberOfMoney 
 * @param {number} format 
 * @returns {string}
 */
export const numberToMoney = (numberOfMoney, format) => {
  var re = '\\d(?=(\\d{' + (3) + '})+' + (format > 0 ? '\\.' : '$') + ')';
  return numberOfMoney.toFixed(Math.max(0, ~~format)).replace(new RegExp(re, 'g'), '$&,');
}