<template>
  <div class="main">
    <div class="header">{{item.NAME}}</div>
    <div class="body"></div>
  </div>
</template>

<script>
export default {
  name: "buildCard",
  props:{
    item: {}
  }
}
</script>

<style lang="scss" scoped>
  .main {
    border-bottom: 1px dotted;
  }
</style>
