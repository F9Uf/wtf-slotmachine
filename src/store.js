import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modal: {
      isShow: false,
      title: '',
      type: ''
    }
  },
  mutations: {
    SETMODAL(state, payload) {
      state.modal = payload
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
    }
  },
  getters: {
    getModalShow(state) {
      return state.modal.isShow
    },
    getModalDetail(state) {
      const { title, type } = state.modal
      return { title, type }
    }
  }
})