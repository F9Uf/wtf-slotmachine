<template>
  <div class="swap-page w-full mx-auto">
    <Card>
      <Title>Swap</Title>
      <Description>Change your tokens to another tokens</Description>
      <div class="swap-body mt-10">
        <SwapBox
          :balance="token1.balance"
          :currency="token1.currency"
          @change="onToken1Change"
        />
        <SwapBox :balance="token2.balance" :currency="token2.currency"  to disabled />
      </div>
      {{ token1.amount }}
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
    }
  }
}
</script>

<style scoped>
.swap-page {
  max-width: 550px;
}
</style>