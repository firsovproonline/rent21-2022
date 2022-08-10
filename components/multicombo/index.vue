<template>
  <div class="main">
    <div class="label" @click="showList">{{title}}</div>
    <div class="body">
      <ul style="display: flex">
        <item v-for="(item, key) in value" :key="key" :item="item"  />
      </ul>
    </div>
  </div>
</template>

<script>
import Item from "~/components/multicombo/item";

///     this.$store.dispatch('main/setVcomponent', () => import('./headerTable'))

export default {
  name: "multicombo",
  components: {Item},
  props:{
    spr: null,
    value: null,
    type: null,
    title: '',
    field: null,
    itemkey: null
  },
  data: () => ({
    vtext: ''
  }),
  methods:{
    showList(){
      this.$store.dispatch('main/setVcomponent', {
        comp:() => import('./list'),
        field: null,
        spr: this.$store.getters['realestate/spr'][this.spr]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .main{
    display: flex;
    .label{
      min-width: 140px;
      color: #1c222b;
      font-weight: bold;
      cursor: pointer;
      text-decoration: underline;
    }
    .body{
      flex: 1 1 auto;
    }
  }
</style>
