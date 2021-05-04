<template>
  <div class="app">
    <!-- Connect wallet Modal -->
    <Modal
      :title="modalDetail.title"
      v-if="isShowModal && modalDetail.type === 'CONNECT_WALLET'"
      @close="closeModal"
    >
      <div
        class="bg-light w-full rounded-lg bg-opacity-50 text-dark cursor-pointer hover:opacity-90 transition-all p-3 my-20 flex items-center"
        @click="connectWallet"
      >
        <img src="./assets/metamask.png" class="w-7 rounded-full mr-5" alt="">
        MetaMask
      </div> 
    </Modal>
    <!-- Show account Modal -->
    <Modal
      :title="modalDetail.title"
      v-if="isShowModal && modalDetail.type === 'ACCOUNT_WALLET'"
      @close="closeModal"
    >
      <div
        class="w-full text-dark justify-center my-20 flex items-center"
      >
        <h1 class="text-2xl font-semibold">{{ accountDetail.address }}</h1>
      </div> 
      <Button type="primary" @click="disconnectWallet">Disconnect</Button>
    </Modal>
    <TheHeader />
    <TheSwtichMenu :routes="routes" />
    <div class="content py-10 px-10 w-full">
      <router-view></router-view>
    </div>
    <button class="my-5 mx-10" @click="addWtfTokenToMetaMask">Click to add WTF token to Metamask</button>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import Modal from './components/common/Modal.vue'
import TheSwtichMenu from './components/TheSwitchMenu.vue'
import Button from './components/common/Button.vue'

import { addTokenToMetamask } from './utils/token'
import { getWTFAddress } from './utils/web3'


export default {
  components: {
    TheHeader,
    Modal,
    TheSwtichMenu,
    Button
  },
  data() {
    return {
      routes: [
        { to: '/swap', name: 'SwapPage', text: 'Swap' },
        { to: '/', name: 'Home', text: 'Slot Machine' }
      ]
    }
  },
  computed: {
    isShowModal() {
      return this.$store.getters['getModalShow']
    },
    modalDetail() {
      return this.$store.getters['getModalDetail']
    },
    accountDetail() {
      return this.$store.getters['getAccountDetail']
    }
  },
  methods: {
    closeModal() {
      this.$store.dispatch('closeModal')
    },
    async connectWallet() {;
      await this.$store.dispatch('connectWallet')
    },
    async disconnectWallet() {
      // TODO: create function to disconnect wallet
      this.closeModal()
    },
    async addWtfTokenToMetaMask() {
      await addTokenToMetamask(getWTFAddress(), 'WTF', 'http://localhost:8080/token_wtf.png')
    },
  },
  async mounted() {
    await this.$store.dispatch('injectWeb3')
  }
}
</script>

<style scoped>
.app {
  background: #F3F3F3;
}
</style>
