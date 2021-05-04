<template>
  <div class="bg-red-600 w-36 rounded-lg h-56 relative overflow-hidden flex justify-center">
    <div
      class="slot-item absolute w-28 h-auto space-y-5 transition-all"
      :style="getTranslateY()"
    >
      <img
        :src="require('@/assets/currency/' + item)"
        v-for="(item, index) in items" :key="index"
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ['wtf.png', 'eth.png', 'eth.png', 'eth.png', 'eth.png', 'wtf.png', 'eth.png', 'eth.png', 'eth.png', 'eth.png'],
      translateY: -76,
      timer: 0
    }
  },
  methods: {
    getTranslateY() {
      return `transform: translateY(${this.translateY}px);`;
    },
    spin() {
      var i = 0;
      this.timer = setInterval(() => {
        this.translateY -= 10
        this.items.push(this.items[i++])
      }, 5)
    }
  },
  mounted() {
    // this.spin()
  },
  beforeMount() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
/* .slot-item {
  transform: translateY(-76px);
} */
</style>
