<template>
  <div class="main">
    <div class="div-label">{{label}}</div>
    <div class="div-value">{{value}}</div>
  </div>
</template>

<script>
export default {
  name: "labelfromfield",
  props:{
    value: '',
    label: ''
  }
}
</script>

<style lang="scss" scoped>
  .main{
    display: flex;
    .div-label{
      min-width: 120px;
    }
  }
</style>
