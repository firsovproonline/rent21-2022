<template>
  <div class="main">
    <item v-for="(item,index) in items" :key="index" :src="'/api/foto/get?id='+item.ID" :value="item" >
    </item>
  </div>
</template>

<script>
import Item from "~/components/Realestate/photos/list/item";
export default {
  name: "PhotosList",
  components: {Item},
  props : {
    uid: null
  },
  data: () => ({
    items: []
  }),
  mounted() {
    this.$api.get('/api/foto/list?id='+this.uid).then(item=>{
      this.items = item.data.row
    })
  }

}
</script>

<style lang="scss" scoped>
  .main{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>
