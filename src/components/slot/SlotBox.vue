<template>
  <div class="bg-dark w-36 rounded-lg h-56 relative overflow-hidden flex justify-center">
    <div
      class="slot-item absolute w-28 h-auto space-y-5 transition"
      :style="getTranslateY"
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
  props: {
    target: {
      type: Number,
      default: 0
    },
    isSpin: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      originalItems: ['wtf.png', 'eth.png', 'eth.png', 'eth.png', 'wtf.png'],
      items: ['wtf.png', 'eth.png', 'eth.png', 'eth.png', 'wtf.png'],
      translateY: -76,
      currentIndex: 1
    }
  },
  methods: {
    spin() {
      for (let i = 0; i < this.duration; i++) {
        this.items.push(...this.originalItems)
      }
      this.currentIndex += (this.originalItems.length * this.duration)

      // set current item display
      this.items[this.currentIndex - 1] = this.originalItems[Math.floor(Math.random() * this.originalItems.length)]
      this.items[this.currentIndex] = this.originalItems[this.target]
      this.items[this.currentIndex + 1] = this.originalItems[Math.floor(Math.random() * this.originalItems.length)]

      // animate
      this.translateY = -76 - (132 * (this.currentIndex - 1))

      this.$emit('stop', false)
    }
  },
  watch: {
    isSpin(newV) {
      if (newV === true) {
        this.spin()
      }
    }
  },
  computed: {
    getTranslateY() {
      return `transform: translateY(${this.translateY}px); transition-duration: ${2 * this.duration}000ms;`;
    }
  }
}
</script>
