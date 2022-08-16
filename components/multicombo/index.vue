<template>
  <div class="main">
    <div>
      <div class="label" @click="showList">{{title}}</div>
      <div v-if="field==='METRO'" style="margin-top: 12px" class="label" @click="showMetro">Карта</div>
    </div>
    <div class="body">
      <div style="display: flex;flex-wrap: wrap;">
        <item v-for="(item, key) in value" :key="key" :item="item"  />
      </div>
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
      const p = {
        comp:() => import('./list'),
        field: this.field,
        value: this.value,
        spr: this.$store.getters['realestate/spr'][this.spr]
      }
      this.$store.dispatch('main/setVcomponent', p)
    },
    showMetro(){
      const p = {
        comp:() => import('@/components/metromap'),
        field: this.field,
        value: this.value,
        spr: this.$store.getters['realestate/spr'][this.spr]
      }
      this.$store.dispatch('main/setVcomponent', p)
    },

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
