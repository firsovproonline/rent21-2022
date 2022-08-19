<template>
  <div>
    <item v-for="(item, index) in items" :key="index" :item="item"  />
  </div>
</template>

<script>
import Item from "~/components/Realestate/room/list/item";
export default {
  name: "listRoom",
  components: {Item},
  props:{
    items: []
  }
}
</script>

<style scoped>

</style>
