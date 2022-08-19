<template>
  <a v-if="item.ob" :href="'/personal/realestate/'+item.ob.UID">
  <div class="main">
    <div class="field-div" >{{item.ob.TIP}}</div>
    <div class="field-div" >{{item.ob.OPP}}</div>
    <div class="field-div" >{{item.ob.PLALL}} m2</div>
    <div class="field-div" >{{item.ob.CENA_AR_MES_ALL}} р</div>
    <div class="field-div" >{{item.ob.ETAG}} этаж</div>


  </div>
  </a>
</template>

<script>
export default {
  name: "item",
  props:{
    item:{}
  }
}
</script>

<style scoped>
  .main{
    display: flex;
    border-bottom: 1px dotted #0c5460;
    cursor: pointer;
  }
  .field-div{
    margin-left: 8px;
  }
</style>
