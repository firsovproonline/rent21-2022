<template>
  <div class="col-4 card">
    <div class="card-header">
      <div class="media">
        <div class="form-group d-flex mb-0" style="flex: 1">
        </div>
        <div v-if="item.editFlag" class="btn btn-primary" style="display: flex;margin-left: 12px" @click="save" >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-database"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
        </div>
      </div>
    </div>
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
export default {
  name: "ipphoneItem",
  props:{
    item: {}
  },
  methods:{
    save(){
      this.$store.dispatch('seting/saveIPphoneItems')
      this.item.editFlag = false;
    }
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
