<template>
  <div class="main">
    <div class="title">Телефон</div>
    <item v-for="(val,index) in value" :key="index" :value="val" />
  </div>
</template>

<script>
import Item from "~/components/Realestate/contact/list/phoneList/item";
export default {
  name: "phoneList",
  components: {Item},
  props:{
    value: []
  }
}
</script>

<style lang="scss" scoped>
  .main{
    margin-left: 10px;
    .title{
      color: #1b4c43;
      text-align: left;
      margin-left: 0px;
      margin-bottom: 0px;
    }
  }
</style>
