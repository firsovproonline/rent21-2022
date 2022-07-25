<template>
  <div class="col-4 card">
    <div class="card-header"></div>
    <div class="card-body">
      <label for="name">Наименование</label>
      <input v-model="item.name" id="name" class="form-control" type="text" placeholder="" style="margin-left: 12px">
      <label for="apikey">Ключ</label>
      <input v-model="item.key" id="apikey" class="form-control" type="text" placeholder="" style="margin-left: 12px">
      <label for="apiurl">API урл</label>
      <input v-model="item.apiUrl" id="apiurl" class="form-control" type="text" placeholder="" style="margin-left: 12px">
    </div>
  </div>
</template>

<script>
import IPPhone from "~/model/ipphone";

export default {
  name: "ipphoneItem",
  props:{
    item: IPPhone
  },
  mounted() {
    console.log(this)
  }
}
</script>

<style scoped>
.card .card-header{
  padding-bottom: 0px;
}

.col-4{
  flex: 0 0 30%;
}
.card{
  margin: 8px;
}
</style>
