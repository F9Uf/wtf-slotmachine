import Vue from 'vue'
import Vuex from 'vuex'
import { getWeb3 } from './utils/web3'

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
    isCorrectChain: true
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
    }
  }
})