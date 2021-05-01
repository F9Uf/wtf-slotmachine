<template>
  <header class="w-full py-5 shadow-normal px-10 flex justify-between items-center">
    <div class="left-header">
      <router-link to="/" class="flex items-center">
        <img src="../assets/logo.png" class="h-8 mr-5" alt="">
        WTF Slot Machine
      </router-link>
    </div>
    <div class="right-header">
      <div class="has-wallet" v-if="isLoginWallet">
        Your wallet:
        <button class="px-4 py-1 bg-blue-300 rounded-md ml-3 focus:outline-none">{{ shortWalletAddress }}</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isLoginWallet: true,
      walletAddress: '0x100000000000000000000000000000000000DEAD'
    }
  },
  computed: {
    shortWalletAddress() {
      return `${this.walletAddress.slice(0,6)}...${this.walletAddress.slice(-4)}`
    }
  }
}
</script>