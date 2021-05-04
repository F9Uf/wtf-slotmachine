<template>
  <div v-if="routes.length > 0" class="p-10 text-center">
    <div
      class="wrapper justify-center bg-gray-200 text-dark w-auto inline-flex rounded-full"
    >
      <div
        :class="`menu px-5 py-2 rounded-full ${ isActive(menu.name) ? 'bg-dark text-white': ''}`"
        v-for="(menu, index) in routes" :key="index"
      >
        <router-link :to="menu.to">{{ menu.text }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    routes: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    isActive(routeName) {
      return this.$route.name === routeName
    }
  }
}
</script>