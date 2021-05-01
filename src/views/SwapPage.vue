<template>
  <div class="swap-page w-full mx-auto">
    <Card>
      <Title>Swap</Title>
      <Description>Change your tokens to another tokens</Description>
      <Button type="primary">Swap</Button>
    </Card>
  </div>
</template>

<script>
import Card from '../components/common/Card.vue'
import Button from '../components/common/Button.vue'
import Title from '../components/common/Title.vue'
import Description from '../components/common/Description.vue'

export default {
  components: {
    Card,
    Button,
    Title,
    Description
  }  
}
</script>

<style scoped>
.swap-page {
  max-width: 550px;
}
</style>