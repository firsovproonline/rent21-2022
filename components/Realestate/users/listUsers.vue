<template>
  <section>
    <div class="row">
      <div class="card">
        <div class="card-header">
          <div class="media">
            <div class="form-group d-flex mb-0" style="flex: 1">
              <i class="fa fa-search"></i>
              <input class="form-control-plaintext" type="text" placeholder="Search..." style="margin-left: 12px">
            </div>
            <div class="btn btn-primary" style="display: flex;margin-left: 12px">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="item in listItem" :key="item.id" class="user-profile">
        <ItemUser :item="item" />
      </div>
    </div>
  </section>
</template>

<script>
import ItemUser from "~/components/Realestate/users/itemUser";
export default {
  name: "listUsers",
  components: {ItemUser},
  computed:{
    listItem(){
      return this.$store.getters['user/users']
    }
  },
  mounted() {
    this.$api.get('/api/user/list').then(items=>{
      this.$store.dispatch('user/setUsers', items.data)
    })
  }
}
</script>

<style scoped>
.main-section{
  margin-bottom: 0px;
}

.media-body {
  flex: 0 0 auto;
}
.card-header{
  padding: 8px;
}
.fa-search{
  width: 24px;
  height: 24px;
  font-size: 24px;
}

.d-flex {
  display: flex !important;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.profile-header{
  padding-bottom: 6px;
}

.card-header {
  background-color: white;
}
</style>

