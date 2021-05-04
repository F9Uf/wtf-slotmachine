<template>
  <div class="grid grid-cols-12">
    <div class="col-span-6 bg-white">
        Home
      <Card class="flex">
        <SlotMachine />  
      </Card>
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
  }
}
</script>