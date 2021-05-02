<template>
  <header class="w-full py-5 shadow-normal px-10 flex justify-between items-center bg-white">
    <div class="left-header">
      <router-link to="/" class="flex items-center">
        <img src="../assets/logo.png" class="h-8 mr-5" alt="">
        WTF Slot Machine
      </router-link>
    </div>
    <div class="right-header">
      <div class="has-wallet" v-if="web3Type === 'OK'">
        Your wallet:
        <button class="px-4 py-1 bg-light rounded-md ml-3 focus:outline-none hover:opacity-90 transition-all">{{ shortWalletAddress }}</button>
      </div>
      <div class="has-wallet" v-else-if="web3Type === 'WRONG-NET'">
        <button class="px-4 py-1 bg-red-500 text-white rounded-md ml-3 focus:outline-none hover:opacity-90 transition-all">Wrong Network</button>
      </div>
      <div class="no-wallet" v-else-if="web3Type === 'NOT-CONNECT'">
        <button
          class="px-4 py-1 bg-dark rounded-md ml-3 focus:outline-none text-white hover:opacity-90 transition-all"
          @click="connectWallet"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    shortWalletAddress() {
      return `${this.accountAddress.slice(0,6)}...${this.accountAddress.slice(-4)}`
    },
    accountAddress() {
      return this.$store.state.account
    },
    web3Type() {
      return this.$store.getters['getWeb3Type']
    }
  },
  methods: {
    connectWallet() {
      this.$store.dispatch('openModalConnect')
    }
  }
}
</script>