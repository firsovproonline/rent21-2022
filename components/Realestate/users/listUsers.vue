<template>
  <section class="main-section">
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
  </section>
</template>

<script>
export default {
  name: "listUsers",
  mounted() {
    console.log(this)
    this.$api.get('/api/user/list').then(items=>{
      console.log(items.data)
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

