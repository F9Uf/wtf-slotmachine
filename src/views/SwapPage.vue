<template>
  <div class="swap-page w-full mx-auto">
    <Card>
      <Title>Swap</Title>
      <Description>Change your tokens to another tokens</Description>
      <div class="swap-body mt-10 text-center">
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
        <SwapBox :balance="token2.balance" :currency="token2.currency"  to disabled />
      </div>
      <Button type="primary">Swap</Button>
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
        balance: 12,
        currency: 'eth',
        amount: 0
      },
      token2: {
        balance: 0,
        currency: 'wtf',
        amount: 0
      }
    }
  },
  methods: {
    onToken1Change(value) {
      this.token1.amount = value
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
    }
  }
}
</script>

<style scoped>
.swap-page {
  max-width: 550px;
}
</style>