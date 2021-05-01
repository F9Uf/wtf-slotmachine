<template>
  <div class="app">
    <Modal :title="modalDetail.title" v-if="isShowModal"></Modal>
    <TheHeader />
    <div class="content py-10 px-10 w-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import Modal from './components/common/Modal.vue'

export default {
  components: {
    TheHeader,
    Modal
  },
  computed: {
    isShowModal() {
      return this.$store.getters['getModalShow']
    },
    modalDetail() {
      return this.$store.getters['getModalDetail']
    }
  }
}
</script>

<style scoped>
.app {
  background: #F3F3F3;
}
</style>
