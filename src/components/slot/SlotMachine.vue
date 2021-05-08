<template>
  <div class="slot-machine inline-flex space-x-20 mx-auto">
    <SlotBox :isSpin="spin1" @stop="stopSpin1" :target="slots.slot1" :duration="durations1" />
    <SlotBox :isSpin="spin2" @stop="stopSpin2" :target="slots.slot2" :duration="durations2" />
    <SlotBox :isSpin="spin3" @stop="stopSpin3" :target="slots.slot3" :duration="durations3" />
  </div>
</template>

<script>
import SlotBox from './SlotBox.vue'

export default {
  props: {
    isSpin: {
      type: Boolean,
      default: false
    },
    slots: {
      type: Object,
      default: () => ({
        slot1: 1,
        slot2: 1,
        slot3: 1
      })
    }
  },
  components: {
    SlotBox
  },
  data() {
    return {
      spin1: false,
      spin2: false,
      spin3: false,
      durations1: 1,
      durations2: 2,
      durations3: 3,
    }
  },
  methods: {
    toggleSlot() {
      this.spin1 = true
      this.spin2 = true
      this.spin3 = true
    },
    stopSpin1() {
      this.spin1 = false
    },
    stopSpin2() {
      this.spin2 = false
    },
    stopSpin3() {
      this.spin3 = false
    }
  },
  watch: {
    spin3(newV) {
      if (newV === this.spin1 && newV === this.spin2 && newV === false) {
        setTimeout(() => {
          this.$emit('stop', false)
        }, this.durations3 * 2000)
      }
    },
    isSpin(newV) {
      if (newV) {
        this.toggleSlot()
      }
    }
  }
}
</script>

<style scoped>

</style>