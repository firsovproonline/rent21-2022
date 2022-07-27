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
              <YmapRent />
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
import YmapRent from "~/components/Realestate/ymapRent";

export default {
  name: "indexOwners",
  layout: 'default',
  components: {YmapRent, LeftMenu},
  data: () => ({
    isAdmin: false,
    isModerator: false,
  }),
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

</style>
