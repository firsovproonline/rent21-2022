<template>
  <div class="main">
    <div class="div-label">{{label}}</div>
    <div v-if="Array.isArray(value)" class="div-value" >
      <div v-for="(item, index) in value" :key="index">
        <span v-if="index <= 2">{{item.NAME}}</span>
      </div>
    </div>
    <div v-else class="div-value">{{value}}</div>
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
