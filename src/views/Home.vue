<template>
  <div class="grid grid-cols-12">
    <div class="col-span-6 bg-white">
      <Card class="flex">
        <SlotMachine
          :isSpin="isSpin"
          :slots="slots"
          @stop="stopSpin"
        />  
      </Card>
      <button @click="isSpin = true">spin!</button>
    </div>
  </div>
</template>

<script>
import SlotMachine from '../components/slot/SlotMachine.vue'
import Card from '../components/common/Card.vue'

export default {
  components: {
    SlotMachine,
    Card
  },
  data() {
    return {
      isSpin: false,
      slots: {
        slot1: 1,
        slot2: 2,
        slot3: 3
      }
    }
  },
  methods: {
    stopSpin() {
      this.isSpin = false
    }
  }
}
</script>
