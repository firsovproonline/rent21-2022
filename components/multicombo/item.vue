<template>
  <div class="item">
    {{item}}
  </div>
</template>

<script>
export default {
  name: "item",
  props:{
    item: null
  }
}
</script>

<style scoped>
  .item{
    margin-left: 4px;
    border-bottom: 1px #1c222b dotted;
    white-space: nowrap;
  }
</style>
