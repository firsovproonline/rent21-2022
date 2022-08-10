<template>
  <li>
    {{item}}
  </li>
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
  li{
    margin-left: 4px;
    border-bottom: 1px #1c222b dotted;
  }
</style>
