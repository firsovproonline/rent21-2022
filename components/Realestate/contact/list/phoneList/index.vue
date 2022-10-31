<template>
  <div class="main">
    <div style="display: flex">
      <div class="title">Телефон</div>
      <div class="buttonHref" @click="addItem">добавить</div>
    </div>
    <item v-for="(val,index) in value" :key="index" :value="val" :index="index" :flagDelete="value.length===1 ? false: true " />
  </div>
</template>

<script>
import Item from "~/components/Realestate/contact/list/phoneList/item";
export default {
  name: "phoneList",
  emits: ['deleteitem', 'saveitem'],
  components: {Item},
  props:{
    value: []
  },
  methods:{
    addItem(){
      this.value.push({NAME: '', REM: '',flagEdit: true})
    },
  },
  created() {
    this.$on('deleteitem', index => {
      this.value.splice(index, 1)
    });
    this.$on('saveitem', index => {
      console.log('saveitem')
    });
  }
}
</script>

<style lang="scss" scoped>
  .main{
    margin-left: 10px;
    .buttonHref{
      text-decoration: underline;
      cursor: pointer;
    }
    .title{
      color: #1b4c43;
      text-align: left;
      margin-left: 0px;
      margin-bottom: 0px;
    }
  }
</style>
