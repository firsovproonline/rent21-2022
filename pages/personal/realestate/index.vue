<template>
  <section v-if="isAdmin || isModerator" style="display: flex">
    <div class="leftMenu">
      <LeftMenu />
      <hr/>
      <FiterOb />
    </div>
    <div class="main-block" style="flex: 1 1 auto;">
      <div class="row">
        <section id="home" class="section-py-space" style="margin-top: 20px;display: block;">
          <div class="row">
            <div class="col-12 custom-container">
              <ListAddress />
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
import ListAddress from "~/components/Realestate/Address/listAddress";
import FiterOb from "~/components/Realestate/Address/filter";

export default {
  name: "indexPRealestate",
  components: {FiterOb, LeftMenu, ListAddress},
  layout: 'default',
  /*
  async asyncData ({ app, route, params, error, store }) {
    try {
      await store.dispatch('realestate/load')
    } catch (err) {
      console.log(err)
      return error({
        statusCode: 404,
        message: 'Категории не найдены или сервер не доступен'
      })
    }
  },
   */
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
  mounted() {
    this.$store.dispatch('realestate/load')
  }
}
</script>

<style scoped>

</style>
