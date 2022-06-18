<template>
  <div class="main-block">
    проверка scc
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<style lang="scss" scoped>
.main-block {
  height: 300px;
  background: white;
  @include md-desktop {
    background: green;
  }
}
</style>
