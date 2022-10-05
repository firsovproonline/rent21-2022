<template>
  <div class="main">
    <div>{{value.NAME}}</div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    value: {}
  }
}
</script>

<style lang="scss" scoped>
  .main{
    border-bottom: 1px dotted;
  }
</style>
