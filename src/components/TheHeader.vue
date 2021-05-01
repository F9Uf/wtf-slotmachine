<template>
  <header class="w-full py-5 shadow-normal px-10 flex justify-between items-center bg-white">
    <div class="left-header">
      <router-link to="/" class="flex items-center">
        <img src="../assets/logo.png" class="h-8 mr-5" alt="">
        WTF Slot Machine
      </router-link>
    </div>
    <div class="right-header">
      <div class="has-wallet" v-if="isLoginWallet">
        Your wallet:
        <button class="px-4 py-1 bg-light rounded-md ml-3 focus:outline-none hover:opacity-90 transition-all">{{ shortWalletAddress }}</button>
      </div>
      <div class="no-wallet" v-else>
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
  data() {
    return {
      isLoginWallet: false,
      walletAddress: '0x100000000000000000000000000000000000DEAD'
    }
  },
  computed: {
    shortWalletAddress() {
      return `${this.walletAddress.slice(0,6)}...${this.walletAddress.slice(-4)}`
    }
  },
  methods: {
    connectWallet() {
      this.$store.dispatch('openModalConnect')
    }
  }
}
</script>