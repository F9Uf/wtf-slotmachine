<template>
  <div class="w-full bg-light rounded-lg py-3 px-5 bg-opacity-30 shadow-inner flex flex-col my-5">
    <div class="flex flex-row justify-between text-primary mb-5">
      <h5>{{ to ? 'To' : 'From' }}</h5>
      <h5>Balance: {{ computedBalance }}</h5>
    </div>
    <div class="flex flex-row text-dark font-medium text-xl justify-between">
      <input
        class="bg-transparent w-11/12 focus:outline-none text-current font-medium"
        type="number"
        placeholder="0.00"
        :disabled="disabled"
        v-model="value"
      >
      <div class="flex flex-row w-100 box-border">
        <img src="../../assets/currency/eth.png" class="h-7 mr-2" alt="" v-if="currency === 'eth'">
        <img src="../../assets/currency/wtf.png" class="h-7 mr-2" alt="" v-else>
        {{ currency === 'eth' ? 'ETH' : 'WTF'}}
      </div>
    </div>
  </div>
</template>

<script>
import { numberToMoney } from '../../utils/moneyFormat';

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    balance: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'wtf'
    },
    to: {
      type: Boolean,
      default: false
    },
    amount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    computedBalance() {
      return numberToMoney(this.balance, 2)
    },
    value: {
      get() {
        return this.amount === 0 ? null : this.amount
      },
      set(value) {
        this.$emit('change', value)
      }
    }
  }
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>