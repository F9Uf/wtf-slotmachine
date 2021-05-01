<template>
  <div class="modal-wrapper fixed z-10 inset-0 overflow-y-auto justify-center items-center flex">
    <div class="modal-background fixed z-10 inset-0 bg-gray-500 bg-opacity-60" @click="closeModal"></div>
    <div
      class="modal-content w-full mx-2 z-20"
    >
      <Card>
        <div class="modal-header flex justify-between">
          <Title>{{ title }}</Title>
          <button class="focus:outline-none h-6 mt-1" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="modal-body mt-5">
          <slot></slot>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Title from '../common/Title.vue'
import Card from '../common/Card.vue'

export default {
  components: {
    Title,
    Card
  },
  props: {
    title: {
      type: String,
      defaul: ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-content {
  width: 600px;
}
</style>