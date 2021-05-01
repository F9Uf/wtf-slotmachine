<template>
  <div class="app">
    <TheHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'

export default {
  components: {
    TheHeader
  }
}
</script>

<style scoped>
.app {
  background: #F3F3F3;
}
</style>
