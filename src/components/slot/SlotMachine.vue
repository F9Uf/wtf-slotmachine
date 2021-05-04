<template>
  <div class="slot-machine inline-flex space-x-20 mx-auto">
    <SlotBox />
    <SlotBox />
    <SlotBox />
  </div>
</template>

<script>
import SlotBox from './SlotBox.vue'

export default {
  components: {
    SlotBox
  }  
}
</script>

<style scoped>

</style>