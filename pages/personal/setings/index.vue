<template>
  <section v-if="isAdmin || isModerator" style="display: flex">
    <div class="leftMenu">
      <LeftMenu />
    </div>
    <div class="main-block" style="flex: 1 1 auto;">
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
