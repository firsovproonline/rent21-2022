<template>
  <div class="m-b-50">
    {{item.fio}}
  </div>
</template>

<script>
export default {
  name: "item",
  props:{
    item: {}
  }
}
</script>

<style scoped>
.m-b-50{
  margin: 20px;
  border-bottom: 1px solid;
}
</style>
