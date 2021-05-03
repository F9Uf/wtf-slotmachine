import Vue from 'vue'
import Vuex from 'vuex'
import BigNumber from 'bignumber.js'
import { getDEXAddress, getDEXContract, getWeb3, getWTFContract } from './utils/web3'
import { getBalanceAmount, getDecimalAmount } from './utils/moneyFormat'
import { ethers } from 'ethers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modal: {
      isShow: false,
      title: '',
      type: ''
    },
    web3: null,
    account: null,
    isCorrectChain: true,
    ethBalance: 0,
    wtfBalance: 0
  },
  mutations: {
    SETMODAL(state, payload) {
      state.modal = payload
    },
    SETWEB3(state, payload) {
      state.web3 = payload
    },
    SETACCOUNT(state, account) {
      state.account = account
    },
    SETISCORRECTCHAIN(state, payload) {
      state.isCorrectChain = payload
    },
    SETETHBALANCE(state, balance) {
      state.ethBalance = balance
    },
    SETWTFBALANCE(state, balance) {
      state.wtfBalance = balance
    }
  },
  actions: {
    closeModal({ commit }) {
      commit('SETMODAL', {
        isShow: false,
        title: '',
        type: ''
      })
    },
    openModalConnect({ commit }) {
      commit('SETMODAL', {
        isShow: true,
        title: 'Connect to Wallet',
        type: 'CONNECT_WALLET'
      })
    },
    async initState({ dispatch }) {
      await dispatch('getAccount')
      await dispatch('getChain')
      await dispatch('watchNewBlock')
      await dispatch('getEthBalance')
      await dispatch('getWtfBalance')
    },
    async injectWeb3({ commit, dispatch }) {
      const web3 = new getWeb3()
      if (web3 !== null) {
        commit('SETWEB3', web3)
        await dispatch('initState')
        await dispatch('watchAccount')
        await dispatch('watchChain')
      }
    },
    async getAccount({ state, commit }) {
      const accounts = await state.web3.eth.getAccounts()
      if (accounts.length === 0) commit('SETACCOUNT', null)
      else commit('SETACCOUNT', accounts[0])
    },
    async getChain({ state, commit }) {
      const chainId = await state.web3.eth.net.getId()
      if (chainId === 5777) commit('SETISCORRECTCHAIN', true)
      else commit('SETISCORRECTCHAIN', false)
    },
    async connectWallet({ dispatch }) {
      console.log('connect wallet');
      await window.ethereum.request({ method: 'eth_requestAccounts'});
      await dispatch('injectWeb3')
      dispatch('closeModal')
    },
    async watchAccount({ state, dispatch }) {
      return state.web3.currentProvider.on('accountsChanged', async account => {
        await dispatch('initState')
      })
    },
    async watchChain({ state, dispatch }) {
      return state.web3.currentProvider.on('chainChanged', async chainId => {
        await dispatch('initState')
      })
    },
    async watchNewBlock({ state, dispatch }) {
      return state.web3.eth.subscribe('newBlockHeaders', async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          dispatch('getEthBalance')
          dispatch('getWtfBalance')
        }
      })
    },
    async getEthBalance({ state, commit }) {
      const balanceStr = await state.web3.eth.getBalance(state.account)
      const balance = getBalanceAmount(balanceStr).toNumber()
      await commit('SETETHBALANCE', balance)
    },
    async getWtfBalance({ state, commit }) {
      const wtfContract = await getWTFContract(state.web3)
      const balanceStr = await wtfContract.methods.balanceOf(state.account).call()
      const balance = getBalanceAmount(balanceStr.toString()).toNumber()
      commit('SETWTFBALANCE', balance)
    },
    async swapEthToToken({ state }, ethAmount) {
      try {
        const dexContract = await getDEXContract(state.web3)
        const convertEthAmount = getDecimalAmount(new BigNumber(ethAmount))
        await dexContract.methods.ethToToken().send({ from: state.account, value: convertEthAmount });
        return true;
      } catch(e) {
        return false;
      }
    },
    async estimateEthToToken({ state }, ethAmount) {
      const dexContract = await getDEXContract(state.web3)
      const convertEthAmount = getDecimalAmount(new BigNumber(ethAmount))
      const result = await dexContract.methods.ethToToken().call({ from: state.account, value: convertEthAmount })
      return getBalanceAmount(result);
    },
    async swapTokenToEth({ state }, tokenAmount) {
      try {
        const dexContract = await getDEXContract(state.web3)
        const convertTokenAmount = getDecimalAmount(new BigNumber(tokenAmount))
        await dexContract.methods.tokenToEth(convertTokenAmount).send({ from: state.account });
        return true;
      } catch(e) {
        return false;
      }
    },
    async estimateTokenToEth({ state }, tokenAmount) {
      const dexContract = await getDEXContract(state.web3)
      const convertTokenAmount = getDecimalAmount(new BigNumber(tokenAmount))
      const result = await dexContract.methods.tokenToEth(convertTokenAmount).call({ from: state.account })
      return getBalanceAmount(result);
    },
    async dexTokenAllowance({ state }) {
      const wtfContract = await getWTFContract(state.web3)
      const res = await wtfContract.methods.allowance(state.account, getDEXAddress()).call()
      return new BigNumber(res)
    },
    async approveDexToken({ state }) {
      const wtfContract = await getWTFContract(state.web3)
      const tx = await wtfContract
        .methods
        .approve(getDEXAddress(), ethers.constants.MaxUint256)
        .send({ from: state.account })
      return tx
    }
  },
  getters: {
    getModalShow(state) {
      return state.modal.isShow
    },
    getModalDetail(state) {
      const { title, type } = state.modal
      return { title, type }
    },
    getWeb3Type(state) {
      if (state.web3 === null) return 'NO-WEB3'
      if (state.account !== null && state.isCorrectChain) return 'OK'
      if (state.account !== null && !state.isCorrectChain) return 'WRONG-NET'
      if (state.account === null) return 'NOT-CONNECT'
      return 'ERROR'
    },
    getAccountDetail(state) {
      return {
        address: state.account,
        ethBalance: state.ethBalance,
        wtfBalance: state.wtfBalance
      }
    },
  }
})