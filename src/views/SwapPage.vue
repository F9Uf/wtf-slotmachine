<template>
  <div class="swap-page w-full mx-auto">
    <Card>
      <Title>Swap</Title>
      <Description>Change your tokens to another tokens</Description>
      <div class="swap-body my-10 text-center">
        <SwapBox
          :balance="token1.balance"
          :currency="token1.currency"
          :amount="token1.amount"
          @amoungChange="onToken1Change"
        />
        <button class="focus:outline-none bg-dark p-2 rounded-full hover:opacity-90 transition-all" @click="switchToken">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
        <SwapBox :balance="token2.balance" :currency="token2.currency" :amount="token2.amount"  to disabled />
      </div>
      <div class="rate my-3 flex justify-between" v-if="priceRate !== 0">
        <Description>Price</Description>
        <Description v-if="token1.currency === 'eth'">{{ priceRate.toFixed(6) }} ETH per WTF</Description>
      </div>
      <Button :type="getBtnDisplay.type" @click="swap()">{{ getBtnDisplay.text }}</Button>
    </Card>
  </div>
</template>

<script>
import Card from '../components/common/Card.vue'
import Button from '../components/common/Button.vue'
import Title from '../components/common/Title.vue'
import Description from '../components/common/Description.vue'

import SwapBox from '../components/swap/SwapBox.vue'

export default {
  components: {
    Card,
    Button,
    Title,
    Description,
    SwapBox
  },
  data() {
    return {
      token1: {
        balance: 0,
        currency: 'eth',
        amount: 0
      },
      token2: {
        balance: 0,
        currency: 'wtf',
        amount: 0
      },
      priceRate: 0
    }
  },
  methods: {
    async onToken1Change(value) {
      this.token1.amount = value
      this.priceRate = 0
      if (this.token1.currency === 'eth') {
        const estimateToken = await this.$store.dispatch('estimateEthToToken', value)
        this.token2.amount = estimateToken.toNumber()
        
      } else if (this.token1.currency === 'wtf') {
        const estimateEth = await this.$store.dispatch('estimateTokenToEth', value)
        this.token2.amount = estimateEth.toNumber()
      }
    },
    switchToken() {
      const temp = {...this.token1};
      this.token1 = {
        ...this.token2,
        amount: 0
      }
      this.token2 = {
        ...temp,
        amount: 0
      }
    },
    async swap() {
      if (this.token1.amount === 0) return;
      if (this.token1.currency === 'eth') {
        await this.$store.dispatch('swapEthToToken', this.token1.amount)
      } else if (this.token1.currency === 'wtf') {
        await this.$store.dispatch('swapTokenToEth', this.token1.amount)
      }
      this.token1.amount = 0;
      this.token2.amount = 0;
    }
  },
  computed: {
    web3Type() {
      return this.$store.getters['getWeb3Type']
    },
    getBtnDisplay() {
      if (this.web3Type === 'OK'){
        if (this.token1.amount === 0 || this.token1.amount === null) return { type: 'disabled', text: 'Enter Token Amount' } 
        return { type: 'primary', text: 'Swap' }
      }
      if (this.web3Type === 'WRONG-NET') return { type: 'danger', text: 'Wrong Network' }
      return { type: 'dark', text: 'Connect Wallet'  }
    },
    accountDetail() {
      return this.$store.getters['getAccountDetail']
    }
  },
  watch: {
    accountDetail(newV) {
      if (this.token1.currency === 'eth') this.token1.balance = newV.ethBalance
      if (this.token2.currency === 'eth') this.token1.balance = newV.ethBalance

      if (this.token1.currency === 'wtf') this.token1.balance = newV.wtfBalance
      if (this.token2.currency === 'wtf') this.token2.balance = newV.wtfBalance
    }
  },
}
</script>

<style scoped>
.swap-page {
  max-width: 550px;
}
</style>