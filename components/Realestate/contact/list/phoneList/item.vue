<template>
  <div class="main">
    <div>{{value.NAME}}</div>
    <div>{{value.REM}}</div>
  </div>
</template>

<script>
export default {
  name: "item",
  props:{
    value: {}
  }
}
</script>

<style lang="scss" scoped>
  .main{
    display: flex;
  }
</style>
