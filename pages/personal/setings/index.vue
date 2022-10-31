<template>
  <section v-if="isAdmin || isModerator" style="display: flex">
    <div class="leftMenu">
      <LeftMenu />
    </div>
    <div class="main-block" style="flex: 1 1 auto;">
      <div class="row row-list-title">
        <div class="col-md-12">
          <div class="media">

            <div class="form-group d-flex mb-0" style="flex: 1">
              <i class="fa fa-search"></i>
              <input class="form-control-plaintext" type="text" placeholder="телефон, имя, заголовок..." style="margin-left: 12px">
            </div>
            <div class="btn btn-pill btn-outline-primary-2x btn-air-primary" style="height: 38px; margin-right: 8px;padding-right: 6px;padding-left: 6px">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
            </div>
            <div class="btn btn-pill btn-outline-primary-2x btn-air-primary" style="height: 38px; padding-right: 6px;padding-left: 6px">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </div>
            <a class="btn btn-pill btn-outline-primary-2x btn-air-primary" style="display: flex;margin-left: 12px" href="/personal/setings/new">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              <div>Добавить</div>
            </a>
          </div>
        </div>
      </div>

      <div class="row">
        <section id="home" class="section-py-space" style="margin-top: 20px;display: block;">
          <div class="row">
            <div class="col-12 custom-container">
              <IpphoneList />
            </div>
          </div>
        </section>
      </div>
      <div class="row">
        <section class="section-py-space" style="margin-top: 20px;display: block;">
          <div class="row">
            <div class="col-12 custom-container">
              <CianList />
            </div>
          </div>
        </section>
      </div>
      <div class="row">
        <section class="section-py-space" style="margin-top: 20px;display: block;">
          <div class="row">
            <div class="col-12 custom-container">
              <AvitoList />
            </div>
          </div>
        </section>
      </div>
    </div>

  </section>
  <section v-else>Доступ запрещён !!!</section>
</template>

<script>
import LeftMenu from "~/components/leftMenu";
import IpphoneList from "~/components/Realestate/setings/ipphoneList";
import CianList from "~/components/Realestate/setings/cianList";
import AvitoList from "~/components/Realestate/setings/avitoList";

export default {
  name: "indexSetings",
  layout: 'default',
  components: {AvitoList, CianList, IpphoneList, LeftMenu},
  data: () => ({
    isAdmin: false,
    isModerator: false,
  }),
  mounted() {
    // console.log(this)
    this.$api.get('/api/setings').then(request=>{
      this.$store.commit('seting/setIPphoneItems',request.data[0].ipphones);
      this.$store.commit('seting/setCianItems',request.data[0].cianexport);
      this.$store.commit('seting/setAvitoItems',request.data[0].avitoexport);
    })
  },
  computed: {
    user() {
      return this.$store.getters['user/user']
    },
  },
  watch:{
    user(val){
      if(val.roles.indexOf('admin') === -1){
        this.isAdmin = false
      }else {
        this.isAdmin = true
      }
      if(val.roles.indexOf('moderator') === -1){
        this.isModerator = false
      }else {
        this.isModerator = true
      }
    }
  },

}
</script>

<style scoped>
.landing-wrraper .section-py-space {
  padding-bottom: 0px;
}
</style>
