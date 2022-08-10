<template>
  <div class="main">
    <div class="header">

    </div>
    <div class="body">
      <Chitem v-for="(item, key) in items" :key="key" :item="item" :index="key" />
    </div>
    <div class="footer">
      <button type="button" class="btn btn-pill btn-primary btn-air-primary btn-sm">Сохранить</button>
      <button @click="close" type="button" class="btn btn-pill btn-secondary btn-air-secondary btn-sm">Отменить</button>
    </div>
  </div>
</template>

<script>
import Chitem from "~/components/multicombo/chitem";
export default {
  name: "list",
  components: {Chitem},
  computed: {
    items(){
      return this.$store.getters['main/combospr']
    }
  },
  methods:{
    close(){
      this.$store.dispatch('main/setVcomponent', {
        comp: null,
        field: null,
        spr: null
      })
    }
  }
  }
</script>

<style lang="scss" scoped>
  .main{
    padding: 12px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    .body{
      flex: 1 1 auto;
    }
    .footer{
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
    }
  }
</style>
