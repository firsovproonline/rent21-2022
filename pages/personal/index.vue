<template>
  <section v-if="isAdmin || isModerator" style="display: flex">
    <div class="leftMenu">
      <LeftMenu />
    </div>
    <div class="main-block" style="flex: 1 1 auto;">
      indexPersonal
    </div>
  </section>
  <section v-else>Доступ запрещён !!!</section>
</template>

<script>
import LeftMenu from "~/components/leftMenu";
export default {
  name: "indexPersonal",
  components: {LeftMenu},
  layout: 'default',
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
