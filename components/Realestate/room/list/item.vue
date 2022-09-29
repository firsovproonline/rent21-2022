<template>
  <a v-if="item.ob" :href="'/personal/realestate/'+item.ob.UID">
  <div class="main">
    <div class="field-div" >{{item.ob.TIP}}</div>
    <div class="field-div" >{{item.ob.OPP}}</div>
    <div class="field-div" >{{item.ob.PLALL}} m2</div>
    <div class="field-div" >{{item.ob.CENA_AR_MES_ALL}} р</div>
    <div class="field-div" >{{item.ob.ETAG}} этаж</div>
    <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>

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
