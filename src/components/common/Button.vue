<template>
  <button
    :class="`
      focus:outline-none w-full ${displayStyle} rounded-lg text-white py-2 px-3 transition-all
      ${type === 'disabled' ? 'cursor-not-allowed' : 'cursor-pointer'}
      ${type === 'disabled' ? 'hover:opacity-100' : 'hover:opacity-90'}
    `"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: false
    }
  },
  computed: {
    displayStyle() {
      const avaliableColor = ['disabled', 'dark', 'secondary', 'primary', 'light', 'danger'];
      if (avaliableColor.indexOf(this.type) >= 0) {
        return `bg-${this.type}`
      }
      return 'bg-primary'
    }
  }
}
</script>