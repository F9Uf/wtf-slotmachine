import { createStore } from 'vuex'

export default createStore({
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