<template>
  <div class="app">
    <TheHeader />
    <div class="content py-10 px-10 w-full">
      <router-view></router-view>
    </div>
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
